import { Image } from '@tiptap/extension-image'
import { useRef } from 'react'
import Dialog, { useDialog } from '../../partials/dialog.tsx'
import type { Editor } from '@tiptap/core'
import type { FC } from 'react'

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      /**
       * data-file属性
       */
      file: {
        default: 'image',
        isRequired: false,
        parseHTML: (element) => element.getAttribute('data-file'),
        renderHTML: (attributes) => {
          return {
            // NOTE: data-file属性を目印に、貼付した画像要素をピックしやすいようにするため付与している (img[data-file])
            'data-file': attributes.file ?? 'image',
            // NOTE: レンダリング時はloading属性も付与しておく
            loading: 'lazy',
          }
        },
      },
    }
  },
})

const INPUT_FILE_ID = 'image-file' as const

const CustomImageAction: FC<{ editor: Editor | null }> = ({ editor }) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const dialogHandler = useDialog(dialogRef)

  const handleClose = () => {
    formRef.current?.reset()
    dialogHandler.close()
  }

  if (!editor) {
    return null
  }

  return (
    <div>
      <button type='button' onClick={() => dialogHandler.open()}>
        画像貼付
      </button>

      <Dialog ref={dialogRef}>
        <form
          ref={formRef}
          onSubmit={(event) => {
            event.preventDefault()

            const formElement = event.target as HTMLFormElement

            const formData = new FormData(formElement)
            const file = formData.get(INPUT_FILE_ID) as File

            if (file.size === 0) {
              return
            }

            // NOTE: 画像の貼付
            editor
              .chain()
              .focus()
              .setImage({
                // NOTE: 実際には画像をアップロードしてURLを取得する処理を行う感じになるが、ここでは簡略化したものとしている
                src: URL.createObjectURL(file),

                // ここでfileプロパティで、data-file属性に付与する値を指定しても良い
              })
              .run()

            handleClose()
          }}
        >
          <p>
            <label htmlFor={INPUT_FILE_ID}>PNGかJPGの画像を選択</label>
            <br />
            <input type='file' id={INPUT_FILE_ID} name={INPUT_FILE_ID} accept='image/png, image/jpeg' />
          </p>
          <button type='submit'>貼付</button>
          <button type='reset'>リセット</button>
        </form>

        <button type='button' onClick={() => handleClose()}>
          閉じる
        </button>
      </Dialog>
    </div>
  )
}

export { CustomImage, CustomImageAction }
