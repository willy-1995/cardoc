import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from './components/sites/landing';
import Registration from './components/sites/registration';
import Login from './components/sites/login';
import Protected from './components/sites/protected';
import Driversbook from './components/sites/driversbook';
import VehicleDetails from './components/sites/vehicleDetails';
import Cars from './components/sites/cars';
import Profile from './components/sites/profile';
//components
import Home from './components/home';

function App() {
  

  return (
   <div id='app'>
      <Router>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path='/registration' element={<Registration />}/>
          <Route path='/login' element={<Login />}/>
          {/*protected sites */}
          <Route path='/protected' element={<Protected />}/>
          <Route path='/vehicles' element={<Cars />}/>
          <Route path='/vehicles/:id/driversbook' element={<Driversbook />}/> {/**create Route with id for url */}
          <Route path='/vehicles/:id/vehicleDetails' element={<VehicleDetails />}/> {/**create Route with id for url */}
          <Route path='/profile' element={<Profile />}/>


        </Routes>
      </Router>
   </div>
  )
}

export default App
