import React, { useMemo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { getVersions } from "../../services/api";
import Header from "../Header/Header";
import styles from "./Shell.module.scss";
import { useQuery } from "react-query";
import { getVersionUrl, versionPath } from "../../routing";
import Stories from "../Pages/PageList";
import clsx from "clsx";

export default function Shell() {
  const { data: versions } = useQuery("versions", getVersions);
  const versionIds = useMemo(() => Object.keys(versions ?? {}), [versions]);
  const [defaultVersionId] = versionIds;
  return versions ? (
    <div className={styles.shell}>
      <Header versionIds={versionIds} />
      <main className={clsx(styles.content, "fill")}>
        {versions && defaultVersionId && (
          <Switch>
            <Route
              path={versionPath}
              render={() => <Stories versions={versions} />}
            />
            <Redirect to={getVersionUrl(defaultVersionId)} />
          </Switch>
        )}
      </main>
    </div>
  ) : null;
}
