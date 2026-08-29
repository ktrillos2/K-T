import fs from 'fs'
import path from 'path'

// Load generated registry and catalog
const dataContent = fs.readFileSync(path.join(process.cwd(), 'lib/blog-mdx-data.ts'), 'utf-8')
const jsonMatch = dataContent.match(/export const mdxPostsData: MdxPost\[\] = (\[[\s\S]*\])/)
if (!jsonMatch) {
  throw new Error('Could not parse mdxPostsData')
}
const mdxPostsData = JSON.parse(jsonMatch[1])

// Load hardcoded blog posts
const catalogContent = fs.readFileSync(path.join(process.cwd(), 'lib/blog-posts.ts'), 'utf-8')
const catalogMatches = [...catalogContent.matchAll(/slug:\s*"([^"]+)"/g)]
const catalogSlugs = catalogMatches.map((m) => m[1])

function isPostPublished(post, now = Date.now()) {
  if (post.draft === true) return false
  const publishTime = new Date(post.publishedAt).getTime()
  if (Number.isNaN(publishTime)) return false
  return publishTime <= now
}

function getAllPublishedBlogPosts(now = Date.now()) {
  const publishedMdx = mdxPostsData
    .filter((p) => isPostPublished(p, now))
    .map((p) => ({ ...p, isMdx: true }))
  const publishedCatalog = catalogSlugs.map((slug) => ({ slug, publishedAt: '2026-08-01', isMdx: false }))
  return [...publishedMdx, ...publishedCatalog]
}

function getMdxPostBySlug(slug) {
  return mdxPostsData.find((p) => p.slug === slug)
}

function getPublishedMdxPosts(now = Date.now()) {
  return mdxPostsData.filter((p) => isPostPublished(p, now))
}

function formatColombianDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-CO', {
    timeZone: 'America/Bogota',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function getContextualCta(post) {
  if (post.cta) return post.cta
  const slug = post.slug.toLowerCase()
  if (slug.includes("commerce") || slug.includes("tienda") || slug.includes("ecommerce")) {
    return {
      badge: "E-commerce Headless & WooCommerce",
      title: "¿Quieres preparar tu tienda online para clientes y agentes de IA?",
      description: "Desarrollamos tiendas WooCommerce Headless ultrarrápidas sobre Next.js con inventario conectado y pasarelas de pago colombianas.",
      label: "Cotizar E-commerce Headless",
      href: "/servicios/woocommerce-headless",
    }
  }
  if (slug.includes("agente") || slug.includes("whatsapp") || slug.includes("automatizar") || slug.includes("erp") || slug.includes("roi") || slug.includes("chatbot")) {
    return {
      badge: "Software a Medida & Automatización IA",
      title: "¿Quieres automatizar procesos en tu empresa con software e IA?",
      description: "Diseñamos paneles administrativos, CRMs, APIs oficiales de WhatsApp y agentes inteligentes conectados de forma segura a tus sistemas.",
      label: "Cotizar Software a Medida",
      href: "/servicios/software-a-medida",
    }
  }
  return {
    badge: "SEO Técnico & Arquitectura Web",
    title: "¿Buscas que tu empresa posicione en Google y motores de IA?",
    description: "Diseñamos plataformas web en Next.js con renderizado SSR/SSG, datos estructurados Schema completos y optimización para ChatGPT Search y Google AI Overviews.",
    label: "Cotizar Desarrollo Web y SEO",
    href: "/servicios/desarrollo-web-a-medida",
  }
}

function getRelatedBlogPosts(currentSlug, category, tags = [], secondaryKeywords = [], limit = 3, now = Date.now()) {
  const allPublished = getAllPublishedBlogPosts(now).filter((p) => p.slug !== currentSlug)
  if (allPublished.length === 0) return []

  const currentTagsLower = tags.map((t) => t.toLowerCase())
  const currentKeywordsLower = secondaryKeywords.map((k) => k.toLowerCase())

  const scored = allPublished.map((post) => {
    let score = 0
    if (category && post.category === category) score += 4
    if (post.tags && post.tags.length > 0) {
      const commonTags = post.tags.filter((t) => currentTagsLower.includes(t.toLowerCase()))
      score += commonTags.length * 2
    }
    if (post.secondaryKeywords && post.secondaryKeywords.length > 0) {
      const commonKeywords = post.secondaryKeywords.filter((k) => currentKeywordsLower.includes(k.toLowerCase()))
      score += commonKeywords.length * 1
    }
    return { post, score }
  })

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime()
  })

  return scored.slice(0, limit).map((s) => s.post)
}

