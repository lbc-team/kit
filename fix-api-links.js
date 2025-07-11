const fs = require('fs');
const path = require('path');

let fixedFiles = 0;
let totalFiles = 0;

function fixApiLinks(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      fixApiLinks(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      totalFiles++;
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      // 修复所有 ../../../api/ 的链接
      const originalContent = content;
      content = content.replace(/href="\.\.\/\.\.\/\.\.\/api\//g, 'href="/docs/kit/api/');
      
      // 修复所有 ../../../docs/ 的链接
      content = content.replace(/href="\.\.\/\.\.\/\.\.\/docs\//g, 'href="/docs/kit/docs/');
      
      // 修复所有直接 /api/ 的链接（但不是 /docs/kit/api/）
      content = content.replace(/href="\/api\//g, 'href="/docs/kit/api/');
      
      // 修复所有直接 /docs/ 的链接（但不是 /docs/kit/docs/）
      content = content.replace(/href="\/docs\//g, 'href="/docs/kit/docs/');
      
      // 修复JSON格式中的错误链接
      content = content.replace(/"href":"\/api\//g, '"href":"/docs/kit/api/');
      content = content.replace(/"href":"\/docs\//g, '"href":"/docs/kit/docs/');
      
      // 修复更多可能的模式
      content = content.replace(/"href"\s*:\s*"\/api\//g, '"href":"/docs/kit/api/');
      content = content.replace(/"href"\s*:\s*"\/docs\//g, '"href":"/docs/kit/docs/');
      
      if (content !== originalContent) {
        modified = true;
        fixedFiles++;
        fs.writeFileSync(fullPath, content, 'utf8');
      }
      
      if (modified) {
        console.log(`Fixed: ${fullPath}`);
      }
    }
  }
}

console.log('Starting API links fix...');
fixApiLinks('out');
console.log(`Fixed ${fixedFiles} files out of ${totalFiles} total files.`); 