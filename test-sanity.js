const { createClient } = require('next-sanity');

const writeClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2026-01-28',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function main() {
    try {
        const doc = {
            _type: 'testimonial',
            name: 'Test Name',
            project: 'Test Project',
            rating: 5,
            content: 'This is a test message',
            role: 'Test Role',
            status: 'pending',
        };
        const res = await writeClient.create(doc);
        console.log('Success:', res);
    } catch (e) {
        console.error('Error:', e.message);
    }
}
main();
