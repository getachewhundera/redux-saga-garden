import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import App from './App';

// watcher saga-watches for actions, fire off other sagas 
function* watcherSaga() {
  yield takeLatest('FETCH_PLANTS', fetchPlants);
  yield takeLatest('SEND_PLANT_TO_SERVER', sendPlantToServer);
  yield takeLatest('REMOVE_PLANT', removePlant);
}

//plants from server
const startingPlantArray = [];

const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    case 'SET_PLANTS':
      return action.payload;
    default:
      return state;
  }
};


//Sagas
function* fetchPlants() {
  try {
    const response = yield axios.get('/api/plant');
    const action = { type: 'SET_PLANTS', payload: response.data };
    yield put(action)
  } catch (error) {
    console.log(`Error in fetchPlants: ${error}`);
    throw error
  }
}

function* sendPlantToServer(action) {
  try {
    yield axios.post('/api/plant', action.payload);
    yield put({ type: 'FETCH_PLANTS' });
  } catch (error) {
    alert('Somthing went wrong');
    console.log(`Error in addPlant: ${error}`);
    throw error
  }
}


function* removePlant(action) {
  try {
    yield axios.delete(`/api/plant/${action.payload}`);
    yield put({ type: 'FETCH_PLANTS' });
  } catch (error) {
    alert('Somthing went wrong');
    console.log(`Error in removePlant: ${error}`);
    throw error
  }
}


//Entry point for sagas.
function* rootSaga() {
  yield watcherSaga();
}


const sagaMiddleware = createSagaMiddleware();


const store = createStore(
  combineReducers({
    plantList
  }), // adds middlewares. Logger should be last!
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
