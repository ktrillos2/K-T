import { getSupabaseServer } from '../lib/db'

async function fixAdminAndSeed() {
    const supabase = getSupabaseServer()
    const email = 'keteruse@gmail.com'

    console.log(`Checking Auth User for ${email}...`)
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers()
    if (authError) {
        console.error('Error listing users:', authError)
        return
    }

    const user = authData.users.find(u => u.email === email)
    if (!user) {
        console.error(`User with email ${email} not found in Auth. Please register first.`)
        return
    }

    console.log(`Upserting admin profile...`)
    const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            email: email,
            name: 'Administrador K&T',
            role: 'admin'
        }, { onConflict: 'email' })

    if (upsertError) {
        console.error('Error upserting profile:', upsertError)
    } else {
        console.log('Admin profile upserted successfully!')
    }

    console.log('\nSeeding dummy projects...')
    const dummyProjects = [
        {
            title: 'Desarrollo E-commerce Telas Real',
            client: 'Telas Real',
            description: 'Migración de plataforma y optimización SEO',
            priority: 'Alta',
            status: 'En Progreso',
            due_date: '2026-06-15',
            assigned_to: 'keteruse@gmail.com',
            total_profit: 1500000,
            paid_amount: 500000
        },
        {
            title: 'Bot de Seguros Sofía',
            client: 'Seguros S.A.',
            description: 'Implementación de chatbot con IA para cotizaciones',
            priority: 'Media',
            status: 'Pendiente',
            due_date: '2026-07-01',
            assigned_to: 'keteruse@gmail.com',
            total_profit: 800000,
            paid_amount: 0
        }
    ]

    const { error: seedError } = await supabase
        .from('projects')
        .insert(dummyProjects)

    if (seedError) {
        console.error('Error seeding projects:', seedError)
    } else {
        console.log('Dummy projects seeded successfully!')
    }
}

fixAdminAndSeed()
