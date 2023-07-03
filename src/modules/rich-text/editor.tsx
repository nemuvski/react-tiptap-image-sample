import { EditorContent, useEditor } from '@tiptap/react'
import extensions from './extensions'
import { CustomImageAction } from './extensions/custom-image'
import type { Editor } from '@tiptap/core'
import type { Content } from '@tiptap/react'
import type { FC } from 'react'

const RichTextEditor: FC<{ initialContent: Content; handleChange: (editor: Editor) => void }> = ({
  initialContent,
  handleChange,
}) => {
  const editor = useEditor({
    extensions,
    content: initialContent,
    editable: true,
    editorProps: {
      attributes: {
        class: 'rich-text-editor',
        role: 'textbox',
        'aria-multiline': 'true',
      },
    },
    onUpdate: (event) => {
      handleChange(event.editor)
    },
  })

  return (
    <>
      <div aria-label='ツールバー'>
        <CustomImageAction editor={editor} />
      </div>

      <EditorContent editor={editor} />
    </>
  )
}

export { RichTextEditor }
