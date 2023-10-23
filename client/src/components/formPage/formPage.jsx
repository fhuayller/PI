import React from "react";
import { useState, useEffect } from "react";
import { Link  } from 'react-router-dom';
import { getTeams, postDrivers } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux'

export default function DriverCreate() {
    const dispatch = useDispatch();
    const teams = useSelector((state) => state.teams); // Obtener equipos del estado global
  
    const [input, setInput] = useState({
      forename: '',
      surname: '',
      description: '',
      image: '',
      nationality: '',
      dob: '',
      teams: [],
    });

      useEffect(() => {
      // despachar la acción para obtener los equipos desde el backend
      dispatch(getTeams());
    }, []);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    };
  
    const handleTeamsChange = (e) => {
      setInput({
        ...input,
        teams: [...input.teams, e.target.value]
      })
    };

    function handleSubmit(e){
      e.preventDefault()
      console.log(input)
      dispatch(postDrivers(input))
      alert('Conductor creado')
      setInput({
        forename: '',
      surname: '',
      description: '',
      image: '',
      nationality: '',
      dob: '',
      teams: [],
      })
  }
  
    return (
      <div>
        <Link to={'/home'}>
          <button>Volver</button>
        </Link>
        <h1>Añadir conductor</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input type="text" value={input.forename} name="forename" onChange={handleInputChange} />
          </div>
          <div>
            <label>Apellido:</label>
            <input type="text" value={input.surname} name="surname" onChange={handleInputChange} />
          </div>
          <div>
            <label>Descripción:</label>
            <input type="text" value={input.description} name="description" onChange={handleInputChange} />
          </div>
          <div>
            <label>Imagen:</label>
            <input type="text" value={input.image} name="image" onChange={handleInputChange} />
          </div>
          <div>
            <label>Nacionalidad</label>
            <input type="text" value={input.nationality} name="nationality" onChange={handleInputChange} />
          </div>
          <div>
            <label>Fecha de nacimiento:</label>
            <input type="text" value={input.dob} name="dob" onChange={handleInputChange} />
          </div>
          <div>
            <label>Equipos: </label>
              <select onChange={(e) => handleTeamsChange(e)}>
              {teams.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
            ))}
            </select>
            <ul><li>{input.teams.map(el => el + ", ")}</li></ul>
          </div>
          <button type="submit">Crear conductor</button>
        </form>
      </div>
    )}