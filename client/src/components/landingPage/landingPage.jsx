import React from "react";
import { Link } from 'react-router-dom';
import styles from './landingPage.module.css'
import video from './Y2meta.app-F1 2023 _ This Is No Ordinary Sport-(1080p).mp4'

const LandingPage = () => {
    return (
      <div className={styles.container}>
        <video className={styles.videoBackground} autoPlay loop muted>
          <source src={video} type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
        <div className={styles.content}>
          <h1>Bienvenidos a mi proyecto</h1>
          <Link to="/home">
            <button>Ingresar</button>
          </Link>
        </div>
      </div>
    );
  }
  
  export default LandingPage;