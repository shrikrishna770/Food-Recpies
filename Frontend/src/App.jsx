import { Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login_signup/login";
import Signup from './Pages/Login_signup/signup';
import Dashboard from './Pages/Dashboard/Dashboard';
import AddItem from './Components/Crud/AddItems';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />  
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-item" element={<AddItem />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
