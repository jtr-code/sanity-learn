import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import type { Metadata } from "next";

// Define the project details interface
interface ProjectDetails {
  solution?: string;
  challenge?: string;
  results?: string;
}

// Define the project interface
interface Project {
  _type: string;
  title: string;
  client: string;
  role: string;
  projectDate: string;
  mainImage?: SanityImageSource;
  body: any[]; // Make this more specific if needed
  projectDetails?: ProjectDetails;
  slug: {
    current: string;
  };
}

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// Generate metadata
export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = await client.fetch<Project>(PROJECT_QUERY, { slug: params.slug });

  return {
    title: project?.title || 'Project Not Found',
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const project = await client.fetch<Project>(PROJECT_QUERY, { slug });

  if (!project) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Project Not Found</h1>
        <Link href="/" className="hover:underline">
          ← Back to projects
        </Link>
      </main>
    );
  }

  const projectImageUrl = project.mainImage
    ? urlFor(project.mainImage)?.width(800).height(400).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/project" className="hover:underline">
        ← Back to projects
      </Link>
      {projectImageUrl && (
        <img
          src={projectImageUrl}
          alt={project.title}
          className="aspect-video rounded-xl"
          width={800}
          height={400}
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{project.title}</h1>
      <div className="prose">
        <p>
          <strong>Client:</strong> {project.client}
        </p>
        <p>
          <strong>Role:</strong> {project.role}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(project.projectDate).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
        {project?.projectDetails?.solution && (
          <p>
            <strong>Solution: </strong>
            {project.projectDetails.solution}
          </p>
        )}
        {project?.projectDetails?.challenge && (
          <p>
            <strong>Challenge: </strong>
            {project.projectDetails.challenge}
          </p>
        )}
        {project?.projectDetails?.results && (
          <p>
            <strong>Results: </strong>
            {project.projectDetails.results}
          </p>
        )}
        {Array.isArray(project.body) && <PortableText value={project.body} />}
      </div>
    </main>
  );
}

// Optionally, add generateStaticParams for static generation
export async function generateStaticParams() {
  const projects = await client.fetch<Project[]>(
    `*[_type == "project"]{ slug }`
  );

  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}