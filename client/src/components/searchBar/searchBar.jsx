import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getDriversName } from "../../actions";

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInput (e){
        e.preventDefault()
        setName(e.target.value) //seteo lo que tipea mi usuario en mi estado local name
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getDriversName(name)) //mando el estado para que funcione
    }

    return (
        <div>
            <input type="text" placeholder="Buscar..." onChange={e => handleInput(e)}/>
            <button type="submit" onClick={e => handleSubmit(e)}>Buscar</button>
        </div>
    )
}