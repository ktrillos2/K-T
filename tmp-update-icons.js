const fs = require('fs');
const { execSync } = require('child_process');

async function build() {
    console.log("Installing temporary dependencies...");
    execSync('npm install sharp png-to-ico --no-save', {stdio: 'inherit'});
    
    const sharp = require('sharp');
    const pngToIco = require('png-to-ico');
    
    // SVG data for Apple Icon (needs a white background for visibility)
    // The provided K logo has a black background and white K. 
    // This is fine. We will use the SVG directly.
    const svg = fs.readFileSync('public/icon.svg');
    
    console.log("Generating PNGs...");
    await sharp(svg).resize(512, 512, { kernel: sharp.kernel.nearest }).toFile('public/icon.png');
    await sharp(svg).resize(512, 512, { kernel: sharp.kernel.nearest }).toFile('app/icon.png');
    await sharp(svg).resize(180, 180, { kernel: sharp.kernel.nearest }).toFile('public/apple-icon.png');
    await sharp(svg).resize(180, 180, { kernel: sharp.kernel.nearest }).toFile('app/apple-icon.png');
    
    console.log("Generating ICO...");
    
    // Need to create a temporary PNG to feed to png-to-ico
    const pngBuffer = await sharp(svg).resize(256, 256, { kernel: sharp.kernel.nearest }).toBuffer();
    fs.writeFileSync('temp-icon.png', pngBuffer);
    
    const icoBuf = await pngToIco('temp-icon.png');
    fs.writeFileSync('public/favicon.ico', icoBuf);
    
    // Cleanup
    fs.unlinkSync('temp-icon.png');
    
    console.log("Done!");
}
build().catch(console.error);
