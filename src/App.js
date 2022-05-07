import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./@common/Navbar/Navbar";
import AddOrEdit from "./components/AddOrEdit";
import UserListingTable from "./components/UserListing/UserListingTable";
import UserDetails from "./components/UserDetails/UserDetails";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<UserListingTable />} />
          <Route path="/Add" element={<AddOrEdit />} />{" "}
          <Route path="/details" element={<UserDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
