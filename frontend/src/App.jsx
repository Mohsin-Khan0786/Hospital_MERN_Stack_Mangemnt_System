
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import AboutUs from './pages/AboutUs'
import Appointment from './pages/Appointment'
import Register from './pages/Register'
import Login from './pages/Login';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Navbar from './Components/Navbar'
import { useContext, useEffect } from 'react'
import { Context } from './main'
import axios from 'axios'
// import { toast } from 'react-toastify'
function App() {
  

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/user/patient/me', {
          withCredentials: true,
        });
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
        toast.error('Failed to login');
      }
    };

    fetchUser();
  }, [isAuthenticated]); 

  return (
    <>
    
   
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>


        </Routes>
        <ToastContainer position='top-center' />
      </Router>
      
      
    </>
  )
}

export default App
