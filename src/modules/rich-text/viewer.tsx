import { EditorContent, useEditor } from '@tiptap/react'
import extensions from './extensions'
import type { Content } from '@tiptap/react'
import type { FC } from 'react'

const RichTextViewer: FC<{ content: Content }> = ({ content }) => {
  const editor = useEditor(
    {
      extensions,
      content,
      editable: false,
      editorProps: {
        attributes: {
          class: 'rich-text-viewer',
        },
      },
    },
    [content]
  )

  return <EditorContent editor={editor} />
}

export { RichTextViewer }
