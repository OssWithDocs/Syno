import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightLinksValidator from 'starlight-links-validator'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import compress from 'astro-compress'
import preact from '@astrojs/preact'

import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true
  },
  site: 'https://syno.ossdocs.org',
  integrations: [
    starlight({
      plugins: [starlightLinksValidator()],
      title: 'Syno Docs',
      defaultLocale: 'root',
      locales: {
        root: {
          label: '한국어',
          lang: 'ko'
        },
        en: {
          label: 'English'
        },
        jp: {
          label: '日本語'
        },
        'zh-cn': {
          label: '简体中文',
          lang: 'zh-CN'
        }
      },
      components: {
        Head: './src/components/Head.astro'
      },
      customCss: [
        './src/styles/custom.css',
        './node_modules/pretendard/dist/web/static/pretendard.css',
        './src/styles/headings.css',
        './src/styles/linking.css'
      ],
      social: {
        github: 'https://github.com/OssWithDocs/Syno/'
      },
      editLink: {
        baseUrl: 'https://github.com/OssWithDocs/Syno/edit/main/'
      }
    }),
    compress({
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: true
    }),
    preact()
  ],
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          // Wrap the heading text in a link.
          behavior: 'wrap'
        }
      ],
      rehypeAutolinkHeadings
    ]
  },
  output: 'hybrid',
  adapter: cloudflare()
})
