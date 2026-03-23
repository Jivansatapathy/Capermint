const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'frontend/src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(srcPath);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // 1. Wipe hardcoded arrays defined by [] or || []
    // Look for patterns like: items || [ { ... } ]
    const arrayRegex = /\|\|\s*\[\s*\{[\s\S]*?\}\s*\]/g;
    if (arrayRegex.test(content)) {
        content = content.replace(arrayRegex, '|| []');
        console.log(`- Cleared hardcoded inline array in ${path.basename(file)}`);
        changed = true;
    }

    // 2. Wipe hardcoded objects defined by || { ... }
    // Look for patterns like: hero || { title: "..." }
    const objectRegex = /\|\|\s*\{\s*\n?\s*[a-zA-Z0-9_-]+\s*:\s*[\s\S]*?\}/g;
    if (objectRegex.test(content)) {
        content = content.replace(objectRegex, '|| {}');
        console.log(`- Cleared hardcoded inline object in ${path.basename(file)}`);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
    }
});
