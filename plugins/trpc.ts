import { createTRPCProxyClient } from '@trpc/client'
import { ipcLink } from 'electron-trpc/renderer'
import type { AppRouter } from '~/server/trpc'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      trpc: createTRPCProxyClient<AppRouter>({
        links: [ipcLink()],
      }),
    },
  }
})
