import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "gqhl3bp1",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token:"skt23k1timzsVSzBe9ZG28E8NWxpnFttUGILlbdQlRKeaMJqmTbw692HDzNZZsUsXNgUShoXncyXn2zMqVRC5lpb0QwBszRdEl3O8hirreziZRnQlT6txrTANNyXtmAu5LQrL1oRTq2dSsdwgwOEybNjziZXjUfmkkoa1v8t1JnBeTJdEsv9"
});

export const sendFormToSanity = async (formData:any, file:any) => {
  try {

    // Upload CV file to Sanity
    const cvFile = await client.assets.upload("file", file, {
      filename: file.name,
    });

    // Create the form submission document
    const response = await client.create({
      _type: "formSubmission",
      name: formData.name,
      email: formData.email,
      position: formData.position,
      cv: {
        _type: "file",
        asset: { _ref: cvFile._id },
      },
      message: formData.message,
    });

    console.log("Form submission successful:", response);
  } catch (error) {
    console.error("Error submitting form to Sanity:", error);
  }
};