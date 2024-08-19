import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {muxInput} from 'sanity-plugin-mux-input'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'
import {EarthGlobeIcon, DocumentIcon} from '@sanity/icons'

export default defineConfig({
  name: 'default',
  title: 'People Places',

  projectId: 'sk5po856',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .icon(EarthGlobeIcon)
              .child(S.editor().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('Home Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('homePage').documentId('homePage')),
          ])
      },
    }),
    visionTool(),
    muxInput({mp4_support: 'standard'}),
    vercelDeployTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  parts: [
    {
      name: 'part:@sanity/base/theme/variables-style',
      path: './customEditorStyles.css',
    },
  ],
})
