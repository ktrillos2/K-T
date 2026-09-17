import { NextResponse } from 'next/server'
import { getAllProjects } from '@/sanity/lib/queries'
import { projects as hardcodedProjects, sortProjectsByDateDesc } from '@/lib/projects'

export const revalidate = 60

export async function GET() {
    try {
        const sanityProjects = await getAllProjects()
        const allSlugSet = new Set(sanityProjects.map(p => p.slug))
        const combined = [
            ...sanityProjects,
            ...hardcodedProjects.filter(p => !allSlugSet.has(p.slug))
        ]
        return NextResponse.json(sortProjectsByDateDesc(combined))
    } catch (error) {
        console.error('Error fetching projects:', error)
        return NextResponse.json(sortProjectsByDateDesc(hardcodedProjects))
    }
}
