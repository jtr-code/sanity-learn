import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "gqhl3bp1",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});