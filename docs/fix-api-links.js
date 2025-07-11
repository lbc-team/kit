const fs = require('fs');
const path = require('path');

const BASE_URL = '/docs/kit';

function fixApiLinksInFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content;
    let hasChanges = false;

    // 修复API内部的相对路径链接
    // 匹配形如 href="../../../api/xxxx" 的链接
    const apiRelativeLinks = content.match(/href="(\.\.\/){1,4}api\/[^"]*"/g);
    if (apiRelativeLinks) {
        apiRelativeLinks.forEach(link => {
            const originalHref = link.match(/href="([^"]*)"/)[1];
            // 提取API路径部分
            const apiPath = originalHref.match(/api\/(.+)/)[1];
            const newHref = `${BASE_URL}/api/${apiPath}`;
            const newLink = `href="${newHref}"`;
            
            updatedContent = updatedContent.replace(link, newLink);
            hasChanges = true;
        });
    }

    // 修复文档内部的相对路径链接
    // 匹配形如 href="../../../docs/xxxx" 的链接
    const docsRelativeLinks = content.match(/href="(\.\.\/){1,4}docs\/[^"]*"/g);
    if (docsRelativeLinks) {
        docsRelativeLinks.forEach(link => {
            const originalHref = link.match(/href="([^"]*)"/)[1];
            // 提取docs路径部分
            const docsPath = originalHref.match(/docs\/(.+)/)[1];
            const newHref = `${BASE_URL}/docs/${docsPath}`;
            const newLink = `href="${newHref}"`;
            
            updatedContent = updatedContent.replace(link, newLink);
            hasChanges = true;
        });
    }

    if (hasChanges) {
        fs.writeFileSync(filePath, updatedContent);
        return true;
    }
    return false;
}

function processDirectory(dir) {
    let totalFixed = 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            totalFixed += processDirectory(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.html')) {
            if (fixApiLinksInFile(fullPath)) {
                totalFixed++;
            }
        }
    }
    
    return totalFixed;
}

// 处理整个out目录
const outDir = 'out';
const fixedCount = processDirectory(outDir);
console.log(`Fixed internal API/docs links in ${fixedCount} files.`); 