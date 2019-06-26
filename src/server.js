import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom/server'
import express from 'express'
import { ServerStyleSheet } from 'styled-components'
import path from 'path'
import createStore from 'store'
import { Provider } from 'react-redux'

import App from 'App'

global.window = {}

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/api/test', (req, res) => {
  setTimeout(() => {
    res.json({
      name: 'Gustav Burchardt',
      bio: 'I like to create stuff'
    })
  }, 1000)
})

const buildHMTL = (app = '', styles = '', preloadedState = {}) => `
  <html>
    <head>
      <title>Expense</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="shortcut icon" href="money.ico" />
      ${styles}
    </head>
    <body>
      <div id="root">${app}</div>
      <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // http://redux.js.org/recipes/ServerRendering.html#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script type="text/javascript" src="./bundle.js"></script>
    </body>
  </html>
`

app.use(express.static('./dist'))

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/favicon.ico'))
})

app.get('/*', (req, res) => {
  const sheet = new ServerStyleSheet()
  const store = createStore()
  try {
    const app = ReactDOM.renderToString(sheet.collectStyles((
      <Provider store={store}>
        <App />
      </Provider>
    )))
    const preloadedState = store.getState()
    const styleEl = sheet.getStyleTags()
    res.send(buildHMTL(app, styleEl, preloadedState))
  } catch (e) {
    console.error(e)
    res.status(500).send()
  } finally {
    sheet.seal()
  }
})

app.listen(PORT, () => console.log('Listening on port ' + PORT))
