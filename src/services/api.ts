import axios from "axios";
import groupBy from "lodash/groupBy";
import { startUrl } from "../config";

type MetadataJson = {
  versions: {
    [id: string]: string;
  };
};

export type Version = {
  id: string;
  url: string;
};
export type Versions = Record<string, Version>;

export async function getVersions(): Promise<Versions> {
  const {
    data: { versions },
  } = await axios.get<MetadataJson>(`${startUrl}/metadata.json`);
  return Object.fromEntries<Version>(
    Object.keys(versions).map((id) => {
      const url = versions[id];
      const version = {
        id,
        url,
      };
      return [id, version];
    })
  );
}

export type Story = {
  id: string;
  kind: string;
  story: string;
};

export type StoriesJson = {
  v: 2;
  stories: {
    [id: string]: Story;
  };
};

export type Page = {
  id: string;
  name: string;
};

export type Folder = {
  name: string;
  items: Item[];
};

export type Item = Page | Folder;

export async function getPages(version: Version): Promise<Page[]> {
  const { data } = await axios.get<StoriesJson>(`${version.url}/stories.json`);
  if (data.v !== 2) return [];

  const stories = Object.values(data.stories);
  console.log({ stories });
  const pages = new Map<string, Page>();
  for (const { id, kind } of stories) {
    const pageId = id.replace(/--[-\w]+$/, "");
    if (!pages.has(pageId)) {
      pages.set(pageId, { id, name: kind });
    }
  }
  return [...pages.values()];
}
