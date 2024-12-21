import {defineField, defineType} from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Slug is required"),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Main image is required"),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      validation: (Rule) => Rule.required().error("Client name is required"),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required().error("Role is required"),
    }),
    defineField({
      name: "projectDate",
      title: "Project Date",
      type: "date",
      validation: (Rule) => Rule.required().error("Project date is required"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{type: "block"}],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{type: "reference", to: [{type: "category"}]}],
    }),
    defineField({
      name: "projectDetails",
      title: "Project Details",
      type: "object",
      fields: [
        defineField({
          name: "challenge",
          title: "Challenge",
          type: "text",
        }),
        defineField({
          name: "solution",
          title: "Solution",
          type: "text",
        }),
        defineField({
          name: "results",
          title: "Results",
          type: "text",
        }),
      ],
    }),
  ],
});