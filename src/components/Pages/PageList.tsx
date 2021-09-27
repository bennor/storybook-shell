import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { Redirect, Route, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import { getStoryUrl, pagePath, VersionParams } from "../../routing";
import { getPages, Versions } from "../../services/api";
import Page from "../Page/Page";
import styles from "./PageList.module.scss";

type PageListProps = {
  versions: Versions;
};
export default function PageList({
  versions,
}: PageListProps): ReactElement<PageListProps> {
  let {
    path,
    url,
    params: { versionId },
  } = useRouteMatch<VersionParams>();
  const version = versions[versionId];
  const { data: pages } = useQuery(
    ["pages", versionId],
    () => getPages(version),
    {
      enabled: !!version,
    }
  );
  if (versionId && !version) {
    return <Redirect to="/" />;
  }
  return pages ? (
    <div className={styles.pageList}>
      <nav>
        <ul>
          {pages?.map((s) => (
            <li key={s.id}>
              <NavLink
                to={getStoryUrl(url, s.id)}
                activeClassName={styles.activeLink}
              >
                {s.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.content}>
        <Route
          path={`${path}${pagePath}`}
          render={() => <Page key={version.id} version={version} />}
        />
      </div>
    </div>
  ) : (
    <></>
  );
}
