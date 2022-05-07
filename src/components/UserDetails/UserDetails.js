import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import "./UserDetails.css"

export default function UserDetails() {
    const [personalInfo, setPersonalInfo] = useState()
    const navigate = useLocation()
    console.log("useNavigate", navigate.state.data);
    useEffect(() => {
        setPersonalInfo(navigate.state.data)
    }, [navigate])
    // a.Personal Information
    // b.Address Information with all addresses
    // c.Contact Information with all contacts
    // d.Membership Information along with the Next Invoice date
    // e.All generated invoices
    const address = [
        "addddeess1",
        "addddeess2",
        "addddeess3"
    ]
    const contact = [
        "03123123123",
        "021321312",
        "012312"
    ]
    return (
        <>
            <div className='userDetail-wrapper'>
                <div className='userDetails-main'>
                    <div>
                        <h2>Personal Information</h2>
                        <p>{personalInfo?.FirstName}</p>
                        <p>{personalInfo?.LastName}</p>
                        <p>{personalInfo?.Email}</p>
                    </div>
                    <div>
                        <h2>Address</h2>
                        {address.map((items, index) => (

                            <p>{items}</p>
                        ))}
                    </div>
                    <div>
                        <h2>Contact</h2>
                        {contact.map((items, index) => (

                            <p>{items}</p>
                        ))}
                    </div>
                    <div>
                        <h2>Membership</h2>
                        <p>{personalInfo?.MembershipType}</p>
                        <p>{personalInfo?.NextInvoiceDate}</p>
                    </div>
                    <div>
                        <h2>invoices</h2>
                        {/* <p>{personalInfo?.MembershipType}</p>
                        <p>{personalInfo?.NextInvoiceDate}</p> */}
                    </div>

                </div>


            </div>
        </>
    )

}
