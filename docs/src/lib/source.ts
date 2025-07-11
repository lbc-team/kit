import { api, docs } from '@/.source';
import { loader } from 'fumadocs-core/source';

// 为子目录部署配置基础路径
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/docs/kit' : '';

export const apiSource = loader({
    baseUrl: `${BASE_PATH}/api`,
    source: api.toFumadocsSource(),
});

export const docsSource = loader({
    baseUrl: `${BASE_PATH}/docs`,
    source: docs.toFumadocsSource(),
});
