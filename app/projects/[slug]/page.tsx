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
            title: "Proyecto no encontrado",
            description: "El proyecto que buscas no existe."
        }
    }

    const project = mapSanityProjectToClientProject(sanityProject)

    return {
        title: `${project.title} - Caso de Estudio`,
        description: project.shortDescription,
        keywords: [
            ...project.tech,
            project.category,
            "Desarrollo Web Colombia",
            "Diseño UI UX",
            "Casos de Exito Web",
            "K&T Code Proyectos",
        ],
        alternates: {
            canonical: `https://www.kytcode.lat/projects/${slug}`,
            languages: {
                "es-CO": `https://www.kytcode.lat/projects/${slug}`,
                "es": `https://www.kytcode.lat/projects/${slug}`,
                "x-default": `https://www.kytcode.lat/projects/${slug}`,
            },
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        openGraph: {
            title: `${project.title} | Portafolio K&T Code`,
            description: project.description || project.shortDescription,
            type: "article",
            url: `https://www.kytcode.lat/projects/${slug}`,
            siteName: "K&T Code",
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
            title: `${project.title} | Portafolio K&T Code`,
            description: project.shortDescription,
            images: [project.images.hero],
            creator: "@kytcode",
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

    const projectJsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `https://www.kytcode.lat/projects/${slug}#project`,
        "name": mappedProject.title,
        "headline": mappedProject.title,
        "description": mappedProject.description || mappedProject.shortDescription,
        "url": `https://www.kytcode.lat/projects/${slug}`,
        "image": mappedProject.images.hero,
        "dateCreated": mappedProject.year,
        "creator": {
            "@id": "https://www.kytcode.lat/#organization"
        },
        "provider": {
            "@id": "https://www.kytcode.lat/#organization"
        },
        "keywords": mappedProject.tech.join(", ")
    }

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://www.kytcode.lat/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Portafolio",
                "item": "https://www.kytcode.lat/portafolio"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": mappedProject.title,
                "item": `https://www.kytcode.lat/projects/${slug}`
            }
        ]
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <ProjectClientView project={mappedProject} />
        </>
    )
}
