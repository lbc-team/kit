import llm_translator
from config import LLM_MODEL_DEEPSEEK_V3, LLM_MODEL_GPT_4O_MINI, OPENROUTER_MODEL_GEMINI_20_FLASH
import os
from pathlib import Path


def translate_markdownx(content):
    models = [OPENROUTER_MODEL_GEMINI_20_FLASH, LLM_MODEL_GPT_4O_MINI]
    for model in models:
        try:
            translator = llm_translator.LLMTranslator(model)
            result = translator.translate_markdown(content)
            if result:
                return result
        except Exception as e:
            print(f"使用模型 {model} 翻译失败: {e}")
            continue
    return None

def translate_docs_directory():
    docs_path = Path("../content/docs")
    if not docs_path.exists():
        print("错误: @content/docs 目录不存在")
        return

    # 遍历所有文件
    for file_path in docs_path.rglob("*.mdx"):
        try:
            print(f"正在处理文件: {file_path}")

            # 如果已经有 .bak 的同名文件，跳过翻译
            bak_path = file_path.with_suffix(".mdx.bak")
            print(f"bak_path: {bak_path}")
            if bak_path.exists():
                print(f"跳过翻译文件: {file_path}，因为存在同名 .bak 文件")
                continue
            
            # 读取文件内容
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # 翻译内容
            translated_content = translate_markdownx(content)
            
            if translated_content:
                # 备份原文件
                backup_path = str(file_path) + ".bak"
                os.rename(file_path, backup_path)
                
                # 写入翻译后的内容
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(translated_content)
                print(f"成功翻译文件: {file_path}")
            else:
                print(f"翻译失败: {file_path}")
                
        except Exception as e:
            print(f"处理文件 {file_path} 时发生错误: {e}")




if __name__ == "__main__":
    translate_docs_directory()


    # with open("../content/docs/basics/index.mdx", "r", encoding="utf-8") as f:
    #     content = f.read()
    
    # # 翻译内容
    # translated_content = translate_markdownx(content)

    # with open("../content/docs/basics/index_trans.mdx", "w", encoding="utf-8") as f:
    #     f.write(translated_content)
