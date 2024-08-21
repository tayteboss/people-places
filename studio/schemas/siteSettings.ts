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
          type: 'reference',
          to: [{type: 'listItem'}],
        },
      ],
    },
    {
      title: 'Clients',
      name: 'clients',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'listItem'}],
        },
      ],
    },
    {
      title: 'Phone',
      name: 'phone',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'Instagram Handle',
      name: 'instagramHandle',
      type: 'string',
      description: 'Without the @ symbol.',
    },
    {
      title: 'Instagram Link',
      name: 'instagramLink',
      type: 'url',
    },
    {
      title: 'Address',
      name: 'address',
      type: 'text',
    },
    {
      title: 'Google Maps Link',
      name: 'googleMapsLink',
      type: 'url',
    },
    {
      title: 'Acknowledgement of Country',
      name: 'acknowledgementOfCountry',
      type: 'string',
    },
  ],
}
