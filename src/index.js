import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {takeLatest, put, take } from 'redux-saga/effects'; 
import axios from 'axios';



// watcher sagas will watch for actions. If they match, they fire off other sagas.
function* watcherSaga() {

}

import App from './App';

//plants from server
const startingPlantArray = [];

const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    //ADD_PLANT is adding in a single new plant to the existing array, but uses a spread operator to keep original array and new plant. 
    // case 'ADD_PLANT':
    //   return [ ...state, action.payload ]
      // 'SET_PLANTS' will Replace all existing, 
      case 'SET_PLANTS':
        return action.payload; 
    default:
      return state;
  }
};


//this is our SAGA. in order for it to be inculded in the REDUX lifecyle it needs to get triggered. 
function* fetchPlants() { 
  try{
    const response = yield axios.get('/api/plant'); 
    //When we get the data back from /api/plant we will call SET_PLANTS, which will replace our plantList
    const action = { type: 'SET_PLANTS', payload: response.data }; 
    // put is the same as dispatch 
    yield put(action)
  } catch (error) { 
    console.log(`Error in fetchPlants: ${error}`);
    throw error
  }
} 

//Takes in an aciton with a payload and sends that payload to the server. 
function* sendPlantToServer(action) { 
  try{ 
    yield axios.post('/api/plant', action.payload);
    yield put({ type: 'FETCH_PLANTS' }); 
  } catch (error) {
    alert('Somthing went wrong'); 
    console.log(`Error in addPlant: ${error}`);
    throw error
  }
}


function* removePlant(action) {
  try{ 
    yield axios.delete(`/api/plant/${action.payload}`);
    yield put({ type: 'FETCH_PLANTS' }); 
  } catch (error) {
    alert('Somthing went wrong'); 
    console.log(`Error in removePlant: ${error}`);
    throw error
}



//need to define an action type that will call the saga. 
function* rootSaga() { 
    //Setup all sagas here (map action type to saga funtions)
    //FETCH_PLANTS is the action type. fetchPlants is the saga that gets called when we dispatch FETCH_PLANTS
    yield takeLatest('FETCH_PLANTS', fetchPlants);
    yield takeLatest('SEND_PLANT_TO_SERVER', sendPlantToServer);
    //REMOVE_PLANT maps our action type to our saga removePlant
    yield takeLatest('REMOVE_PLANT', removePlant);
}

// This makes a middleware for us to use.
const sagaMiddleware = createSagaMiddleware();


const store = createStore(
  combineReducers({
    plantList
  }), // This adds middlewares. Logger should be last!
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

// This allows the watcherSaga to start watching for actions
sagaMiddleware.run(watcherSaga);