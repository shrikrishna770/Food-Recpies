import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login_signup/login";
import Signup from "./Pages/Login_signup/signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddItem from "./Components/Crud/AddItems";
import MyRecipe from "./Pages/My_Recipe/MyRecipe";
import PublicFeed from "./Pages/Public_Recipe/PublicRecipe";

function App() {
  return (
    <Routes>
      {/* Dashboard (could show all recipes or public only) */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* My Recipes (private) */}
      <Route path="/my-recipes" element={<MyRecipe />} />

      {/* Public Feed */}
      <Route path="/public-feed" element={<PublicFeed />} />

      {/* Add Recipe */}
      <Route path="/add-item" element={<AddItem />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
