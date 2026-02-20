const fs = require('fs');

try {
    const data = JSON.parse(fs.readFileSync('./lighthouse.json', 'utf8'));

    console.log('--- SCORES ---');
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

    console.log('\n--- DIAGNOSTICS & FAILED AUDITS ---');
    const failedAudits = Object.values(audits)
        .filter(a => a.score !== null && a.score < 0.8 && (!a.details || a.details.type !== 'opportunity'))
        .sort((a, b) => a.score - b.score);

    failedAudits.slice(0, 5).forEach(a => {
        console.log(`- ${a.title} (Score: ${Math.round(a.score * 100)})`);
        console.log(`  Description: ${a.description}`);
    });

} catch (err) {
    console.error("Error reading lighthouse.json:", err.message);
}
