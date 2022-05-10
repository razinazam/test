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
import moment from "moment";
import "./userListingTable.css";
import { ROOT_URL } from "../../constants/config";

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [Data, setData] = React.useState([]);

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
    getDat();
  }, []);
  const getDat = () => {
    fetch(`${ROOT_URL}/api/GetCustomersList`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // 'Accept-Encoding':'gzip, deflate, br'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json()) //Here is the error
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
            {/* {userListingBody
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((items, index) => {
                                return ( */}
            {Data.map((items, index) => (
              <TableRow hover role="checkbox" tabIndex={-1}>
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
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userListingBody.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
