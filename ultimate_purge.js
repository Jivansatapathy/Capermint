const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'frontend/src');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return [];
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

    // 1. Wipe text fallbacks: || "any text" -> || ""
    const textRegex = /\|\|\s*\"[^"]+\"/g;
    if (textRegex.test(content)) {
        content = content.replace(textRegex, '|| ""');
        changed = true;
    }

    // 2. Wipe array fallbacks: || [ ... ] -> || []
    const arrayRegex = /\|\|\s*\[\s*\{[\s\S]*?\}\s*\]/g;
    if (arrayRegex.test(content)) {
        content = content.replace(arrayRegex, '|| []');
        changed = true;
    }

    // 3. Wipe object fallbacks: || { ... } -> || {}
    // Target objects with at least one property and multiple lines or nested brackets
    const objectRegex = /\|\|\s*\{\s*\n?\s*[a-zA-Z0-9_-]+\s*:\s*[\s\S]*?\}/g;
    if (objectRegex.test(content)) {
        content = content.replace(objectRegex, '|| {}');
        changed = true;
    }

    // 4. Wipe 'const defaultX = [ ... ]' or 'const defaultX = { ... }'
    const constRegex = /const default[A-Za-z0-9_]*\s*=\s*(?:\[[\s\S]*?\]|\{[\s\S]*?\});/g;
    if (constRegex.test(content)) {
        content = content.replace(constRegex, (match) => {
            const isArray = match.includes('= [');
            const nameMatch = match.match(/const (default[A-Za-z0-9_]*)/);
            if (nameMatch) {
                return `const ${nameMatch[1]} = ${isArray ? '[]' : '{}'};`;
            }
            return match;
        });
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`✅ Fully purged hardcoded data from ${path.basename(file)}`);
    }
});
