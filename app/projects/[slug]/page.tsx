
import { notFound } from "next/navigation"
import { projects } from "@/lib/projects"
import ProjectClientView from "@/components/project-client-view"
import { Metadata } from "next"

// Force static generation for these routes - Great for SEO and performance
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

// Generate dynamic metadata for each project
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const project = projects.find((p) => p.slug === slug)

    if (!project) {
        return {
            title: "Proyecto no encontrado | K&T Agencia Digital",
            description: "El proyecto que buscas no existe."
        }
    }

    return {
        title: project.title,
        description: project.shortDescription,
        keywords: [...project.tech, project.category, "Desarrollo Web", "Colombia", "Diseño UI/UX"],
        openGraph: {
            title: `${project.title} | Portafolio K&T`,
            description: project.description,
            type: "article",
            images: [
                {
                    url: project.images.hero,
                    width: 1200,
                    height: 630,
                    alt: `Hero image for ${project.title}`,
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} | Portafolio K&T`,
            description: project.shortDescription,
            images: [project.images.hero],
        }
    }
}

interface ProjectPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params
    const project = projects.find((p) => p.slug === slug)

    if (!project) {
        notFound()
    }

    return <ProjectClientView project={project} />
}
