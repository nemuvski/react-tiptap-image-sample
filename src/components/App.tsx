import { useState } from 'react'
import Layout from '~/components/Layout'
import { RichTextEditor, RichTextViewer } from '~/modules/rich-text'

const _AppInner = () => {
  const [editorContent, setEditorContent] = useState<string>('')
  const [viewerContent, setViewerContent] = useState<string>('')

  return (
    <>
      <RichTextEditor
        initialContent={editorContent}
        handleChange={(editor) => {
          setEditorContent(editor.getHTML())
        }}
      />

      <button
        type='button'
        onClick={() => {
          setViewerContent(editorContent)
        }}
      >
        入力内容のスナップショットをとる
      </button>

      <RichTextViewer content={viewerContent} />
    </>
  )
}

const App = () => {
  return (
    <Layout>
      <_AppInner />
    </Layout>
  )
}

export default App
