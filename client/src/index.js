import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import { store, persistor } from "./redux_store/store"
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    
  </Provider>, document.getElementById('root'));serviceWorker.unregister();

serviceWorker.unregister();