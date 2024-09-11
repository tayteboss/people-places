import {UserIcon, EarthAmericasIcon} from '@sanity/icons'

export default {
  title: 'Site Settings',
  name: 'siteSettings',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
      initialValue: 'Site Settings',
    },
    {
      title: 'Introduction',
      name: 'introduction',
      type: 'text',
    },
    {
      title: 'Team',
      name: 'team',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'listItem'}],
        },
      ],
    },
    {
      title: 'Services',
      name: 'services',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
    {
      title: 'Clients',
      name: 'clients',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: UserIcon,
          fields: [
            {
              title: 'Name',
              name: 'name',
              type: 'string',
            },
            {
              title: 'Link',
              name: 'link',
              type: 'url',
              description: 'Optional',
            },
          ],
        },
      ],
    },
    {
      title: 'Contacts',
      name: 'contacts',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: UserIcon,
          fields: [
            {
              title: 'Name',
              name: 'name',
              type: 'string',
            },
            {
              title: 'Role',
              name: 'role',
              type: 'string',
            },
            {
              title: 'Email',
              name: 'email',
              type: 'string',
            },
            {
              title: 'Phone',
              name: 'phone',
              type: 'string',
            },
            {
              title: 'Location',
              name: 'location',
              type: 'string',
            },
            {
              title: 'Timezone',
              name: 'timezone',
              type: 'string',
              description: 'e.g Australia/Melbourne',
            },
          ],
        },
      ],
    },
    {
      title: 'Socials',
      name: 'socials',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: EarthAmericasIcon,
          fields: [
            {
              title: 'Platform',
              name: 'name',
              type: 'string',
            },
            {
              title: 'Tag',
              name: 'tag',
              type: 'string',
            },
            {
              title: 'Link',
              name: 'link',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      title: 'Acknowledgement of Country',
      name: 'acknowledgementOfCountry',
      type: 'string',
    },
  ],
}
