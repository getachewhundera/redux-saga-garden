import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

//imported logger 
import logger from 'redux-logger';


// bringing redux-saga into our project
import createSagaMiddleware from 'redux-saga';

// This makes a middleware for us to use.
const sagaMiddleware = createSagaMiddleware();

// watcher sagas will watch for actions. If they match, they fire off other sagas.
function* watcherSaga() {

}


import App from './App';

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    plantList
  }), // This adds middlewares. Logger should be last!
  applyMiddleware(sagaMiddleware, logger),
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// This allows the watcherSaga to start watching for actions
sagaMiddleware.run(watcherSaga);