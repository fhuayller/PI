import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getIdDriver } from "../../actions";

 export default function DetailPage(props) {
    const dispatch = useDispatch();
    
    const driver = useSelector((state) => {
        console.log('Estado actual:', state.detail);
        return state.detail;
      });

    var { idDriver } = useParams()
    console.log(idDriver)
    console.log(driver)

    useEffect(( ) => {
        // var idDriver = window.location.pathname.split('/').pop();
        console.log(idDriver)

        dispatch(getIdDriver(idDriver))
      }, []);

      

      if (driver.name.forename) return (
        <div>
          <h1>{driver.name?.forename} {driver.name?.surname}</h1>
          <p>Number: {driver.number}</p>
          <img src={driver.image?.url} alt="Driver" />
          <p>Date of Birth: {driver.dob}</p>
          <p>Nationality: {driver.nationality}</p>
          <p>Teams: {driver.teams}</p>
          <p>Description: {driver.description}</p>
        </div>
      )
      else return(
        <div>loading...</div>
      );
  }