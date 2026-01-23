import HeroSection from "@/components/sections/hero-section"
import dynamic from 'next/dynamic'

// Lazy load below-the-fold sections
const AboutSection = dynamic(() => import("@/components/sections/about-section"))
const ServicesSection = dynamic(() => import("@/components/sections/services-section"))
const ProjectsSection = dynamic(() => import("@/components/sections/projects-section"))
const InternationalSection = dynamic(() => import("@/components/sections/international-section"))
const ContactSection = dynamic(() => import("@/components/sections/contact-section"))
const Footer = dynamic(() => import("@/components/layout/footer"))

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <InternationalSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </>
  )
}
