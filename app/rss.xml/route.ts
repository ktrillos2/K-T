import { getAllPublishedBlogPosts } from "@/lib/blog-mdx"
import { siteConfig } from "@/lib/site-config"

// Revalidate every hour so new posts automatically populate the RSS feed
export const revalidate = 3600

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[character] || character)
}

export function GET() {
  // Only published posts (excluding drafts and future scheduled posts)
  const publishedPosts = getAllPublishedBlogPosts()

  const items = publishedPosts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`
    )
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${escapeXml(siteConfig.name)} Blog</title>
      <link>${siteConfig.url}/blog</link>
      <description>${escapeXml(siteConfig.description)}</description>
      <language>es-CO</language>
      ${items}
    </channel>
  </rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
