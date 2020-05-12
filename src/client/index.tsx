import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'react-hot-loader'
// import Hot from './Hot'
import App from './App'
import * as React from 'react'
import { render } from 'react-dom'


const root = document.createElement('div')
document.body.appendChild(root)

render(<App />, root)
