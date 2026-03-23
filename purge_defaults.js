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

    // 1. Wipe default arrays [ ... ]
    const arrayRegex = /const (default[A-Za-z0-9_]*|items|slides|features) = \[\s*\{[\s\S]*?\}\s*\];/g;
    if (arrayRegex.test(content)) {
        content = content.replace(arrayRegex, (match, p1) => {
            console.log(`- Wiping array ${p1} in ${path.basename(file)}`);
            return `const ${p1} = [];`;
        });
        changed = true;
    }

    // 2. Wipe default objects { ... }
    const objectRegex = /const (default[A-Za-z0-9_]*|hero|cta|about) = \{\s*[\s\S]*?\};/g;
    // We only want to target large ones that look like data records
    if (objectRegex.test(content)) {
        content = content.replace(objectRegex, (match, p1) => {
            // Check if it's a large object (more than 50 chars)
            if (match.length > 50) {
                console.log(`- Wiping object ${p1} in ${path.basename(file)}`);
                return `const ${p1} = {};`;
            }
            return match;
        });
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
    }
});
