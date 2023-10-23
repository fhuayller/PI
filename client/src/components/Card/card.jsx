import { Link } from 'react-router-dom';

export default function Card (props){ //acá el componente Card recibe las props que se le pasaron desde el componente Home
    const { id, teams, name, lastname, img } = props;
    const imageUrl = img && img.url; // Accede a la propiedad 'url' de 'img'
  
    return (
      <div>
        <Link to={`/drivers/${id}`}>
          <h3>{name} {lastname}</h3>
        </Link>
        <h2>Equipos: {teams}</h2>
        {imageUrl ? (
          <img src={imageUrl} alt={`Image by ${img.imageby}`} width='200px' height='200px' />
        ) : (
          <p>No image available</p>
        )}
      </div>
    );
  }