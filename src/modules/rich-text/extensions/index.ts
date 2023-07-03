import { Document } from '@tiptap/extension-document'
import { Link } from '@tiptap/extension-link'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { CustomImage } from './custom-image'
import type { Extensions } from '@tiptap/react'

const extensions: Extensions = [
  Document,
  Paragraph,
  Text,
  Link.configure({ autolink: true }),

  CustomImage.configure({
    inline: false,
    allowBase64: true,
  }),
]

export default extensions

export { CustomImageAction } from './custom-image'
