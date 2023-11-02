import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getIdDriver } from "../../actions";
import styles from './DetailPage.module.css'

export default function DetailPage() {
  const dispatch = useDispatch();

  const driver = useSelector((state) => {
    console.log('Estado actual:', state.detail);
    return state.detail;
  });

  const { idDriver } = useParams();
  
  useEffect(() => {
    dispatch(getIdDriver(idDriver));
  }, [dispatch, idDriver]);

  const getFullName = () => {
    if (driver.name) {
      return `${driver.name.forename} ${driver.name.surname}`;
    } else if (driver.forename && driver.surname) {
      return `${driver.forename} ${driver.surname}`;
    } else {
      return "Nombre no disponible";
    }
  };

  const getTeams = () => {
    if (driver.teams) {
      // Caso de la API
      if (Array.isArray(driver.teams)) {
        return driver.teams.map((team) => team.name).join(", ");
      } else {
        // Caso de la base de datos
        return driver.teams;
      }
    } else if (driver.Teams && Array.isArray(driver.Teams)) {
      // Caso de la base de datos
      return driver.Teams.map((team) => team.name).join(", ");
    } else {
      return "Equipos no disponibles";
    }
  };

  if (driver.name || driver.forename) {
    return (
      <div className= {styles.contain} >
        <h1>{getFullName()}</h1>
        <p>Number: {driver.number}</p>
        <img src={driver.image.url} alt="Driver" />
        <p>Date of Birth: {driver.dob}</p>
        <p>Nationality: {driver.nationality}</p>
        <p>Teams: {getTeams()}</p>
        <p>Description: {driver.description}</p>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}