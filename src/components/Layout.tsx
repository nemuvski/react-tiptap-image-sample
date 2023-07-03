import * as s from './Layout.module.css'
import type { FC, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <main className={s.Layout}>{children}</main>
}

export default Layout
