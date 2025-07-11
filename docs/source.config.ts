import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import { remarkInstall } from 'fumadocs-docgen';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const api = defineDocs({
    dir: 'content/api',
});

export const docs = defineDocs({
    dir: 'content/docs',
});

export default defineConfig({
    mdxOptions: {
        rehypeCodeOptions: {
            langs: [
                // 支持更多语言
                'js',
                'javascript',
                'ts',
                'typescript',
                'tsx',
                'jsx',
                'json',
                'bash',
                'sh',
                'shell',
                'markdown',
                'md',
                'html',
                'css',
            ],
            themes: {
                dark: 'github-dark',
                light: 'github-light',
            },
            transformers: rehypeCodeDefaultOptions.transformers ?? [],
        },
        remarkPlugins: [() => remarkInstall({ persist: { id: 'package-install' } })],
    },
});
