import React, {useState}from 'react';
import { useDispatch } from 'react-redux';

const NewPlantForm = () => {
    const dispatch = useDispatch();
    
    //Initial state is an OBJECT, with keys id and name
    let [newPlant, setPlant] = useState({ name: '', kingdom: '', order: '', family: '', subfamily: '', genus: ''});

    const handleNameChange = (event) => {
        console.log('event happened');
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({...newPlant, 
            name: event.target.value, 
            kingdom: event.target.value, 
            clade: event.target.value, 
            order: event.target.value, 
            subfamily: event.target.value, 
            genus: event.target.value })
    }

    const addNewPlant = event => {
        event.preventDefault();
        dispatch({ type: 'SEND_PLANT_TO_SERVER', payload: newPlant });
        //updates the next plant to have a new id
        setPlant({name: '', kingdom: '', order: '', family: '', subfamily: '', genus: ''});
    }
    
    return (
        <div>
            <h3>This is the form</h3>
            <pre>{JSON.stringify(newPlant)}</pre>
            <form onSubmit={addNewPlant}>
                <input type='text' placeholder='Name' value={newPlant.name} onChange={handleNameChange} />
                <input type='text' placeholder='Kingdom' value={newPlant.kingdom} onChange={handleNameChange} />
                <input type='text' placeholder='Order' value={newPlant.order} onChange={handleNameChange} />
                <input type='text' placeholder='Family' value={newPlant.family} onChange={handleNameChange} />
                <input type='text' placeholder='Subfamily' value={newPlant.subfamily} onChange={handleNameChange} />
                <input type='text' placeholder='Genus' value={newPlant.genus} onChange={handleNameChange} />


                <input type='submit' value='Add New Plant' />

            </form>
        </div>
    );
}


export default NewPlantForm;

