import * as ReactClient from '@vitejs/plugin-rsc/browser'
import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { rscStream } from 'rsc-html-stream/client'
import type { RscPayload } from './types'
import { setGlobalPayloadSetter } from './Link'

async function main() {
  let setPayload: (v: RscPayload) => void

  const initialPayload = await ReactClient.createFromReadableStream<RscPayload>(
    rscStream,
  )

  function BrowserRoot() {
    const [payload, setPayload_] = React.useState(initialPayload)

    React.useEffect(() => {
      setPayload = (v) => React.startTransition(() => setPayload_(v))

      // Register the payload setter globally for Link component
      setGlobalPayloadSetter(setPayload)
    }, [setPayload_])

    return payload.root
  }

  async function fetchRscPayload() {
    const payload = await ReactClient.createFromFetch<RscPayload>(
      fetch(window.location.href),
    )
    setPayload(payload)
  }

  const browserRoot = (
    <React.StrictMode>
      <BrowserRoot />
    </React.StrictMode>
  )
  ReactDOMClient.hydrateRoot(document, browserRoot)

  // Handle browser back/forward navigation
  window.addEventListener('popstate', () => {
    fetchRscPayload()
  })

  if (import.meta.hot) {
    import.meta.hot.on('rsc:update', () => {
      fetchRscPayload()
    })
  }
}


main()
