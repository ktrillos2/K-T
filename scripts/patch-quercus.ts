import { createClient } from 'next-sanity'
import { config } from 'dotenv'

config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bc3zxc91',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-01-28',
  useCdn: false,
})

async function run() {
  const doc = await client.fetch(`*[_type == "cotizacion" && subdomain match "quercus*"][0]`)
  if (!doc) {
    console.log("No se encontró la cotización de Quercus")
    return
  }
  
  console.log("Cotización encontrada:", doc.title, doc._id)
  
  // Find the map item
  const items = doc.investmentItems || []
  let found = false
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.concept.toLowerCase().includes('mapa')) {
      // Modificar
      item.concept = "Adicional: Mapa Interactivo Desarrollado a la Medida (Por el desarrollo inicial de la página, hay un descuento en promoción de 5 mapas por $150 USD. Normalmente, cada mapa interactivo individual tiene un valor de $50 USD)"
      item.value = "$150 USD"
      found = true
    }
  }

  if (found) {
    console.log('Realizando patch...')
    await client
      .patch(doc._id)
      .set({ investmentItems: items })
      .commit()
    console.log('Patch exitoso!')
  } else {
    console.log('No se encontró el mapa en los items:', items)
  }
}

run().catch(console.error)
