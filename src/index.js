import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import axios from 'axios'
import 'antd/dist/antd.css'
Component.prototype.$http=axios
import EventEmitter from  'events'
Component.prototype.ev=new EventEmitter();
ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root')
);
