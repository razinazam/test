import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import "./UserDetails.css";

export default function UserDetails() {
  const [personalInfo, setPersonalInfo] = useState();
  const navigate = useLocation();
  console.log("useNavigate", navigate.state);
  useEffect(() => {
    setPersonalInfo(navigate.state);
  }, [navigate]);
  // a.Personal Information
  // b.Address Information with all addresses
  // c.Contact Information with all contacts
  // d.Membership Information along with the Next Invoice date
  // e.All generated invoices
  const address = ["addddeess1", "addddeess2", "addddeess3"];
  const contact = ["03123123123", "021321312", "012312"];
  return (
    <>
      <div className="userDetail-wrapper">
        <div className="userDetails-main">
          <div>
            <h2>Personal Information</h2>
            <p>
              Full Name:{personalInfo?.FirstName + " " + personalInfo?.LastName}{" "}
            </p>
            <p>Email:{personalInfo?.Email}</p>
            <p>DOB:{moment(personalInfo?.DateOfBirth).format("L")}</p>
          </div>
          <div>
            {personalInfo?.Address.map((items, index) => {
              return (
                <>
                  <h2>
                    Address <span>{index + 1}</span>
                  </h2>
                  <p>Address 1:{items.AddressLine1}</p>
                  <p>Address 2:{items.AddressLine2}</p>
                  <p>City:{items.City}</p>
                  <p>Country:{items.CountryId}</p>
                </>
              );
            })}
          </div>
          <div>
            {personalInfo?.ContactInfo.map((items, index) => (
              <>
                <h2>
                  {" "}
                  Contact <span>{index + 1}</span>
                </h2>
                <p>Contact Number:{items.ContactNumber}</p>
                <p>contactType:{items.ContactType}</p>
              </>
            ))}
          </div>
          <div>
            <h2>Membership</h2>
            <p>MembershipType:{personalInfo?.MembershipInfo.MembershipType}</p>
            <p>
              BillingFrequency:{personalInfo?.MembershipInfo.BillingFrequency}
            </p>
          </div>
          <div>
            <h2>invoices</h2>
            <p>NextInvoice:{moment(personalInfo?.nextInvoice).format("L")}</p>
          </div>
        </div>
      </div>
    </>
  );
}
