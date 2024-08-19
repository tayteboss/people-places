import {HomeIcon} from '@sanity/icons'

export default {
  title: 'Home Page',
  name: 'homePage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    {
      title: 'Reference Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
    },
    {
      title: 'SEO Title',
      name: 'seoTitle',
      type: 'string',
      description: 'This is the SEO title that appears in search engines.',
    },
    {
      title: 'SEO Description',
      name: 'seoDescription',
      type: 'string',
      description: 'This is the SEO description that appears in search engines.',
    },
    {
      title: 'People Section',
      name: 'peopleSection',
      type: 'object',
      fields: [
        {
          title: 'Media',
          name: 'peopleMedia',
          type: 'mux.video',
        },
        {
          title: 'Tagline',
          name: 'peopleTagline',
          type: 'string',
        },
      ],
      preview: {
        select: {
          media: 'peopleMedia',
          tagline: 'peopleTagline',
        },
        prepare(selection) {
          const {media, tagline} = selection
          return {
            title: tagline,
            media: media,
          }
        },
      },
    },
    {
      title: 'Places Section',
      name: 'projectSection',
      type: 'object',
      fields: [
        {
          title: 'Media',
          name: 'projectMedia',
          type: 'mux.video',
        },
        {
          title: 'Tagline',
          name: 'projectTagline',
          type: 'string',
        },
      ],
      preview: {
        select: {
          media: 'projectMedia',
          tagline: 'projectTagline',
        },
        prepare(selection) {
          const {media, tagline} = selection
          return {
            title: tagline,
            media: media,
          }
        },
      },
    },
  ],
}
