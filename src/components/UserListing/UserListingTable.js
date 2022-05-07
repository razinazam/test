import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import Axios from "axios";
import "./userListingTable.css";

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [Data, setData] = React.useState([
    {
      customerId: 1,
      firstName: "john",
      lastName: "doe",
      email: "john@getnada.com",
      dateOfBirth: "2021-04-21T00:00:00",
    },
  ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
  const userListingBody = [
    {
      FirstName: "mario",
      LastName: "setdd",
      Email: "il@gmail.com",
      MembershipType: "premium",
      BillingFrequency: "29 days ago",
      NextInvoiceDate: "2 days",
    },
  ];
  React.useEffect(() => {
    Axios.get(`https://localhost:7201/api/GetCustomersList`)
      .then((res) => {
        console.log(res.data);
        // setData() Save Data Here
      })
      .catch((e) => {
        console.log(e);
      });
  });

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
                  <TableCell key={index}>{items.label}3</TableCell>
                  <TableCell key={index}>{items.label4}</TableCell>
                  <TableCell key={index}>{items.label5}</TableCell>
                  <TableCell>Action</TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {userListingBody
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((items, index) => {
                                return ( */}
            <TableRow hover role="checkbox" tabIndex={-1}>
              {userListingBody.map((items, index) => (
                <>
                  <TableCell>{items.FirstName}</TableCell>

                  <TableCell>{items.LastName}</TableCell>

                  <TableCell>{items.Email}</TableCell>

                  <TableCell>{items.MembershipType}</TableCell>

                  <TableCell>{items.BillingFrequency}</TableCell>

                  <TableCell>{items.NextInvoiceDate}</TableCell>
                  <TableCell className="userListing-actionCol">
                    <Button>Edit</Button>
                    <NavLink
                      to={"details"}
                      state={{ data: items }}
                      className="userListing-details-link"
                    >
                      DETAILS
                    </NavLink>
                    <Button>Delete</Button>
                  </TableCell>
                </>
              ))}
            </TableRow>
            {/* );
                            })} */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userListingBody.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
