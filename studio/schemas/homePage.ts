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
          title: 'Captions',
          name: 'peopleCaptions',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{type: 'caption'}],
            },
          ],
        },
        {
          title: 'Location Title',
          name: 'peopleLocationTitle',
          type: 'string',
        },
        {
          title: 'Location Address',
          name: 'peopleLocationAddress',
          type: 'text',
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
      name: 'placesSection',
      type: 'object',
      fields: [
        {
          title: 'Media',
          name: 'placesMedia',
          type: 'mux.video',
        },
        {
          title: 'Captions',
          name: 'placesCaptions',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{type: 'caption'}],
            },
          ],
        },
        {
          title: 'Location Title',
          name: 'placesLocationTitle',
          type: 'string',
        },
        {
          title: 'Location Address',
          name: 'placesLocationAddress',
          type: 'text',
        },
      ],
      preview: {
        select: {
          media: 'placesMedia',
          tagline: 'placesTagline',
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
