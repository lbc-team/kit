#!/usr/bin/env python3
"""
测试API文档路径是否正确的脚本
"""

from pathlib import Path

def test_api_docs_path():
    """测试API文档路径是否正确"""
    docs_path = Path("../content/api")
    
    print(f"测试路径: {docs_path.resolve()}")
    
    if not docs_path.exists():
        print("❌ 错误: API文档路径不存在")
        return False
    
    print("✅ API文档路径存在")
    
    # 检查子目录
    expected_subdirs = ["functions", "interfaces", "type-aliases", "variables", "enumerations", "classes"]
    
    for subdir in expected_subdirs:
        subdir_path = docs_path / subdir
        if subdir_path.exists():
            print(f"✅ 找到子目录: {subdir}")
        else:
            print(f"❌ 缺少子目录: {subdir}")
    
    # 统计.mdx文件数量
    mdx_files = list(docs_path.rglob("*.mdx"))
    print(f"📄 总共找到 {len(mdx_files)} 个 .mdx 文件")
    
    # 显示前几个文件作为示例
    print("\n📋 前5个文件示例:")
    for i, file_path in enumerate(mdx_files[:5]):
        print(f"  {i+1}. {file_path.relative_to(docs_path)}")
    
    return True

if __name__ == "__main__":
    test_api_docs_path()