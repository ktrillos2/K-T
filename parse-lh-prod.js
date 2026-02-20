const fs = require('fs');
const targetFile = process.argv[2] || './lighthouse-prod.json';

try {
    const data = JSON.parse(fs.readFileSync(targetFile, 'utf8'));

    console.log('--- SCORES PROD ---');
    Object.values(data.categories).forEach(cat => {
        console.log(`${cat.title}: ${Math.round(cat.score * 100)}`);
    });

    console.log('\n--- TOP OPPORTUNITIES ---');
    const audits = data.audits;
    const opportunities = Object.values(audits)
        .filter(a => a.details && a.details.type === 'opportunity' && a.score !== 1 && a.score !== null)
        .sort((a, b) => (b.details.overallSavingsMs || 0) - (a.details.overallSavingsMs || 0));

    opportunities.slice(0, 5).forEach(o => {
        console.log(`- ${o.title}`);
        console.log(`  Savings: ${Math.round(o.details.overallSavingsMs || 0)}ms`);
        console.log(`  Description: ${o.description}`);
    });

    console.log('\n--- METRICS ---');
    const metrics = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index'];
    metrics.forEach(m => {
        if (audits[m]) {
            console.log(`- ${audits[m].title}: ${audits[m].displayValue} (Score: ${Math.round(audits[m].score * 100)})`);
        }
    });

} catch (err) {
    console.error("Error reading lighthouse-prod.json:", err.message);
}
