import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/style.scss'

const rootElement = document.getElementById('root');

render(<App />, rootElement);