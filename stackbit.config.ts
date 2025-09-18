import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";
import { ContentfulContentSource } from "@stackbit/cms-contentful";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "custom",
  nodeVersion: "20",
  devCommand: "npm run dev",
  contentSources: [
    new ContentfulContentSource({
      spaceId: process.env.CONTENTFUL_SPACE_ID!,
      environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
      previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!
    }),
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        {
          name: "Page",
          type: "page",
          urlPath: "/",
          filePath: "content/pages/{slug}.json",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "slug", type: "string", required: true },
            {
              name: "sections",
              type: "list",
              items: {
                type: "reference",
                models: [
                  "HeroSection",
                  "AboutSection",
                  "ServicesSection",
                  "ProjectsSection",
                  "GallerySection",
                  "TestimonialsSection",
                  "ContactSection"
                ]
              }
            }
          ]
        },
        {
          name: "HeroSection",
          type: "object",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "subtitle", type: "string", required: true },
            { name: "backgroundImage", type: "image" },
            {
              name: "primaryButton",
              type: "object",
              fields: [
                { name: "text", type: "string" },
                { name: "url", type: "string" }
              ]
            },
            {
              name: "secondaryButton",
              type: "object",
              fields: [
                { name: "text", type: "string" },
                { name: "url", type: "string" }
              ]
            }
          ]
        },
        {
          name: "AboutSection",
          type: "object",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "subtitle", type: "string" },
            { name: "description", type: "markdown" },
            {
              name: "stats",
              type: "list",
              items: {
                type: "object",
                fields: [
                  { name: "number", type: "string" },
                  { name: "label", type: "string" }
                ]
              }
            }
          ]
        },
        {
          name: "Service",
          type: "object",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "description", type: "markdown", required: true },
            { name: "image", type: "image" },
            { name: "features", type: "list", items: { type: "string" } }
          ]
        },
        {
          name: "ServicesSection",
          type: "object",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "subtitle", type: "string" },
            {
              name: "services",
              type: "list",
              items: { type: "reference", models: ["Service"] }
            }
          ]
        },
        {
          name: "Project",
          type: "object",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "description", type: "markdown", required: true },
            { name: "category", type: "string" },
            { name: "image", type: "image" },
            { name: "results", type: "list", items: { type: "string" } },
            { name: "tags", type: "list", items: { type: "string" } }
          ]
        },
        {
          name: "ProjectsSection",
          type: "object",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "subtitle", type: "string" },
            {
              name: "projects",
              type: "list",
              items: { type: "reference", models: ["Project"] }
            }
          ]
        },
        {
          name: "TeamMember",
          type: "object",
          fields: [
            { name: "name", type: "string", required: true },
            { name: "title", type: "string", required: true },
            { name: "bio", type: "markdown" },
            { name: "image", type: "image" },
            { name: "linkedin", type: "string" },
            { name: "twitter", type: "string" },
            { name: "email", type: "string" }
          ]
        },
        {
          name: "GalleryItem",
          type: "object",
          fields: [
            { name: "title", type: "string", required: true },
            {
              name: "type",
              type: "enum",
              options: ["image", "video"],
              required: true
            },
            { name: "url", type: "string", required: true },
            { name: "thumbnail", type: "image" }
          ]
        },
        {
          name: "GallerySection",
          type: "object",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "subtitle", type: "string" },
            {
              name: "items",
              type: "list",
              items: { type: "reference", models: ["GalleryItem"] }
            }
          ]
        },
        {
          name: "Testimonial",
          type: "object",
          fields: [
            { name: "quote", type: "markdown", required: true },
            { name: "name", type: "string", required: true },
            { name: "title", type: "string", required: true },
            { name: "company", type: "string" },
            { name: "image", type: "image" }
          ]
        },
        {
          name: "TestimonialsSection",
          type: "object",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "subtitle", type: "string" },
            {
              name: "testimonials",
              type: "list",
              items: { type: "reference", models: ["Testimonial"] }
            }
          ]
        },
        {
          name: "ContactSection",
          type: "object",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "subtitle", type: "string" },
            { name: "address", type: "string" },
            { name: "phone", type: "string" },
            { name: "email", type: "string" },
            { name: "hours", type: "string" }
          ]
        }
      ]
    })
  ],
  postInstallCommand:
    "npm i --no-save @stackbit/types @stackbit/cms-contentful",
  experimental: {
    ssg: {
      name: "React",
      logPatterns: {
        up: ["Local:", "serving on port"]
      }
    }
  }
});
