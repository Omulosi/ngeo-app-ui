import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import * as serviceWorker from './serviceWorker';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';
import store from './redux/store';

// loads leaflet CSS
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import './index.css';

const { EventEmitter } = require('fbemitter');

const queryClient = new QueryClient();

// GLOBAL VARIABLES
window.map = null; // MAIN MAP OBJECT
window.sidebarOpen = null; // SIDEBAR OPEN BOOLEAN
window.emitter = new EventEmitter(); // USE THIS TO LISTEN/BROADCAST EVENTS (e.g. sidebarChange)
window.popup = null; // ONE POPUP FOR ALL
window.disableParcelClick = false; // PROPERTY PARCEL CLICK.  USE THIS TO DISABLE
window.isDrawingOrEditing = false;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// serviceWorker.unregister();