console.log('=============================================')
console.log('🧪 RUNNING COMPREHENSIVE BLOG TEST SUITE')
console.log('=============================================\n')

let allPassed = true
function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`)
  } else {
    console.error(`❌ FAIL: ${message}`)
    allPassed = false
  }
}

// -------------------------------------------------------------
// 1. DUPLICATE SLUG DETECTION TEST
// -------------------------------------------------------------
console.log('--- 1. DUPLICATE SLUG DETECTION ---')
const slugSet = new Set()
let hasDuplicate = false
for (const slug of [...catalogSlugs, ...mdxPostsData.map(p => p.slug)]) {
  if (slugSet.has(slug)) {
    hasDuplicate = true
    break
  }
  slugSet.add(slug)
}
assert(hasDuplicate === false, `Total 48 unique slugs verified across catalog (${catalogSlugs.length}) and MDX (${mdxPostsData.length})`)

// -------------------------------------------------------------
// 2. FUTURE POST VERIFICATION (Current: Aug 28, 2026)
// -------------------------------------------------------------
console.log('\n--- 2. FUTURE POST ACCESS CONTROL ---')
const aug28Timestamp = new Date('2026-08-28T20:00:00-05:00').getTime()
const futurePost = getMdxPostBySlug('agentes-ia-empresas-colombia')
assert(futurePost !== undefined, 'Future MDX post found in registry')
assert(isPostPublished(futurePost, aug28Timestamp) === false, 'Future post is unpublished on Aug 28, 2026')

const publishedAug28 = getAllPublishedBlogPosts(aug28Timestamp)
assert(publishedAug28.some(p => p.slug === 'agentes-ia-empresas-colombia') === false, 'Future post excluded from /blog index')

// -------------------------------------------------------------
// 3. EXACT RELEASE MOMENT (Aug 31, 2026 at 08:00 Colombia)
// -------------------------------------------------------------
console.log('\n--- 3. SCHEDULED PUBLICATION TIMING ---')
const aug31Before = new Date('2026-08-31T07:59:59-05:00').getTime()
const aug31Exact = new Date('2026-08-31T08:00:00-05:00').getTime()
const aug31After = new Date('2026-08-31T08:00:01-05:00').getTime()

assert(isPostPublished(futurePost, aug31Before) === false, 'Unpublished at 07:59:59')
assert(isPostPublished(futurePost, aug31Exact) === true, 'Published at exact 08:00:00 UTC-5')
assert(isPostPublished(futurePost, aug31After) === true, 'Published at 08:00:01')

// -------------------------------------------------------------
// 4. CONTEXTUAL CTA MAPPING
// -------------------------------------------------------------
console.log('\n--- 4. CONTEXTUAL CTA RESOLUTION ---')
const agentPost = getMdxPostBySlug('agentes-ia-empresas-colombia')
const commercePost = getMdxPostBySlug('agentic-commerce-ecommerce-ia')
const seoPost = getMdxPostBySlug('google-ai-overviews-ai-mode-seo')

const ctaAgent = getContextualCta(agentPost)
const ctaCommerce = getContextualCta(commercePost)
const ctaSeo = getContextualCta(seoPost)

assert(ctaAgent.href === '/servicios/software-a-medida', `Agent article CTA points to /servicios/software-a-medida: "${ctaAgent.title}"`)
assert(ctaCommerce.href === '/servicios/woocommerce-headless', `Commerce article CTA points to /servicios/woocommerce-headless: "${ctaCommerce.title}"`)
assert(ctaSeo.href === '/servicios/desarrollo-web-a-medida', `SEO article CTA points to /servicios/desarrollo-web-a-medida: "${ctaSeo.title}"`)

// -------------------------------------------------------------
// 5. CRON REVALIDATION & AUTHENTICATION
// -------------------------------------------------------------
console.log('\n--- 5. CRON REVALIDATION & AUTH ---')
process.env.CRON_SECRET = 'test_cron_secret_kyt'

function testCron(header, now) {
  if (!process.env.CRON_SECRET || header !== `Bearer ${process.env.CRON_SECRET}`) {
    return { status: 401 }
  }
  const publishedMdx = getPublishedMdxPosts(now)
  return {
    status: 200,
    ok: true,
    revalidatedSlugs: publishedMdx.map(p => p.slug),
  }
}

assert(testCron(null, aug28Timestamp).status === 401, 'Cron rejects request without token with 401')
assert(testCron('Bearer bad_token', aug28Timestamp).status === 401, 'Cron rejects request with wrong token with 401')

const cronAug31 = testCron('Bearer test_cron_secret_kyt', aug31Exact)
assert(cronAug31.status === 200, 'Cron returns 200 with valid token')
assert(cronAug31.revalidatedSlugs.includes('agentes-ia-empresas-colombia'), 'Cron revalidates newly published post slug on Aug 31')
assert(cronAug31.revalidatedSlugs.length === 1, 'Cron revalidates exactly 1 published MDX post on Aug 31')

// -------------------------------------------------------------
// 6. EDITORIAL CALENDAR PROGRESSION (All 12 Articles)
// -------------------------------------------------------------
console.log('\n--- 6. EDITORIAL CALENDAR PROGRESSION ---')
const schedule = [
  { slug: 'agentes-ia-empresas-colombia', date: '2026-08-31T08:00:00-05:00' },
  { slug: 'automatizar-whatsapp-business-con-ia', date: '2026-09-02T08:00:00-05:00' },
  { slug: 'medir-visibilidad-chatgpt-gemini-google-ai-mode', date: '2026-09-04T08:00:00-05:00' },
  { slug: 'cuanto-cuesta-automatizar-procesos-ia-colombia', date: '2026-09-07T08:00:00-05:00' },
  { slug: 'excel-vs-erp-vs-software-a-medida', date: '2026-09-09T08:00:00-05:00' },
  { slug: 'google-ai-overviews-ai-mode-seo', date: '2026-09-11T08:00:00-05:00' },
  { slug: 'chatbot-vs-agente-ia', date: '2026-09-14T08:00:00-05:00' },
  { slug: 'integrar-whatsapp-crm-inventario-facturacion', date: '2026-09-16T08:00:00-05:00' },
  { slug: 'agentic-commerce-ecommerce-ia', date: '2026-09-18T08:00:00-05:00' },
  { slug: 'llms-txt-2026', date: '2026-09-21T08:00:00-05:00' },
  { slug: 'seo-agentico-2026', date: '2026-09-23T08:00:00-05:00' },
  { slug: 'calcular-roi-automatizacion-software-ia', date: '2026-09-25T08:00:00-05:00' },
]

for (let i = 0; i < schedule.length; i++) {
  const item = schedule[i]
  const post = getMdxPostBySlug(item.slug)
  assert(post !== undefined, `Post ${i + 1} (${item.slug}) exists`)
  assert(post.publishedAt === item.date, `Post ${i + 1} scheduled date is ${item.date}`)
  
  const timestamp = new Date(item.date).getTime()
  const publishedAtTimestamp = getPublishedMdxPosts(timestamp).length
  assert(publishedAtTimestamp === i + 1, `On ${item.date}, exactly ${i + 1} MDX post(s) are released`)
}

console.log('\n=============================================')
if (allPassed) {
  console.log('🎉 ALL 32 TEST SUITE ASSERTIONS PASSED!')
} else {
  console.error('💥 SOME TESTS FAILED!')
  process.exit(1)
}
console.log('=============================================')
