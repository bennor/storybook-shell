export type VersionParams = {
  versionId: string;
};
export const versionPath = "/:versionId";
export const getVersionUrl = (versionId: string) => `/${versionId}`;

export type PageParams = {
  versionId: string;
  pageId: string;
};
export const pagePath = "/:pageId";
export const getStoryUrl = (prefix: string, pageId: string) =>
  `${prefix}/${pageId}`;
