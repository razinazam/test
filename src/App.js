import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./@common/Navbar/Navbar";
import AddOrEdit from "./components/AddOrEdit";
import UserListingTable from "./components/UserListing/UserListingTable";
import UserDetails from "./components/UserDetails/UserDetails";
import { Route, BrowserRouter as Router } from "react-router-dom";
export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Route exact path="/" component={UserListingTable} />
          <Route exact path="/AddorEdit" component={AddOrEdit} />
          <Route exact path="/details" component={UserDetails} />
        </Router>
      </>
    );
  }
}
