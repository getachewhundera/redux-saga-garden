import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';


const StyledForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    width: '50%',
});

const StyledInput = styled('input')({
    margin: '10px 0',
});



const NewPlantForm = () => {
    const dispatch = useDispatch();

    //Initial state
    let [newPlant, setPlant] = useState({ name: '', kingdom: '', order: '', family: '', subfamily: '', genus: '' });

    const handleChangeFor = (key, value) => {
        console.log('event happened');
        setPlant({ ...newPlant, [key]: value })
    }

    const addNewPlant = event => {
        event.preventDefault();
        dispatch({ type: 'SEND_PLANT_TO_SERVER', payload: newPlant });
        setPlant({ name: '', kingdom: '', order: '', family: '', subfamily: '', genus: '' });
    }

    return (

        <div>
            <h3 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>This is the form</h3>
            <StyledForm onSubmit={addNewPlant} >
                <StyledInput
                    type='text'
                    placeholder='Name'
                    value={newPlant.name}
                    onChange={(event) => handleChangeFor('name', event.target.value)}
                />

                <StyledInput
                    type='text'
                    placeholder='Kingdom'
                    value={newPlant.kingdom}
                    onChange={(event) => handleChangeFor('kingdom', event.target.value)}
                />

                <StyledInput
                    type='text'
                    placeholder='Order'
                    value={newPlant.order}
                    onChange={(event) => handleChangeFor('order', event.target.value)}
                />

                <StyledInput
                    type='text'
                    placeholder='Family'
                    value={newPlant.family}
                    onChange={(event) => handleChangeFor('family', event.target.value)}
                />

                <StyledInput
                    type='text'
                    placeholder='Subfamily'
                    value={newPlant.subfamily}
                    onChange={(event) => handleChangeFor('subfamily', event.target.value)}
                />

                <StyledInput
                    type='text'
                    placeholder='Genus'
                    value={newPlant.genus}
                    onChange={(event) => handleChangeFor('genus', event.target.value)}
                />

                <StyledInput type='submit' value='Add New Plant' />

            </StyledForm>


        </div>

    );
}


export default NewPlantForm;

