import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Profile from './components/Profile';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert} />}>
              </Route>
              <Route exact path='/about' element={<About />}>
              </Route>
              <Route exact path='/login' element={<Login showAlert={showAlert} />}>
              </Route>
              <Route exact path='/signup' element={<Signup showAlert={showAlert} />}>
              </Route>
              <Route exact path='/profile' element={<Profile/>}>
              </Route>

            </Routes>
          </div>
        </Router>

      </NoteState>
    </>
  );
}

export default App;
