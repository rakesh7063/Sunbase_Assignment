import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './privateRoutes';
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from '../pages/Home';

function allRoutes() {
     return (
          <Routes>
               <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
          </Routes>
     )
}

export default allRoutes;