import React from 'react';
import { styled } from '@mui/material/styles';
import NewPlantForm from '../NewPlantForm/NewPlantForm';
import PlantList from '../PlantList/PlantList';
import './Garden.css'


const StyledGarden = styled('div')({
  minHeight: '100vh',
  backgroundColor: '#8d6e63',
  padding: '16px',
});

function Garden() {
  return(
    <StyledGarden>
      <h2 style={{textAlign: 'center', fontWeight: 'bold',  fontSize: '30px'}}>This is the garden!</h2>
      <NewPlantForm />
      <PlantList />
    </StyledGarden>

  )
}

export default Garden;
