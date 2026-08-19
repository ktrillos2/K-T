import { notFound } from "next/navigation"
import { getAllProjects, getProjectBySlug } from "@/sanity/lib/queries"
import ProjectClientView from "@/components/project-client-view"
import { Metadata } from "next"
import { Project, projects as localProjects, getProject as getLocalProject } from "@/lib/projects"

async function resolveProject(slug: string): Promise<Project | null> {
    const local = getLocalProject(slug)
    try {
        const sanityProject = await getProjectBySlug(slug)
        if (sanityProject) {
            return {
                id: sanityProject._id || sanityProject.slug,
                slug: sanityProject.slug,
                title: sanityProject.title,
                client: local?.client || sanityProject.title,
                industry: local?.industry || sanityProject.category || "Tecnología",
                country: local?.country || "Colombia",
                city: local?.city || "Bogotá",
                projectType: local?.projectType || sanityProject.category || "Desarrollo Web",
                date: local?.date || `${sanityProject.month || ""} ${sanityProject.year || ""}`.trim(),
                year: sanityProject.year || local?.year || "2026",
                month: sanityProject.month || local?.month || "Febrero",
                duration: local?.duration || "4 semanas",
                objective: local?.objective || sanityProject.shortDescription || "Desarrollo web corporativo",
                category: sanityProject.category || local?.category || "Desarrollo Web",
                tech: sanityProject.tech && sanityProject.tech.length > 0 ? sanityProject.tech : (local?.tech || ["Next.js", "React"]),
                description: sanityProject.description || local?.description || "",
                shortDescription: sanityProject.shortDescription || local?.shortDescription || "",
                images: {
                    hero: sanityProject.hero || local?.images.hero || "/images/projects/psicowork.webp",
                    mobile: sanityProject.mobile || sanityProject.hero || local?.images.mobile || "/images/projects/psicowork-mobile.webp",
                    gallery: local?.images.gallery || []
                },
                liveUrl: sanityProject.liveUrl || local?.liveUrl || "",
                content: {
                    challenge: sanityProject.challenge || local?.content.challenge || "",
                    solution: sanityProject.solution || local?.content.solution || "",
                    seoFocus: sanityProject.seoFocus || local?.content.seoFocus || "",
                    results: local?.content.results || "",
                },
                metrics: local?.metrics || {
                    lighthouseAfter: "98/100",
                    lcp: "680 ms",
                    pagesDeveloped: "6 páginas",
                    integrations: "WhatsApp API + Formularios SSL",
                    keyAchievements: [
                        "Optimización de Core Web Vitals y LCP < 0.8s.",
                        "Arquitectura moderna en Next.js y React.",
                    ]
                }
            }
        }
    } catch {
        // Fallback to local
    }

    return local || null
}

// Force static generation for these routes - Great for SEO and performance
export async function generateStaticParams() {
    const staticSlugs = localProjects.map((p) => ({ slug: p.slug }))
    try {
        const sanityProjects = await getAllProjects()
        const sanitySlugs = sanityProjects.map((project: { slug: string }) => ({
            slug: project.slug,
        }))
        const unique = Array.from(new Set([...staticSlugs.map(s => s.slug), ...sanitySlugs.map(s => s.slug)]))
        return unique.map(slug => ({ slug }))
    } catch {
        return staticSlugs
    }
}

// Generate dynamic metadata for each project
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const project = await resolveProject(slug)

    if (!project) {
        return {
            title: "Proyecto no encontrado | K&T Code",
            description: "El caso de estudio que buscas no existe."
        }
    }

    return {
        title: `${project.title}: Caso de Estudio y Resultados | K&T Code`,
        description: `${project.shortDescription} Descubre cómo K&T Code diseñó la solución para ${project.client || project.title} con ${project.tech.slice(0, 3).join(", ")}.`,
        keywords: [
            ...project.tech,
            project.category,
            project.industry,
            "Desarrollo Web Colombia",
            "Casos de Estudio Next.js",
            "Portafolio K&T Code",
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
            title: `${project.title} - Caso de Estudio | K&T Code`,
            description: project.description || project.shortDescription,
            type: "article",
            url: `https://www.kytcode.lat/projects/${slug}`,
            siteName: "K&T Code",
            images: [
                {
                    url: project.images.hero,
                    width: 1200,
                    height: 630,
                    alt: `Captura del proyecto ${project.title}`,
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} | Caso de Estudio K&T Code`,
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
    const project = await resolveProject(slug)

    if (!project) {
        notFound()
    }

    const projectJsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `https://www.kytcode.lat/projects/${slug}#project`,
        "name": project.title,
        "headline": `${project.title} - Caso de Estudio`,
        "description": project.description || project.shortDescription,
        "url": `https://www.kytcode.lat/projects/${slug}`,
        "image": project.images.hero,
        "dateCreated": project.year,
        "creator": {
            "@id": "https://www.kytcode.lat/#organization"
        },
        "provider": {
            "@id": "https://www.kytcode.lat/#organization"
        },
        "keywords": project.tech.join(", ")
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
                "name": project.title,
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
            <ProjectClientView project={project} />
        </>
    )
}
