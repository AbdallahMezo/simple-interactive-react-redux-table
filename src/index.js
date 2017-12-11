import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/App';
import store from './app/stateStore'
import { Provider } from 'react-redux'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
