import {HomeIcon, TextIcon} from '@sanity/icons'

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
      title: 'Hero Media',
      name: 'heroMedia',
      type: 'mux.video',
    },
    {
      title: 'Hero Captions',
      name: 'heroCaptions',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: TextIcon,
          fields: [
            {
              title: 'Caption',
              name: 'caption',
              type: 'string',
            },
            {
              title: 'Start',
              name: 'start',
              type: 'number',
              description: 'e.g. 1.5',
            },
            {
              title: 'End',
              name: 'end',
              type: 'number',
              description: 'e.g. 5',
            },
          ],
        },
      ],
    },
    {
      title: 'People Section',
      name: 'peopleSection',
      type: 'object',
      fields: [
        // {
        //   title: 'Audio',
        //   name: 'peopleAudio',
        //   type: 'file',
        //   accepts: 'audio/*',
        // },
        // {
        //   title: 'Captions',
        //   name: 'peopleCaptions',
        //   type: 'array',
        //   of: [
        //     {
        //       type: 'object',
        //       icon: TextIcon,
        //       fields: [
        //         {
        //           title: 'Caption',
        //           name: 'caption',
        //           type: 'string',
        //         },
        //         {
        //           title: 'Start',
        //           name: 'start',
        //           type: 'number',
        //           description: 'e.g. 1.5',
        //         },
        //         {
        //           title: 'End',
        //           name: 'end',
        //           type: 'number',
        //           description: 'e.g. 5',
        //         },
        //       ],
        //     },
        //   ],
        // },
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
    },
    {
      title: 'Places Section',
      name: 'placesSection',
      type: 'object',
      fields: [
        // {
        //   title: 'Audio',
        //   name: 'placesAudio',
        //   type: 'file',
        //   accepts: 'audio/*',
        // },
        // {
        //   title: 'Captions',
        //   name: 'placesCaptions',
        //   type: 'array',
        //   of: [
        //     {
        //       type: 'object',
        //       icon: TextIcon,
        //       fields: [
        //         {
        //           title: 'Caption',
        //           name: 'caption',
        //           type: 'string',
        //         },
        //         {
        //           title: 'Start',
        //           name: 'start',
        //           type: 'number',
        //           description: 'e.g. 1.5',
        //         },
        //         {
        //           title: 'End',
        //           name: 'end',
        //           type: 'number',
        //           description: 'e.g. 5',
        //         },
        //       ],
        //     },
        //   ],
        // },
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
    },
  ],
}
