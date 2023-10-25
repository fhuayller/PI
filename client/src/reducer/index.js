
const initialState = {
  allDrivers: [], // Guarda todos los drivers originales
  drivers: [], 
  teams: [],
  // detail: {
  //   id: null,
  //   driverRef: "",
  //   number: null,
  //   code: "",
  //   name: {
  //     forename: "",
  //     surname: ""
  //   },
  //   image: {
  //     url: "",
  //     imageby: ""
  //   },
  //   dob: "",
  //   nationality: " ",
  //   url: "",
  //   teams: "",
  //   description: ''
  //   }
  detail: []
}
  
export default function rootReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_DRIVERS':
      return {
        ...state,
        allDrivers: action.payload,
        drivers: action.payload, // inicializa drivers con todos los drivers originales
      }

      case 'ORDER_ASC_DESC':
        const sortedDrivers = [...state.allDrivers];

        const ascArr = action.payload === 'asc' 
          ? sortedDrivers.sort((a, b) => {
            const nameA = `${a.name.forename} ${a.name.surname}` || '';
            const nameB = `${b.name.forename} ${b.name.surname}` || '';
            return nameA.localeCompare(nameB);
          })
          : sortedDrivers.sort((a, b) => {
            const nameA = `${a.name.forename} ${a.name.surname}` || '';
            const nameB = `${b.name.forename} ${b.name.surname}` || '';
            return nameB.localeCompare(nameA);
          });

      return {
        ...state,
        drivers: ascArr,
      };

      case 'GET_DRIVERS_NAME':
        return {
          ...state,
          drivers: action.payload
      }

      case 'GET_TEAMS':
        return {
          ...state,
          teams: action.payload
        }

      case 'POST_DRIVER':
        return{
          ...state
      }
      case 'GET_ID':
        return {
          ...state,
          //detail: action.payload
          detail: action.payload
        }
        
      case 'FILTER_VALUE': {
        const allDrivers = state.allDrivers;
        const filterValue = action.payload === 'createdInDb' ? allDrivers.filter(el => el.createdInDb) : allDrivers.filter( el => !el.createdInDb)
        return {
          ...state,
          drivers: action.payload === 'todos' ? state.allDrivers : filterValue
        };
      }
      default:
        return state;
    }
}

