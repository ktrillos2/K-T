import HeroSection from "@/components/sections/hero-section"
import dynamic from 'next/dynamic'
import { client } from "@/sanity/lib/client"

// Lazy load below-the-fold sections
const AboutSection = dynamic(() => import("@/components/sections/about-section"))
const ServicesSection = dynamic(() => import("@/components/sections/services-section"))
const ProjectsSection = dynamic(() => import("@/components/sections/projects-section"))
const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials-section"))
const InternationalSection = dynamic(() => import("@/components/sections/international-section"))
const ContactSection = dynamic(() => import("@/components/sections/contact-section"))
const Footer = dynamic(() => import("@/components/layout/footer"))

export const revalidate = 60;

async function getTestimonials() {
  return client.fetch(`
    *[_type == "testimonial" && status == "approved"] | order(_createdAt desc) {
      _id,
      name,
      role,
      content,
      rating,
      project,
      projectUrl,
      image
    }
  `)
}

export default async function Home() {
  const testimonials = await getTestimonials()

  return (
    <>
      <HeroSection />
      <AboutSection />
      <InternationalSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection initialTestimonials={testimonials} />
      <ContactSection />
      <Footer />
    </>
  )
}
