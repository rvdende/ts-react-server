import { hot } from 'react-hot-loader/root'
// enable hot reload must be imported before react.

import * as React from 'react'
import App from './App'

const Hot = () => (<App />)
// enable hot reload
export default hot(Hot)
