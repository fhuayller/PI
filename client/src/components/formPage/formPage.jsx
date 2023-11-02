import React from "react";
import { useState, useEffect } from "react";
import { Link  } from 'react-router-dom';
import { getTeams, postDrivers } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux'
import styles from './formPage.module.css'

export default function DriverCreate() {
    const dispatch = useDispatch();
    const teams = useSelector((state) => state.teams); // Obtener equipos del estado global
    const [errors, setErrors] = useState({});
  
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

    const validateFields = () => {
      const errors = {};
      
      if (!input.forename) {
        errors.forename = '¡Nombre requerido!';
      }
      if (!input.surname) {
        errors.surname = '¡Apellido requerido!';
      }
      if (!input.description) {
        errors.description = '¡Descripción requerida!';
      }
      if (!input.image) {
        errors.image = '¡Imagen requerida!';
      }
      if (!input.nationality) {
        errors.nationality = '¡Nacionalidad requerida!';
      }
      if (!input.dob) {
        errors.dob = '¡Fecha de nacimiento requerida!';
      }
      if (!input.teams) {
        errors.teams = '¡Al menos un equipo requerido!';
      }
    
      return errors;
    };
    

    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    };

    const handleRemoveTeam = (index) => {
      const newTeams = [...input.teams];
      newTeams.splice(index, 1);
      setInput({
        ...input,
        teams: newTeams,
      });
    };
  
    const handleTeamsChange = (e) => {
      setInput({
        ...input,
        teams: [...input.teams, e.target.value]
      })
    };

    function handleSubmit(e) {
      e.preventDefault();
    
      const fieldErrors = validateFields();
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
        return;
      }
  
      dispatch(postDrivers(input));
      alert('Conductor creado');
      setInput({
        forename: '',
        surname: '',
        description: '',
        image: '',
        nationality: '',
        dob: '',
        teams: [],
      });
      setErrors({});
    }
  
    return (
      <div className= {styles.contain}>
        <Link to={'/home'}>
          <button>Volver</button>
        </Link>
        <h1>Añadir conductor</h1>
        <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={input.forename} name="forename" onChange={handleInputChange} />
          {errors.forename && <span style={{ color: 'red' }}>{errors.forename}</span>}
        </div>
          <div>
            <label>Apellido:</label>
            <input type="text" value={input.surname} name="surname" onChange={handleInputChange} />
            {errors.surname && <span style={{ color: 'red' }}>{errors.surname}</span>}
          </div>
          <div>
            <label>Descripción:</label>
            <input type="text" value={input.description} name="description" onChange={handleInputChange} />
            {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
          </div>
          <div>
            <label>Imagen:</label>
            <input type="text" value={input.image} name="image" onChange={handleInputChange} />
            {errors.image && <span style={{ color: 'red' }}>{errors.image}</span>}
          </div>
          <div>
            <label>Nacionalidad</label>
            <input type="text" value={input.nationality} name="nationality" onChange={handleInputChange} />
            {errors.nationality && <span style={{ color: 'red' }}>{errors.nationality}</span>}
          </div>
          <div>
            <label>Fecha de nacimiento:</label>
            <input type="text" value={input.dob} name="dob" onChange={handleInputChange} />
            {errors.dob && <span style={{ color: 'red' }}>{errors.dob}</span>}
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
            {errors.teams && <span style={{ color: 'red' }}>{errors.teams}</span>}
            <ul>
              {input.teams.map((el, index) => (
                <li key={index}>
                  {el}
                  <button onClick={() => handleRemoveTeam(index)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit">Crear conductor</button>
        </form>
      </div>
    )}