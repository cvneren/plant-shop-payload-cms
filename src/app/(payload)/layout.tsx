// @ts-ignore - External side-effect stylesheet import has no types
import '@payloadcms/next/css'
import React from 'react'
import { RootLayout } from '@payloadcms/next/layouts'
import configPromise from '../../payload/payload.config'
import { importMap } from './admin/importMap.js'
import { handleServerFunctions } from './actions'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => (
  <RootLayout config={configPromise} importMap={importMap} serverFunction={handleServerFunctions}>
    {children}
  </RootLayout>
)

export default Layout
