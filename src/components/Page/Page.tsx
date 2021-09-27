import clsx from "clsx";
import React, { ReactElement } from "react";
import { useParams } from "react-router";
import { PageParams } from "../../routing";
import { Version } from "../../services/api";
import styles from "./Page.module.scss";

type PageProps = {
  version: Version;
};

export default function Page({ version }: PageProps): ReactElement {
  const { pageId } = useParams<PageParams>();
  const pageSrc = `${version.url}/iframe.html?id=${pageId}&viewMode=docs`;
  return (
    <iframe className={clsx(styles.page, "scroll")} src={pageSrc}></iframe>
  );
}
