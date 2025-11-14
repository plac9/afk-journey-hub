import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export const Hero = defineDocumentType(() => ({
  name: "Hero",
  filePathPattern: "heroes/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    faction: {
      type: "enum",
      options: [
        "Lightbearer",
        "Mauler",
        "Wilder",
        "Graveborn",
        "Celestial",
        "Hypogean",
        "Dimensional",
      ],
      required: true,
    },
    class: { type: "string", required: true },
    role: { type: "string", required: true },
    rarity: { type: "string", required: true },
    position: { type: "string", required: true },
    signatureItem: { type: "string", required: true },
    exclusiveFurniture: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    summary: { type: "string", required: true },
    featured: { type: "boolean", default: false, required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));

export const Event = defineDocumentType(() => ({
  name: "Event",
  filePathPattern: "events/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    start: { type: "date", required: true },
    end: { type: "date", required: true },
    timezone: { type: "string", required: true },
    rewardSummary: { type: "string", required: true },
    priority: { type: "enum", options: ["high", "medium", "low"], required: true },
    mode: { type: "string", required: true },
    summary: { type: "string", required: true },
    featuredTeams: { type: "list", of: { type: "string" }, required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));

export const News = defineDocumentType(() => ({
  name: "News",
  filePathPattern: "news/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    sourceUrl: { type: "string", required: true },
    publishedAt: { type: "date", required: true },
    category: {
      type: "enum",
      options: ["patch-notes", "event", "codes", "roadmap"],
      required: true,
    },
    summary: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Hero, Event, News],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});
