import { exposeElectronTRPC } from 'electron-trpc/main'

console.log('---- electron/preload.ts ----')

process.once('loaded', async () => {
  exposeElectronTRPC()
})
