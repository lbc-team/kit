const fs = require('fs');
const path = require('path');

function getDepth(filePath) {
    return filePath.split('/').length - 1;
}

function getRelativePathPrefix(depth) {
    if (depth === 0) return './';
    return '../'.repeat(depth);
}

function fixPathsInFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const depth = getDepth(filePath.replace('out/', ''));
    
    let updatedContent = content;
    let hasChanges = false;

    // 修复所有静态资源路径为相对路径（排除已经是相对路径的）
    const resourcePattern = /(?:href|src)="\/(?!https?:\/\/)([^"]+)"/g;
    updatedContent = updatedContent.replace(resourcePattern, (match, resourcePath) => {
        // 跳过已经修复的路径和外部URL
        if (resourcePath.startsWith('docs/kit/') || resourcePath.startsWith('http')) {
            return match;
        }
        
        const relativePrefix = getRelativePathPrefix(depth);
        const newPath = `${match.split('="')[0]}="${relativePrefix}${resourcePath}"`;
        hasChanges = true;
        return newPath;
    });

    if (hasChanges) {
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Fixed: ${filePath}`);
    }
}

function processDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            processDirectory(fullPath);
        } else if (entry.isFile() && (entry.name.endsWith('.html') || entry.name.endsWith('.txt'))) {
            fixPathsInFile(fullPath);
        }
    }
}

console.log('开始修复路径...');
processDirectory('out');
console.log('路径修复完成。'); 