import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { NavLink } from "react-router-dom";
import moment from "moment";
import "./userListingTable.css";
import { ROOT_URL } from "../../constants/config";

export default function StickyHeadTable() {
  const [Data, setData] = React.useState([]);
  const userListingHeader = [
    {
      label: "First Name",
      label1: "Last Name",
      label2: "E-mail",
      label3: "Membership Type",
      label4: "Billing Frequency",
      label5: "Next Invoice Date",
    },
  ];

  React.useEffect(() => {
    getDat();
  }, []);
  // Get Data For Customer List
  const getDat = () => {
    fetch(`${ROOT_URL}/api/GetCustomersList`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.parse(data));
        setData(JSON.parse(data));
        console.log();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {userListingHeader.map((items, index) => (
                <>
                  <TableCell key={index}>{items.label}</TableCell>
                  <TableCell key={index}>{items.label1}</TableCell>
                  <TableCell key={index}>{items.label2}</TableCell>
                  <TableCell key={index}>{items.label4}</TableCell>
                  <TableCell key={index}>{items.label5}</TableCell>
                  <TableCell>Action</TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.map((items, index) => (
              <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                <>
                  <TableCell>{items.FirstName}</TableCell>

                  <TableCell>{items.LastName}</TableCell>

                  <TableCell>{items.Email}</TableCell>

                  <TableCell>
                    {items.MembershipInfo?.BillingFrequency}
                  </TableCell>

                  <TableCell>{moment(items.nextInvoice).format("L")}</TableCell>
                  <TableCell className="userListing-actionCol">
                    <NavLink
                      to={{
                        pathname: "/addoredit",
                        state: items,
                      }}
                      style={{ marginRight: 10 }}
                      state={{ data: items }}
                      className="userListing-details-link"
                    >
                      Edit
                    </NavLink>
                    <NavLink
                      to={{
                        pathname: "/details",
                        state: items,
                      }}
                      state={{ data: items }}
                      className="userListing-details-link"
                    >
                      DETAILS
                    </NavLink>
                  </TableCell>
                </>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
