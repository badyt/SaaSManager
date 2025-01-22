import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from './pages/Home';
import MainAppBar from './pages/MainAppBar';
import TeamManagement from './pages/TeamManagement';
import UserDashboard from './pages/UserDashboard';
import UserProfile from './pages/UserProfile';
import Catalog from './pages/Catalog';
import SubscriptionPage from './pages/SubscriptionPage';
import LicensePage from './pages/LicensePage';
function App() {

  return (
    <div className="app">
      <ToastContainer />
      <Router>
        <MainAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teams" element={<TeamManagement />} />
          <Route path="/users" element={<UserDashboard />} />
          <Route path="/profile" element={<UserProfile/>}/>
          <Route path="/catalog" element = {<Catalog/>}/>
          <Route path="/subscriptions" element = {<SubscriptionPage/>}/>
          <Route path="/licenses" element = {<LicensePage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
