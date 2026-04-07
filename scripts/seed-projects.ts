import { createClient } from 'next-sanity'
import * as fs from 'fs'
import * as path from 'path'
import { config } from 'dotenv'
config({ path: '.env.local' })

// Datos actuales estáticos
import { projects as legacyProjects, Project } from '../lib/projects'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bc3zxc91',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-01-28',
  useCdn: false,
})

// El nuevo proyecto de Qvareli
const qvareliProject: Project = {
    id: "qvareli",
    slug: "qvareli",
    title: "Qvareli",
    shortDescription: "Consultoría de negocios y soluciones tecnológicas",
    description: "Qvareli impulsa el crecimiento interno organizativo y la eficiencia corporativa mediante asesoría estratégica en negocios e implementación de transformaciones tecnológicas a medida.",
    year: "2026",
    month: "Abril",
    category: "Consultoría / Tecnología",
    tech: ["Next.js", "React", "Framer Motion"],
    images: {
        hero: "/images/projects/qvareli.png",
        mobile: "/images/projects/qvareli-mobile.png",
    },
    liveUrl: "https://qvareli.com",
    content: {
        challenge: "La firma Qvareli necesitaba asentar una presencia digital de altísimo impacto visual que comunicara autoridad corporativa y versatilidad en sus dos ramas: la consultoría en negocios y el desarrollo de software a medida.",
        solution: "Arquitecturizamos una experiencia corporativa inmersiva, optimizada para cargar de forma ultra veloz. Se desarrolló una plataforma web vanguardista enfocada en la captación de leads empresariales B2B.",
        seoFocus: "Consultoría de negocios, transformación digital, y soluciones tecnológicas empresariales para ecosistemas B2B.",
    },
}

const allProjects = [...legacyProjects, qvareliProject]

async function uploadImage(imagePath: string, altText: string) {
    if (!imagePath) return null;
    
    // Convertir de formato /images/... a ruta absoluta base local
    const localPath = path.join(process.cwd(), 'public', imagePath)
    
    if (!fs.existsSync(localPath)) {
        console.warn(`⚠️  Imagen no encontrada en disco local: ${localPath}`)
        return null;
    }

    try {
        console.log(`Subiendo asset: ${imagePath}...`)
        const asset = await client.assets.upload('image', fs.createReadStream(localPath), {
            filename: path.basename(localPath)
        })
        return {
            _type: 'image',
            asset: {
                _type: "reference",
                _ref: asset._id
            },
            alt: altText
        }
    } catch (error) {
        console.error(`❌ Error subiendo imagen ${localPath}:`, error)
        return null;
    }
}

async function seedProjects() {
  console.log('🚀 Iniciando la migración del Portafolio a Sanity...\n')

  let orderCounter = 1;
  for (const proj of allProjects) {
    try {
      // Check if already exists
      const existing = await client.fetch(
        `*[_type == "project" && slug.current == $slug][0]._id`,
        { slug: proj.slug }
      )

      if (existing) {
        console.log(`⏭️  El proyecto "${proj.title}" ya existe (${existing}), saltando...`)
        orderCounter++;
        continue
      }

      console.log(`\n⏳ Procesando "${proj.title}"...`)

      // Subir imágenes primero
      const heroImageAsset = await uploadImage(proj.images.hero, proj.title + " desktop preview")
      const mobileImageAsset = await uploadImage(proj.images.mobile, proj.title + " mobile preview")

      // Construir el documento de sanity
      const sanityDoc = {
          _type: 'project',
          title: proj.title,
          slug: { _type: 'slug', current: proj.slug },
          orderId: orderCounter++,
          shortDescription: proj.shortDescription,
          description: proj.description,
          year: proj.year,
          month: proj.month,
          category: proj.category,
          tech: proj.tech,
          heroImage: heroImageAsset || undefined,
          mobileImage: mobileImageAsset || undefined,
          liveUrl: proj.liveUrl || undefined,
          challenge: proj.content?.challenge || '',
          solution: proj.content?.solution || '',
          seoFocus: proj.content?.seoFocus || '',
      }

      const result = await client.create(sanityDoc)
      console.log(`✅ Creado: "${proj.title}" → ${result._id}`)
    } catch (err) {
      console.error(`❌ Error general procesando "${proj.title}":`, err)
    }
  }

  console.log('\n🏁 Migración del Portafolio completada.')
}

seedProjects()
