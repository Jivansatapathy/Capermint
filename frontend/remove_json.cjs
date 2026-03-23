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
            
            // Remove the import line
            content = content.replace(/import\s+contentData\s+from\s+['"].*?content\.json['"];?\r?\n?/g, '');
            
            // Replace contentData.something || defaultContent with just defaultContent
            content = content.replace(/contentData\.[a-zA-Z0-9_]+\s*\|\|\s*/g, '');
            
            // In App.jsx, it has: const [content, setContent] = useState(contentData);
            // Replace with useState({})
            content = content.replace(/useState\(contentData\)/g, 'useState({})');

            // In some files, there's `contentData` alone
            content = content.replace(/= contentData;/g, '= {};');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`Removed static content.json from: ${fullPath}`);
            }
        }
    });
}

const dirToProcess = path.join(__dirname, 'src');
processDir(dirToProcess);

// Delete the static content.json in frontend if it exists
const contentJsonPath = path.join(__dirname, 'content.json');
if (fs.existsSync(contentJsonPath)) {
    fs.unlinkSync(contentJsonPath);
    console.log('Deleted static frontend/content.json');
}

console.log('Done cleaning up static JSON fallbacks.');
