import {TextIcon} from '@sanity/icons'

export default {
  title: 'Caption',
  name: 'caption',
  type: 'document',
  icon: TextIcon,
  preview: {
    select: {
      caption: 'caption',
    },
    prepare(selection) {
      const {caption} = selection
      return {
        title: `${caption}`,
      }
    },
  },
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
}
