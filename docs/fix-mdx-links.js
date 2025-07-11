const fs = require('fs');
const path = require('path');

const BASE_URL = '/docs/kit';

function fixMdxLinks(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            fixMdxLinks(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let hasChanges = false;
            
            // 修复markdown链接中的内部路径
            // [text](/docs/xxx) -> [text](/docs/kit/docs/xxx)
            content = content.replace(/\[([^\]]+)\]\(\/docs\/([^)]+)\)/g, (match, text, path) => {
                hasChanges = true;
                return `[${text}](${BASE_URL}/docs/${path})`;
            });
            
            // 修复markdown链接中的API路径
            // [text](/api/xxx) -> [text](/docs/kit/api/xxx)
            content = content.replace(/\[([^\]]+)\]\(\/api\/([^)]+)\)/g, (match, text, path) => {
                hasChanges = true;
                return `[${text}](${BASE_URL}/api/${path})`;
            });
            
            if (hasChanges) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Fixed: ${fullPath}`);
            }
        }
    }
}

console.log('Starting MDX links fixing...');
fixMdxLinks('./content');
console.log('MDX links fixing completed.'); 