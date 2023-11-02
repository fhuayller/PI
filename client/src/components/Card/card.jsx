import { Link } from 'react-router-dom';

export default function Card(props) {
  const { id, name, image, Teams, teams } = props;
  const imageUrl = image && image.url;

  const getFullName = () => {
    if (name) {
      return `${name}`;
    } else if (props.forename && props.surname) {
      return `${props.forename} ${props.surname}`;
    } else {
      return "Nombre no disponible";
    }
  };

  const getTeams = () => {
    if (Teams) {
      if (Array.isArray(Teams)) {
        return Teams.map((team) => team.name).join(", ");
      } else if (typeof Teams === 'string') {
        return Teams.split(',').map((team) => team.trim()).join(", ");
      }
    } else if (teams) {
      if (Array.isArray(teams)) {
        return teams.map((team) => team.name).join(", ");
      } else if (typeof teams === 'string') {
        return teams.split(',').map((team) => team.trim()).join(", ");
      }
    }

    return "Equipos no disponibles";
  };

  return (
    <div>
      <Link to={`/drivers/${id}`}>
        <h3>{getFullName()}</h3>
      </Link>
      <h2>Equipos: {getTeams()}</h2>
      {imageUrl ? (
        <img src={imageUrl} alt={`Image by ${image.imageby}`} width='200px' height='200px' />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
}