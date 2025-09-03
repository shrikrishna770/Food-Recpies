import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login_signup/login";
import Signup from "./Pages/Login_signup/signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddItem from "./Components/Crud/AddItems";
import MyRecipe from "./Pages/My_Recipe/MyRecipe";
import PublicFeed from "./Pages/Public_Recipe/PublicRecipe";
import PrivateRoute from "./Components/PrivateRoute";
import Wishlist from "./Pages/Wishliat/wishlist";
import ViewItem from "./Components/Crud/ViewItem";
import EditItem from "./Components/Crud/EditItem";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-recipes"
          element={
            <PrivateRoute>
              <MyRecipe />
            </PrivateRoute>
          }
        />
        <Route
          path="/public-feed"
          element={
            <PrivateRoute>
              <PublicFeed />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-item"
          element={
            <PrivateRoute>
              <AddItem />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-item/:id"
          element={
            <PrivateRoute>
              <ViewItem />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-recipe/:id"
          element={
            <PrivateRoute>
              <EditItem />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
