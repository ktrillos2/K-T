import { notFound } from "next/navigation"
import { getAllProjects, getProjectBySlug } from "@/sanity/lib/queries"
import ProjectClientView from "@/components/project-client-view"
import { Metadata } from "next"
import { Project } from "@/lib/projects"

function mapSanityProjectToClientProject(sanityProject: any): Project {
    return {
        id: sanityProject._id || sanityProject.slug,
        slug: sanityProject.slug,
        title: sanityProject.title,
        description: sanityProject.description || "",
        shortDescription: sanityProject.shortDescription || "",
        year: sanityProject.year || "",
        month: sanityProject.month || "",
        category: sanityProject.category || "",
        tech: sanityProject.tech || [],
        images: {
            hero: sanityProject.hero || "",
            mobile: sanityProject.mobile || sanityProject.hero || "",
            gallery: []
        },
        liveUrl: sanityProject.liveUrl || "",
        content: {
            challenge: sanityProject.challenge || "",
            solution: sanityProject.solution || "",
            seoFocus: sanityProject.seoFocus || "",
        }
    }
}

// Force static generation for these routes - Great for SEO and performance
export async function generateStaticParams() {
    const projects = await getAllProjects()
    return projects.map((project: { slug: string }) => ({
        slug: project.slug,
    }))
}

// Generate dynamic metadata for each project
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const sanityProject = await getProjectBySlug(slug)

    if (!sanityProject) {
        return {
            title: "Proyecto no encontrado | K&T Agencia Digital",
            description: "El proyecto que buscas no existe."
        }
    }

    const project = mapSanityProjectToClientProject(sanityProject)

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
    const sanityProject = await getProjectBySlug(slug)

    if (!sanityProject) {
        notFound()
    }

    const mappedProject = mapSanityProjectToClientProject(sanityProject)

    return <ProjectClientView project={mappedProject} />
}