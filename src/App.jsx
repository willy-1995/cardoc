import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from './components/sites/landing';
import Registration from './components/sites/registration';
import Login from './components/sites/login';
import Protected from './components/sites/protected';

function App() {
  

  return (
   <div id='app'>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/registration' element={<Registration />}/>
          <Route path='/login' element={<Login />}/>
          {/*protected sites */}
          <Route path='/protected' element={<Protected />}/>
        </Routes>
      </Router>
   </div>
  )
}

export default App
