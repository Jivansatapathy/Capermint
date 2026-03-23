const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const originalContent = content;
            
            // Replace HTTP localhost with relative /api paths
            content = content.replace(/http:\/\/localhost:3000\/api/g, '/api');
            content = content.replace(/http:\/\/localhost:3000\//g, '/');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated API URLs in: ${fullPath}`);
            }
        }
    });
}

const dirToProcess = path.join(__dirname, 'src');
processDir(dirToProcess);
console.log('Finished updating frontend URLs.');
