import React, { Component } from "react";
import "./style.css";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Autocomplete,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import ReactPhoneInput from "react-phone-input-2";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Axios from "axios";
import "react-phone-input-2/lib/style.css";
export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Allcountry: [],
      SelecterCity: [],
      SelecterCode: null,
      Allcity: [],
      selectCountry: {
        name: "United State",
      },
      selectstate: {
        name: "",
      },
      SelectedCity: {
        name: "",
      },
      Zipcode: null,
      EligibleCategory: this.props.PrevData?.patientOccupation
        ? this.props.PrevData?.patientOccupation
        : "",
      NextLoading: false,
      AllAddresses: [
        {
          AddressType: "",
          AddressLine1: "",
          AddressLine2: "",
          City: "",
          CountryId: 1,
          StateId: 5,
          ZipCode: 5646,
        },
      ],
      AllContact: [
        {
          contacttype: "",
          contactemail: null,
          ContactNumber: null,
        },
      ],
      DateOfBirth: null,
      Age: null,
      MembershipType: "",
      BillingFrequency: null,
      MembershipPrice: "",
      StartDate: null,
      EndDate: null,
    };
    // this.getAllCountry();
  }

  componentDidMount() {
    this.getAllCountry();
    // this.StatePopulatedcountrybase("US");
  }
  getAllCountry = () => {
    var headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "VnR4QWdkM3RLWk9OZTFDelBTdUljZDdCMXRiQ3lKZEVuRXUwUDVpbQ=="
    );
    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };
    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
      .then((response) => response.json())
      .then((result) =>
        this.setState({
          Allcountry: result,
          SelecterCity: [],
          Allcity: [],
        })
      )
      .catch((error) => console.log("error", error));
  };
  countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== "undefined"
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) =>
            String.fromCodePoint(char.charCodeAt(0) + 127397)
          )
      : isoCode;
  }

  StatePopulatedcountrybase = (v, selectCountry, index) => {
    // this.setState({
    //   selectCountry: selectCountry,
    // });

    var headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "VnR4QWdkM3RLWk9OZTFDelBTdUljZDdCMXRiQ3lKZEVuRXUwUDVpbQ=="
    );
    headers.append("Access-Control-Allow-Origin", "http://localhost:3002");
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("Content-Type", "application/json");

    var requestOptions = {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "X-CSCAPI-KEY":
          "VnR4QWdkM3RLWk9OZTFDelBTdUljZDdCMXRiQ3lKZEVuRXUwUDVpbQ==",
      },
      redirect: "follow",
    };
    // Pass Country Code -- Eg: Country Code : IN
    fetch(
      `https://api.countrystatecity.in/v1/countries/${v}/states`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.error == "Not found.") {
          this.setState({
            SelecterCity: [],
            SelecterCode: null,
            Allcity: [],
            selectstate: { name: null },
          });
        } else {
          this.setState(
            {
              Allcity: [],
              selectstate: { name: null },
              SelecterCity: result,
              SelecterCode: v,
            },
            () => {
              this.state.AllAddresses[index].CountryId = v;
            }
          );
        }
      })
      .catch((error) => console.log("error", error));
  };

  CityPopulatedCstatebase = (CountryCode, selectstate, index) => {
    this.setState({
      selectstate: selectstate,
    });
    this.state.AllAddresses[index].StateId = selectstate;
    var headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "VnR4QWdkM3RLWk9OZTFDelBTdUljZDdCMXRiQ3lKZEVuRXUwUDVpbQ=="
    );
    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };
    // Pass Country & State Code -- Eg: Country Code : IN & State Code : MH
    fetch(
      `https://api.countrystatecity.in/v1/countries/${this.state.SelecterCode}/states/${CountryCode}/cities`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.error == "Not found.") {
          this.setState({
            Allcity: [],
          });
        } else {
          this.setState({
            Allcity: result,
          });
        }
      })
      .catch((error) => console.log("error", error));
  };
  OnAddmoreAddress = () => {
    let Data = {
      AddressType: "",
      AddressLine1: "",
      AddressLine2: "",
      City: "",
      CountryId: null,
      StateId: null,
      ZipCode: null,
    };
    this.setState({
      AllAddresses: [...this.state.AllAddresses, Data],
    });
  };
  deleteAddress = (e) => {
    var attachments = [...this.state.AllAddresses]; // make a separate copy of the array
    var index = attachments.indexOf(e);
    if (index !== -1) {
      attachments.splice(index, 1);
      this.setState({ AllAddresses: attachments });
    }
  };

  OnAddmoreContact = () => {
    let Data = {
      contacttype: "",
      contactemail: null,
      ContactNumber: null,
    };
    this.setState({
      AllContact: [...this.state.AllContact, Data],
    });
  };
  deleteContact = (e) => {
    var attachments = [...this.state.AllContact]; // make a separate copy of the array
    var index = attachments.indexOf(e);
    if (index !== -1) {
      attachments.splice(index, 1);
      this.setState({ AllContact: attachments });
    }
  };
  handelDOB = (v) => {
    this.setState(
      {
        DateOfBirth: v,
        Age: this.getAge(v),
      },
      () => {
        if (this.state.Age <= 18) {
          alert(
            "You are not eligible for the membership as you are below 18 years."
          );
        }
      }
    );
  };
  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  handelGetinputValue = (e) => {
    let { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };
  HandelOnChangeAddressType = (e, i) => {
    let { value } = e.target;
    this.state.AllAddresses[i].AddressType = value;
    this.setState({});
  };
  HandelOnChangeAddress1 = (e, i) => {
    let { value } = e.target;
    this.state.AllAddresses[i].AddressLine1 = value;
    this.setState({});
  };
  HandelOnChangeAddress2 = (e, i) => {
    let { value } = e.target;
    this.state.AllAddresses[i].AddressLine2 = value;
    this.setState({});
  };
  HandelOnChangeAddressCity = (e, i) => {
    let { value } = e.target;
    this.state.AllAddresses[i].City = value;
    this.setState({});
  };
  HandelOnChangeAddressZipCode = (e, i) => {
    let { value } = e.target;
    this.state.AllAddresses[i].ZipCode = value;
    this.setState({});
  };
  HandelOnChangeAContactType = (e, i) => {
    let { value } = e.target;
    this.state.AllContact[i].contacttype = value;
    this.setState({});
  };
  HandelOnChangeAPhoneNumber = (e, i) => {
    this.state.AllContact[i].ContactNumber = e;
    this.setState({});
  };

  handelMembershiptype = (e) => {
    let { value } = e.target;
    this.setState({ MembershipType: value });
  };
  handelBillingFrequency = (e) => {
    let { value } = e.target;
    this.setState({ BillingFrequency: value });
  };
  handelMembershipPrice = (e) => {
    let { value } = e.target;
    this.setState({ MembershipPrice: value });
  };
  handelStartDate = (e) => {
    this.setState({ StartDate: e });
  };
  handelEndDate = (e) => {
    if (this.state.StartDate > e) {
      alert("Should be greater than start date, can be null");
    } else {
      this.setState({ EndDate: e });
    }
  };
  handeSubmit = () => {
    let {
      Fname,
      Lname,
      Email,
      DateOfBirth,
      AllContact,
      AllAddresses,
      MembershipType,
      MembershipPrice,
      StartDate,
      EndDate,
      BillingFrequency,
    } = this.state;
    let body = {
      firstName: Fname,
      lastName: Lname,
      email: Email,
      DateOfBirth: DateOfBirth,
      contactinfo: AllContact,
      Address: AllAddresses,
      MembershipInfo: {
        MembershipType: MembershipType,
        MemberShipPrice: MembershipPrice,
        StartDate: StartDate,
        EndDate: EndDate,
        BillingFrequency: BillingFrequency,
      },
    };
    Axios.post(`https://localhost:7201/api/AddCustomer`, body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    console.log(this.state);
    return (
      <div className="AddWrapper">
        <h1 style={{ padding: 5 }}>Add Customer </h1>
        <h4>Personal Information</h4>
        <Grid spacing={5} container>
          <Grid item md={6}>
            <TextField
              style={{ width: "100%" }}
              id="outlined-basic"
              label="First Name"
              name="Fname"
              variant="outlined"
              onChange={this.handelGetinputValue}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              style={{ width: "100%" }}
              id="outlined-basic"
              label="Last Name"
              name="Lname"
              variant="outlined"
              onChange={this.handelGetinputValue}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              style={{ width: "100%" }}
              id="outlined-basic"
              label="Email"
              name="Email"
              variant="outlined"
              onChange={this.handelGetinputValue}
            />
          </Grid>
          <Grid item md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="DOB"
                  inputFormat="MM/dd/yyyy"
                  value={this.state.DateOfBirth}
                  onChange={this.handelDOB}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginTop: 20,
              marginBottom: -10,
              alignItems: "center",
            }}
          >
            <h4 style={{ paddingLeft: 40 }}>Address Information </h4>
            <Button onClick={this.OnAddmoreAddress} variant="outlined">
              Add More
            </Button>
          </div>
          {this.state.AllAddresses.map((res, index) => {
            return (
              <>
                <Grid item md={12}>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    {/* <h2>{index + 1}</h2> */}
                    {index == 0 ? null : (
                      <IconButton onClick={() => this.deleteAddress(res)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </div>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Address Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Address Type"
                      value={res.AddressType}
                      onChange={(v) => this.HandelOnChangeAddressType(v, index)}
                    >
                      <MenuItem value="Home">Home</MenuItem>
                      <MenuItem value="Work">Work</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Address 1"
                    variant="outlined"
                    value={res.AddressLine1}
                    onChange={(e) => this.HandelOnChangeAddress1(e, index)}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Address 2"
                    variant="outlined"
                    value={res.AddressLine2}
                    onChange={(e) => this.HandelOnChangeAddress2(e, index)}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    value={res.City}
                    onChange={(e) => this.HandelOnChangeAddressCity(e, index)}
                  />
                </Grid>
                <Grid item md={6}>
                  <Autocomplete
                    className="EligbnbleAutocomplete"
                    // id="combo-box-demo"
                    id="country"
                    options={this.state.Allcountry}
                    onChange={(event, newValue) => {
                      if (newValue?.iso2) {
                        this.StatePopulatedcountrybase(
                          newValue.iso2,
                          newValue,
                          index
                        );
                      } else {
                        this.StatePopulatedcountrybase("");
                      }
                    }}
                    // inputValue="United States"
                    // renderOption={(option) => (
                    //   <React.Fragment>
                    //     {/* <span>{this.countryToFlag(option.iso2)}</span> */}
                    //     {option.name} ({option.iso2})
                    //   </React.Fragment>
                    // )}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="country"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6}>
                  <Autocomplete
                    // freeSolo
                    // disabled={this.state.SelecterCity.length == 0 ? true : false}
                    className="EligbnbleAutocomplete"
                    onChange={(event, newValue) => {
                      if (newValue?.iso2) {
                        this.CityPopulatedCstatebase(
                          newValue.iso2,
                          newValue,
                          index
                        );
                      } else {
                        this.CityPopulatedCstatebase("");
                      }
                    }}
                    // getOptionSelected={(option, value) =>
                    // option.name === this.state.selectstate.name
                    // }
                    // id="combo-box-demo"
                    id="state"
                    // renderOption={(option) => (
                    //   <React.Fragment>
                    //     {/* <span>{this.countryToFlag(option.iso2)}</span> */}
                    //     <div>
                    //       {option.name} ({option.iso2})
                    //     </div>
                    //   </React.Fragment>
                    // )}
                    options={this.state.SelecterCity}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField {...params} label="state" variant="outlined" />
                    )}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Zip Code"
                    variant="outlined"
                    value={res.ZipCode}
                    onChange={(e) =>
                      this.HandelOnChangeAddressZipCode(e, index)
                    }
                  />
                </Grid>
              </>
            );
          })}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginTop: 20,
              marginBottom: -10,
              alignItems: "center",
            }}
          >
            <h4 style={{ paddingLeft: 40 }}>Contact Information </h4>
            <Button onClick={this.OnAddmoreContact} variant="outlined">
              Add More
            </Button>
          </div>
          {this.state.AllContact.map((v, i) => {
            return (
              <>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-end",
                    marginBottom: -30,
                    marginTop: 10,
                  }}
                >
                  {/* <h2>{index + 1}</h2> */}
                  {i == 0 ? null : (
                    <IconButton onClick={() => this.deleteContact(v)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </div>
                <Grid item md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Contact Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Contact Type"
                      value={v.contacttype}
                      onChange={(e) => this.HandelOnChangeAContactType(e, i)}
                    >
                      <MenuItem value="Mobile">Mobile</MenuItem>
                      <MenuItem value="Landline">Landline</MenuItem>
                      <MenuItem value="Email">Email</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <ReactPhoneInput
                    inputStyle={{
                      width: "100%",
                      height: 55,
                    }}
                    value={v.ContactNumber}
                    defaultCountry={"us"}
                    onChange={(e) => this.HandelOnChangeAPhoneNumber(e, i)} // passed function receives the phone value
                  />
                </Grid>
              </>
            );
          })}

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
              marginBottom: -30,
              marginTop: 10,
              paddingLeft: 50,
            }}
          >
            <h4>Membership Details</h4>
          </div>
          <Grid item md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Membership Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Membership Type"
                value={this.state.MembershipType}
                onChange={this.handelMembershiptype}
              >
                <MenuItem value="Prepay">Prepay</MenuItem>
                <MenuItem value="Recurring">Recurring</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {this.state.MembershipType == "Recurring" ? (
            <Grid item md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Billing Frequency
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Membership Type"
                  value={this.state.BillingFrequency}
                  onChange={this.handelBillingFrequency}
                >
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          ) : null}
          <Grid item md={6}>
            <TextField
              style={{ width: "100%" }}
              id="outlined-basic"
              label="Membership Price"
              variant="outlined"
              value={this.state.MembershipPrice}
              onChange={this.handelMembershipPrice}
            />
          </Grid>
          <Grid item md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="MM/dd/yyyy"
                  minDate={new Date()}
                  value={this.state.StartDate}
                  onChange={this.handelStartDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="End Date"
                  minDate={new Date()}
                  inputFormat="MM/dd/yyyy"
                  value={this.state.EndDate}
                  onChange={this.handelEndDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Button
          onClick={handeSubmit}
          variant="outlined"
          style={{ marginTop: 20 }}
        >
          Submit
        </Button>
      </div>
    );
  }
}
