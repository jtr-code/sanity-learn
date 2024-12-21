import {defineField, defineType} from "sanity";

export const formType= defineType({
  name: "formSubmission",
  title: "Form Submission",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).error("Name is required and should be at least 2 characters."),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email().error("A valid email is required."),
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
      validation: (Rule) => Rule.required().error("Position is required."),
    }),
    defineField({
      name: "cv",
      title: "CV",
      type: "file", // Allows uploading of files (e.g., PDF, DOCX)
      options: {
        accept: ".pdf,.doc,.docx", // Limit accepted file types
      },
      validation: (Rule) => Rule.required().error("CV file is required."),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text", // Multi-line text field for user messages
      validation: (Rule) => Rule.required().min(10).error("Message must be at least 10 characters."),
    }),
  ],
});
