import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage  from './components/landingPage/landingPage';
import Home from './components/homePage/homePage';
import FormPage from './components/formPage/formPage'

function App() {
  return (
      <div className='app'>
        <Routes>
           <Route path="/" element={ <LandingPage />} /> {/* ruteo a LandingPage, Nota: cuando es element, el tag debe empezar con mayuscula*/}
           <Route path="/home" element={ <Home />} />
           <Route path='/drivers' element={<FormPage/>}/>
        </Routes>
      </div>
  );
}

export default App
  