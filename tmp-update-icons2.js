const fs = require('fs');
const { execSync } = require('child_process');

async function build() {
    console.log("Installing temporary dependencies...");
    execSync('npm install sharp png-to-ico --no-save', {stdio: 'inherit'});
    
    const sharp = require('sharp');
    const pngToIco = require('png-to-ico');
    
    const svg = fs.readFileSync('public/icon.svg');
    
    console.log("Generating PNGs...");
    await sharp(svg).resize(512, 512, { kernel: sharp.kernel.nearest }).toFile('public/icon.png');
    await sharp(svg).resize(512, 512, { kernel: sharp.kernel.nearest }).toFile('app/icon.png');
    await sharp(svg).resize(180, 180, { kernel: sharp.kernel.nearest }).toFile('public/apple-icon.png');
    await sharp(svg).resize(180, 180, { kernel: sharp.kernel.nearest }).toFile('app/apple-icon.png');
    
    console.log("Generating ICO...");

    const pngBuffer = await sharp(svg).resize(256, 256, { kernel: sharp.kernel.nearest }).toBuffer();
    
    // Save the intermediate png
    fs.writeFileSync('public/temp-favicon.png', pngBuffer);
    
    const icoBuf = await pngToIco('public/temp-favicon.png');
    fs.writeFileSync('public/favicon.ico', icoBuf);
    fs.writeFileSync('app/favicon.ico', icoBuf); // the app directory one is also used sometimes
    
    fs.unlinkSync('public/temp-favicon.png');
    
    console.log("Done!");
}
build().catch(console.error);
