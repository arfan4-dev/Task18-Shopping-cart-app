import "./App.css"; 
import Home from "./Pages/Home";
import Cart from './Pages/Cart'
import { Routes,Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Components/Profile";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import ProductDetail from "./Pages/ProductDetail";
function App() {
  return (
   <div className='App'>

<Routes>
  <Route path="/" exact element={<Register/>}/>
  <Route path="/login" element={  <Login/>}/>

  <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute> }/>
  <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute> }/>
  <Route path="/productDetail" element={<ProtectedRoute><ProductDetail/></ProtectedRoute> }/>

  <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>

</Routes>




   </div>
  );
}

export default App;
