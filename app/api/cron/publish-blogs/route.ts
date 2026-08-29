import { NextRequest } from "next/server"
import { revalidatePath } from "next/cache"
import { getPublishedMdxPosts } from "@/lib/blog-mdx"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")

  if (
    !process.env.CRON_SECRET ||
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  const now = Date.now()
  const publishedMdxPosts = getPublishedMdxPosts(now)

  // 1. Revalidate core discovery and feed routes
  revalidatePath("/blog")
  revalidatePath("/sitemap.xml")
  revalidatePath("/rss.xml")
  revalidatePath("/")
  revalidatePath("/autores/keyner-trillos")

  // 2. Revalidate specifically published MDX post routes
  for (const post of publishedMdxPosts) {
    revalidatePath(`/blog/${post.slug}`)
  }

  return Response.json({
    ok: true,
    executedAt: new Date().toISOString(),
    publishedMdxCount: publishedMdxPosts.length,
    revalidatedSlugs: publishedMdxPosts.map((p) => p.slug),
  })
}
