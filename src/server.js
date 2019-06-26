import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom/server'
import express from 'express'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import path from 'path'
import createStore from 'store'
import { Provider } from 'react-redux'
import theme from 'theme'

import App from 'App'

global.window = {}

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded({ extended: true }))

const buildHMTL = (app = '', styles = '', preloadedState = {}) => `
  <html>
    <head>
      <title>Expense</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="shortcut icon" href="money.ico" />
      <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">

      ${styles}
    </head>
    <body>
      <div id="root">${app}</div>
      <script src="https://www.gstatic.com/firebasejs/6.2.3/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/6.2.3/firebase-auth.js"></script>
      <script src="https://www.gstatic.com/firebasejs/6.2.3/firebase-firestore.js"></script>
      <script>
        // Your web app's Firebase configuration
        var firebaseConfig = {
          apiKey: "AIzaSyDUv0_RXlW1X6zMVGiZsJxY0xKluHdnmsw",
          authDomain: "expense-gustavgb-com.firebaseapp.com",
          databaseURL: "https://expense-gustavgb-com.firebaseio.com",
          projectId: "expense-gustavgb-com",
          storageBucket: "expense-gustavgb-com.appspot.com",
          messagingSenderId: "798553167776",
          appId: "1:798553167776:web:b589d28a5524be6c"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
      </script>
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
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
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
