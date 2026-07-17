type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

export default function JsonLd({ data }: JsonLdProps) {
  const scripts = Array.isArray(data) ? data : [data]

  return (
    <>
      {scripts.map((scriptData, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(scriptData).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  )
}
