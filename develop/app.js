import "babel-polyfill";
import './vendor/detect.js';
import './protos';
import 'whatwg-fetch';
import 'classlist-polyfill';


import React from 'react'
import { render } from 'react-dom'
import AppRoter from './Router'
import store from './store'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

render(<AppRoter store={store} history={syncHistoryWithStore(hashHistory, store)}/>, document.getElementById('container'))
//render(<AppRoter store={store} history={hashHistory}/>, document.getElementById('container'))
