import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightLinksValidator from 'starlight-links-validator'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import compress from 'astro-compress'
import preact from '@astrojs/preact'

// https://astro.build/config
export default defineConfig({
  site: 'https://syno.ossdocs.org',
  prefetch: {
    prefetchAll: true
  },
  integrations: [
    starlight({
      plugins: [starlightLinksValidator()],
      social: {
        github: 'https://github.com/OssWithDocs/Syno/'
      },
      editLink: {
        baseUrl: 'https://github.com/OssWithDocs/Syno/edit/main/'
      },
      title: 'G6 Docs',
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
      customCss: [
        './src/styles/custom.css',
        './node_modules/pretendard/dist/web/static/pretendard.css',
        './src/styles/headings.css',
        './src/styles/linking.css'
      ],
      components: {
        Head: './src/components/Head.astro'
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
  }
})
