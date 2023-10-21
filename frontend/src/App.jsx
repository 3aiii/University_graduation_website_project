import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; 
import Upload from "./pages/upload/Upload";
import Favorite from "./pages/favorite/Favorite";
import AdminDashBoard from "./pages/adminDashboard/AdminDashBoard";
import Spost from "./pages/spost/Spost";
import AdminEditUser from "./pages/adminEditUser/AdminEditUser";
import AdminSingleEditUser from "./pages/adminSingleEditUser/AdminSingleEditUser";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={<Login/>}
        />
        <Route
          path='/register'
          element={<Register/>}
        />
        <Route
          path='/'
          element={<Home/>}
        />
        <Route
          path='/favorite'
          element={<Favorite/>}
        />
        <Route
          path='/upload'
          element={<Upload/>}
        />
        <Route
          path='/singlePage/:id'
          element={<Spost/>}
        />
        <Route
          path='/adminDash'
          element={<AdminDashBoard/>}
        />
        <Route
          path='/adminEditUser'
          element={<AdminEditUser/>}
        />
        <Route
          path='/adminSingleEditUser'
          element={<AdminSingleEditUser/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App