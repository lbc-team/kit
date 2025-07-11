import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookTextIcon, LibraryBigIcon } from 'lucide-react';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
    nav: {
        title: (
            <>
                <svg
                    className="w-6 h-6"
                    width="353"
                    height="353"
                    viewBox="0 0 353 353"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M207.264 57.2222C209.416 59.3766 210.624 62.2976 210.624 65.3432L210.624 346.351C210.624 351.47 204.437 354.032 200.82 350.411L145.361 294.884C143.209 292.73 141.998 289.808 141.998 286.762L141.998 5.75421C141.998 0.635326 148.186 -1.92732 151.803 1.69423L207.264 57.2222Z"
                        fill="currentColor"
                    />
                    <path
                        d="M62.1421 89.1598C64.2964 91.3142 66.1421 94.2352 66.1421 97.2808V346.351C66.1421 351.47 59.9543 354.032 56.3375 350.411L0.876404 294.884C-1.27797 292.73 -2.48869 289.808 -2.48869 286.762V5.75421C-2.48869 0.635326 3.69917 -1.92732 7.31587 1.69423L62.1421 89.1598Z"
                        fill="currentColor"
                    />
                    <path
                        d="M352.488 89.1598C354.643 91.3142 352.488 94.2352 352.488 97.2808V346.351C352.488 351.47 346.301 354.032 342.684 350.411L287.223 294.884C285.069 292.73 283.858 289.808 283.858 286.762V5.75421C283.858 0.635326 290.046 -1.92732 293.662 1.69423L352.488 89.1598Z"
                        fill="currentColor"
                    />
                </svg>
                KIT
            </>
        ),
        transparentMode: 'top',
    },
    links: [
        {
            text: 'Documentation',
            url: '/docs/kit/docs/',
            icon: <BookTextIcon />,
        },
        {
            text: 'API Reference',
            url: '/docs/kit/api/',
            icon: <LibraryBigIcon />,
        },
        {
            text: '更多Web3相关文档',
            url: 'https://learnblockchain.cn/manuals',
            external: true,
            icon: (
                <img 
                    src="https://learnblockchain.cn/css/default/file.png" 
                    alt="更多Web3相关文档" 
                    style={{ width: '16px', height: '16px' }}
                />
            ),
        },
    ],
};
