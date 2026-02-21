const fs = require('fs');

async function main() {
    try {
        const sharp = require('sharp');
        const pngToIco = require('png-to-ico');

        console.log("Reading SVG...");
        const svg = fs.readFileSync('public/icon.svg');
        
        console.log("Generating PNG images...");
        await sharp(svg).resize(512, 512, { kernel: sharp.kernel.nearest }).toFile('public/icon.png');
        await sharp(svg).resize(512, 512, { kernel: sharp.kernel.nearest }).toFile('app/icon.png');
        await sharp(svg).resize(180, 180, { kernel: sharp.kernel.nearest }).toFile('public/apple-icon.png');
        await sharp(svg).resize(180, 180, { kernel: sharp.kernel.nearest }).toFile('app/apple-icon.png');

        console.log("Generating 256x256 PNG for favicon...");
        await sharp(svg).resize(256, 256, { kernel: sharp.kernel.nearest }).toFile('public/temp-ico.png');
        
        console.log("Generating ICO...");
        const icoBuffer = await pngToIco('public/temp-ico.png');
        
        console.log("Writing favicon.ico...");
        fs.writeFileSync('public/favicon.ico', icoBuffer);
        fs.unlinkSync('public/temp-ico.png');
        
        console.log("Icons successfully generated!");
    } catch (error) {
        console.error("Error generating icons:", error);
    }
}

main();
