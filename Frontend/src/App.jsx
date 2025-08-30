import { Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login_signup/login";
import Signup from './Pages/Login_signup/signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
