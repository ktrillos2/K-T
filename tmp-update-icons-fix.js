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
    
    console.log("Generating Apple Icons...");
    
    // For Apple icon, we need a white background behind the icon
    // Create a 180x180 white background first, then composite the K over it, but the K itself has to be drawn correctly.
    // Our SVG already has a black background rectangle and white K. 
    // Apple icons usually don't support transparency, so this should be fine.
    await sharp(svg).resize(180, 180, { kernel: sharp.kernel.nearest }).toFile('public/apple-icon.png');
    await sharp(svg).resize(180, 180, { kernel: sharp.kernel.nearest }).toFile('app/apple-icon.png');
    
    console.log("Generating ICO...");
    
    // ICO usually expects 16x16, 32x32, 48x48 etc.
    // Sharp can't natively output ico. png-to-ico takes a list of pngs or one png and generates necessary sizes.
    // Let's create a 256x256 png for ico generation first
    const icoInput = await sharp(svg).resize(256, 256, { kernel: sharp.kernel.nearest }).toBuffer();
    
    // png-to-ico requires a file path or buffer. We'll use buffer.
    const icoBuf = await pngToIco(icoInput);
    fs.writeFileSync('public/favicon.ico', icoBuf);
    fs.writeFileSync('app/favicon.ico', icoBuf); // the app directory one is also used sometimes
    
    console.log("Done!");
}
build().catch(console.error);
