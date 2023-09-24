import React from 'react';
import Garden from './components/Garden/Garden';
import './App.css';
import { styled } from '@mui/material/styles';

const StyledDiv = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const Header = styled('header')({
  backgroundColor: '#66bb6a',
  color: 'white',
  padding: '16px',
  textAlign: 'center',
});





function App() {

  return (
    <StyledDiv>
      <Header>
        <h1>Welcome to your garden!</h1>
      </Header>
      <Garden />
    </StyledDiv>
  );
};

export default App;
