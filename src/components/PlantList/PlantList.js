import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import './PlantList.css'
import { styled } from '@mui/material/styles';


const StyledPlantList = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', 
  });
  
  const StyledPlantItem = styled('div')({
    display: 'flex', 
    flexWrap: 'wrap', 
    flexDirection: 'column',
    margin: '20px', 
    padding: '16px',
    border: '1px solid black',
  });

function PlantList() {
    //dispatch hook 
    const dispatch = useDispatch();

    const plantList = useSelector(store => store.plantList);

    useEffect(() => {
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
        dispatch({ type: 'FETCH_PLANTS' }); 
    }, []); 

    const removePlant = (id) => {
        dispatch({ type: 'REMOVE_PLANT', payload: id });  
        
    }

    return (

        <> 
        
     <h3 style={{textAlign: 'center', fontWeight: 'bold',  fontSize: '25px'}}>This is the plant list</h3>
            <StyledPlantList>
               
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                {
                    plantList.map(plant => (
                        <StyledPlantItem key={plant.id}> 
                            <p> {plant.name} </p>
                            <p> {plant.kingdom} </p> 
                            <p> {plant.order} </p> 
                            <p> {plant.family} </p> 
                            <p> {plant.subfamily} </p> 
                            <p> {plant.genus} </p> 
                            <button onClick={() => removePlant(plant.id)}>
                                Remove
                            </button>
                        </StyledPlantItem>
                    ))
                }
            </div>
        </StyledPlantList>
        </> 

    );
}

export default PlantList;
