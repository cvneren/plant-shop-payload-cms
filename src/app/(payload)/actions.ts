'use server'

import { handleServerFunctions as handleServerFunctionsLocal } from '@payloadcms/next/layouts'
import config from '../../payload/payload.config'
import { importMap } from './admin/importMap'

export const handleServerFunctions = async (args: any) => handleServerFunctionsLocal({
  ...args,
  config,
  importMap,
})
