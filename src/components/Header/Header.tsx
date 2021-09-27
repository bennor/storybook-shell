import React, { ReactElement } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { title } from "../../config";
import styles from "./Header.module.scss";
import { getVersionUrl, VersionParams, versionPath } from "../../routing";

type HeaderProps = {
  versionIds: string[];
};
export default function Header({
  versionIds,
}: HeaderProps): ReactElement<HeaderProps> {
  const history = useHistory();
  const match = useRouteMatch<VersionParams>(versionPath);
  const selectedVersionId = match?.params?.versionId;

  function handleChange({ target }: React.ChangeEvent<HTMLSelectElement>) {
    history.push(getVersionUrl(target.value));
  }

  return selectedVersionId ? (
    <header className={styles.header}>
      <h1>{title}</h1>
      <select value={selectedVersionId} onChange={handleChange}>
        {versionIds?.map((versionId) => (
          <option key={versionId}>{versionId}</option>
        ))}
      </select>
    </header>
  ) : (
    <></>
  );
}
