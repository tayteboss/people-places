import {UlistIcon} from '@sanity/icons'

export default {
  title: 'List Item',
  name: 'listItem',
  type: 'document',
  icon: UlistIcon,
  preview: {
    select: {
      title: 'title',
      name: 'name',
    },
    prepare(selection) {
      const {title, name} = selection
      return {
        title: `${title} - ${name}`,
      }
    },
  },
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
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
}
