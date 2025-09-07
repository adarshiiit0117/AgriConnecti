import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Rent from "./component/Rent";
import Buy from "./component/Buy";
import Assistant from "./component/Assistant";
import Dashboard from "./component/Dashboard";
import Layout from "./component/Layout";
import Profile from "./component/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with Layout (background applies here) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/assistant" element={<Assistant />} />
        </Route>

        {/* Routes WITHOUT Layout (no background, e.g. Auth pages) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile/>} />
        </Routes>
    </Router>
  );
}

export default App;
