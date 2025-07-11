import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    serverExternalPackages: ['twoslash', 'typescript'],
    
    // 启用静态导出
    output: 'export',
    
    // 使用相对路径，支持二级目录部署
    assetPrefix: '',
    basePath: '',
    trailingSlash: true,
    
    // 优化配置
    compress: true,
    
    // 图片优化配置
    images: {
        unoptimized: true,
    },
    
    // webpack优化配置
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // 客户端优化
            config.optimization = {
                ...config.optimization,
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendors',
                            chunks: 'all',
                        },
                    },
                },
            };
        }
        return config;
    },
    
    // 编译配置
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
};

export default withMDX(config);
