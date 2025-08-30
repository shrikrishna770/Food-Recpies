import { Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login_signup/login";
import Signup from './Pages/Login_signup/signup';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Signup />} />
    </Routes>
  );
}

export default App;
