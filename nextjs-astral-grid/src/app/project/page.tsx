"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { client } from '@/sanity/client'
import styles from './project.module.css'

interface SanityProject {
  _id: string;
  title: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  client: string;
  role: string;
  projectDate: string;
  slug: {
    current: string;
  };
}

const ProjectCards = () => {
  const [projects, setProjects] = useState<SanityProject[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      const query = `
        *[_type == "project"] {
          _id,
          title,
          mainImage {
            asset-> {
              url
            }
          },
          client,
          role,
          projectDate,
          slug {
            current
          }
        }
      `
      try {
        const data = await client.fetch<SanityProject[]>(query)
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (isLoading) {
    return <div className={styles.loading}>Loading projects...</div>
  }

  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <div key={project._id} className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              src={project.mainImage.asset.url}
              alt={project.title}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{project.title}</h3>
            <div className={styles.details}>
              <p><span>Client:</span> {project.client}</p>
              <p><span>Role:</span> {project.role}</p>
              <p><span>Date:</span> {new Date(project.projectDate).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectCards