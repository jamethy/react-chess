import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import App from './components/App';
import NotFound from './components/NotFound';
import GamePicker from './components/GamePicker';

// css
import './index.css';


const repo = `/${window.location.pathname.split('/')[1]}`

const Root = () => {
  return (
    <BrowserRouter>
        <div>
            <Match exactly pattern="/" component={GamePicker} />
            <Match exactly pattern="/game/:gameId" component={App} />
            <Miss component={NotFound} />
        </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector('#root'));
