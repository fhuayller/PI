import axios from 'axios';

export function getDrivers (){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/drivers') //aca se conecta el front con el backend, que a su vez el back se comunica con la API o la base de datos

        return dispatch({
            type: 'GET_DRIVERS',
            payload: json.data
        })
    }
}

export function getDriversName(name){ //name es el payload
    return async function (dispatch){
        try{
            let json = await axios.get(`http://localhost:3001/drivers/name?name=${name}`)
            return dispatch({
                type: 'GET_DRIVERS_NAME',
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}

export function getTeams(){
    return async function (dispatch){
        let json = await axios.get('http://localhost:3001/teams')

        return dispatch({
            type: 'GET_TEAMS',
            payload: json.data
        })
    }
}

export function postDrivers(payload){
    return async function (dispatch){
        let json = await axios.post('http://localhost:3001/drivers', payload)
        return json;
    }
}

export function orderAscDesc (payload){
    return {
        type: 'ORDER_ASC_DESC',
        payload: payload
    }
}

export function filterStatus (payload) { //argumento que me llega es el valor del value de las opciones de mi homePage
    return {
        type: 'FILTER_VALUE',
        payload: payload
    }
}

export function getIdDriver (id){
    return async function (dispatch){
        try{
            var json = await axios.get('http://localhost:3001/drivers/' + id)

            return dispatch({
                type: GET_ID,
                payload: json.data
            })
        }
        catch(error){
            console.log(error)
        }
    }
}

//nota, mover la logica a reducer o componente.