import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import UploadCardPicture from "../../components/ImageWallEdit";
import { getClients, getClient,updateClient } from "../../redux/actions";
import Loader from "../../components/Loader";
import Input from "../../components/Input";

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      title: "",
      nricName: "",
      preferredName: "",
      nric_passport: "",
      dob: "",
      nextFollowUpDate: "",
      lastpurchasae: "",
      email: "",
      contact: "",
      contact2: "",
      race: "",
      nationality: "",
      familyrelationship: "",
      address: "",
      gender: "",
      family: "",
      annualExpense: "",
      monthlyExpense: "",
      annualShortTermSavings: "",
      monthlyShortTermSavings: "",
      annualIncome: "",
      monthlyIncome: "",
      companyaddress: "",
      companyname: "",
      occupation: "",
      referredsource: "",
      othersource: "",
      remarks: "",
      undeleted:[],
      fileList: []
    };
  }

  setFileList = fileList => {
    this.setState({
      fileList
    });
  };
  deleteFileList = file => {
    this.setState({
      undeleted:this.state.undeleted.filter((item)=>file!==item)
    });
  };
  componentDidMount() {
    this.props.getClients();
    this.props.getClient(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.client).length) {
      const value = nextProps.client;
      let Images=nextProps.client.cards.map((item, key) => {
        return { ...item, uid: key };
      });
      this.setState({
        _id: value._id,
        title: value.title ? value.title : "",//Typeahead
        nricName: value.nricName,
        preferredName: value.preferredName,
        nric_passport: value.nric_passport,
        dob: value.dob,
        nextFollowUpDate: value.nextFollowUpDate,
        lastpurchasae: value.lastpurchasae,
        email: value.email,
        contact: value.contact,
        contact2: value.contact2,
        race: value.race ? value.race : "",//Typeahead
        nationality: value.nationality ? value.nationality : "",//Typeahead
        familyrelationship: value.familyrelationship,
        address: value.address,
        gender: value.gender,
        family: value.family ? value.family : "",//Typeahead
        annualExpense: value.annualExpense,
        monthlyExpense: value.monthlyExpense,
        annualShortTermSavings: value.annualShortTermSavings,
        monthlyShortTermSavings: value.monthlyShortTermSavings,
        annualIncome: value.annualIncome,
        monthlyIncome: value.monthlyIncome,
        companyaddress: value.companyaddress,
        companyname: value.companyname,
        occupation: value.occupation,
        referredsource: value.referredsource ? value.referredsource : "",//Typeahead
        othersource: value.othersource ? value.othersource : "",//Typeahead
        remarks: value.remarks,
        fileList:Images,
        undeleted:Images
      });
    }
  }

  onChangeHandler = e => {
    const { name, value } = e.target;
    if (name === "annualExpense") {
      this.setState({
        [name]: parseFloat(Math.round(value * 100) / 100).toFixed(2),
        monthlyExpense: parseFloat(
          Math.round((value / 12) * 100) / 100
        ).toFixed(2)
      });
    }
    if (name === "monthlyExpense") {
      this.setState({
        [name]: parseFloat(Math.round(value * 100) / 100).toFixed(2),
        annualExpense: parseFloat(Math.round(value * 12 * 100) / 100).toFixed(2)
      });
    }
    if (name === "annualShortTermSavings") {
      this.setState({
        [name]: parseFloat(Math.round(value * 100) / 100).toFixed(2),
        monthlyShortTermSavings: parseFloat(
          Math.round((value / 12) * 100) / 100
        ).toFixed(2)
      });
    }
    if (name === "monthlyShortTermSavings") {
      this.setState({
        [name]: parseFloat(Math.round(value * 100) / 100).toFixed(2),
        annualShortTermSavings: parseFloat(
          Math.round(value * 12 * 100) / 100
        ).toFixed(2)
      });
    }
    if (name === "annualIncome") {
      this.setState({
        [name]: parseFloat(Math.round(value * 100) / 100).toFixed(2),
        monthlyIncome: parseFloat(Math.round((value / 12) * 100) / 100).toFixed(
          2
        )
      });
    }
    if (name === "monthlyIncome") {
      this.setState({
        [name]: parseFloat(Math.round(value * 100) / 100).toFixed(2),
        annualIncome: parseFloat(Math.round(value * 12 * 100) / 100).toFixed(2)
      });
    }
    this.setState({ [name]: value });
  };

  onBlurHandler = e => {
    console.log("Target: ", e.target);
    const { name, value } = e.target;

    this.setState({
      [name]: parseFloat(Math.round(value * 100) / 100).toFixed(2)
    });
  };

  handleFamily = e => {
    if(e.length)
    this.setState({
      family: e[0].label
    });
  };
  handleRS = e => {
    if(e.length)
    this.setState({
      referredsource: e[0].label
    });
  };
  handleOS = e => {
    if(e.length)
    this.setState({
      othersource: e[0]
    });
  };
  handleTitle = e => {
    if(e.length)
    this.setState({
      title: e[0]
    });
  };
  handleRace = e => {
    if(e.length)
    this.setState({
      race: e[0]
    });
  };
  handleNationality = e => {
    if(e.length)
    this.setState({
      nationality: e[0]
    });
  };
  onSubmitHandler = e => {
    e.preventDefault();

    const {
      _id,
      title,
      nricName,
      preferredName,
      nric_passport,
      dob,
      nextFollowUpDate,
      lastpurchasae,
      email,
      contact,
      contact2,
      race,
      nationality,
      familyrelationship,
      address,
      gender,
      family,
      annualExpense,
      monthlyExpense,
      annualShortTermSavings,
      monthlyShortTermSavings,
      annualIncome,
      monthlyIncome,
      companyaddress,
      companyname,
      occupation,
      referredsource,
      othersource,
      remarks,
      undeleted,
      fileList
    } = this.state;
    this.props.updateClient(
      _id,
      title,
      nricName,
      preferredName,
      nric_passport,
      dob,
      nextFollowUpDate,
      lastpurchasae,
      email,
      contact,
      contact2,
      race,
      nationality,
      familyrelationship,
      address,
      gender,
      family,
      annualExpense,
      monthlyExpense,
      annualShortTermSavings,
      monthlyShortTermSavings,
      annualIncome,
      monthlyIncome,
      companyaddress,
      companyname,
      occupation,
      referredsource,
      othersource,
      remarks,
      undeleted,
      fileList
    );
  };

  render() {
    if (this.props.updateClientSuccess) {
      return <Redirect to={`/clients`}/>;
  }

    const options = this.props.clients.map(client => {
      return {
        id: client._id,
        label: client.nricName + " (" + client.preferredName + ")"
      };
    });
    const titleOptions = ["Mr", "Ms", "Miss", "Mdm", "Dr"];
    const raceOptions = ["Chinese", "Malay", "Indian", "Eurasian", "Others"];
    const nationalityOptions = [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antigua &amp; Barbuda",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia",
      "Bosnia &amp; Herzegovina",
      "Botswana",
      "Brazil",
      "British Virgin Islands",
      "Brunei",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cape Verde",
      "Cayman Islands",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Congo",
      "Cook Islands",
      "Costa Rica",
      "Cote D Ivoire",
      "Croatia",
      "Cruise Ship",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Estonia",
      "Ethiopia",
      "Falkland Islands",
      "Faroe Islands",
      "Fiji",
      "Finland",
      "France",
      "French Polynesia",
      "French West Indies",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guam",
      "Guatemala",
      "Guernsey",
      "Guinea",
      "Guinea Bissau",
      "Guyana",
      "Haiti",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Isle of Man",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jersey",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kuwait",
      "Kyrgyz Republic",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macau",
      "Macedonia",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Namibia",
      "Nepal",
      "Netherlands",
      "Netherlands Antilles",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Norway",
      "Oman",
      "Pakistan",
      "Palestine",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Reunion",
      "Romania",
      "Russia",
      "Rwanda",
      "Saint Pierre &amp; Miquelon",
      "Samoa",
      "San Marino",
      "Satellite",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "South Africa",
      "South Korea",
      "Spain",
      "Sri Lanka",
      "St Kitts &amp; Nevis",
      "St Lucia",
      "St Vincent",
      "St. Lucia",
      "Sudan",
      "Suriname",
      "Swaziland",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Timor L'Este",
      "Togo",
      "Tonga",
      "Trinidad &amp; Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks &amp; Caicos",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "United States Minor Outlying Islands",
      "Uruguay",
      "Uzbekistan",
      "Venezuela",
      "Vietnam",
      "Virgin Islands (US)",
      "Yemen",
      "Zambia",
      "Zimbabwe"
    ];
    const OSoptions = ["Warm", "Referral", "Cold Call"];
    return (
      <React.Fragment>
        <div className="">
          {/* preloader */}
          {this.props.loading && <Loader />}

          <Row>
            <Col>
              <div className="page-title-box">
                <Row>
                  <Col lg={7}>
                    <h4 className="page-title">Edit Client</h4>
                  </Col>
                  <Col lg={5} className="mt-lg-3 mt-md-0"></Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <form onSubmit={this.onSubmitHandler}>
                    <Row>
                      <Col lg={6}>
                        <Input
                          label="NRIC Name"
                          type="text"
                          name="nricName"
                          onChange={this.onChangeHandler}
                          value={this.state.nricName}
                        />
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Preferred Name *"
                          type="text"
                          name="preferredName"
                          onChange={this.onChangeHandler}
                          value={this.state.preferredName}
                          required
                        />
                      </Col>
                      <Col lg={6}>
                        <div style={{ marginBottom: "15px" }}>
                          <label>Title</label>
                          <Typeahead
                            id="Title"
                            selected={[this.state.title]}
                            multiple={false}
                            options={titleOptions}
                            onChange={this.handleTitle}
                            placeholder="Choose a Title..."
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Date of Birth "
                          type="date"
                          name="dob"
                          onChange={this.onChangeHandler}
                          value={this.state.dob}
                        />
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="NRIC / Passport "
                          type="text"
                          name="nric_passport"
                          onChange={this.onChangeHandler}
                          value={this.state.nric_passport}
                        />
                      </Col>

                      <Col lg={6}>
                        <Input
                          label="Email "
                          type="email"
                          name="email"
                          onChange={this.onChangeHandler}
                          value={this.state.email}
                        />
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Contact No "
                          type="text"
                          name="contact"
                          onChange={this.onChangeHandler}
                          value={this.state.contact}
                        />
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Contact No 2 "
                          type="text"
                          name="contact2"
                          onChange={this.onChangeHandler}
                          value={this.state.contact2}
                        />
                      </Col>
                      <Col lg={12}>
                        <div className="form-group">
                          <label>Gender *</label>
                          <select
                            name="gender"
                            className="form-control"
                            value={this.state.gender}
                            onChange={this.onChangeHandler}
                            required
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div style={{ marginBottom: "15px" }}>
                          <label>Race</label>
                          <Typeahead
                            id="Race"
                            selected={[this.state.race]}
                            multiple={false}
                            options={raceOptions}
                            onChange={this.handleRace}
                            placeholder="Choose a Race.."
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div style={{ marginBottom: "15px" }}>
                          <label>Nationality</label>
                          <Typeahead
                            selected={[this.state.nationality]}
                            id="Nationality"
                            multiple={false}
                            options={nationalityOptions}
                            onChange={this.handleNationality}
                            placeholder="Choose a Nationality.."
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Occupation"
                          type="text"
                          name="occupation"
                          onChange={this.onChangeHandler}
                          value={this.state.occupation}
                        />
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Company Name"
                          type="text"
                          name="companyname"
                          onChange={this.onChangeHandler}
                          value={this.state.companyname}
                        />
                      </Col>
                      <Col lg={12}>
                        <Input
                          label="Company Address"
                          type="text"
                          name="companyaddress"
                          onChange={this.onChangeHandler}
                          value={this.state.companyaddress}
                        />
                      </Col>
                      <Col lg={12}>
                        <Input
                          label="Address "
                          type="text"
                          name="address"
                          onChange={this.onChangeHandler}
                          value={this.state.address}
                        />
                      </Col>
                      <Col lg={6}>
                        <div style={{ marginBottom: "15px" }}>
                          <label>Family</label>
                          <Typeahead
                            selected={[this.state.family]}
                            id="family"
                            multiple={false}
                            options={options}
                            onChange={this.handleFamily}
                            placeholder="Choose a family..."
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Family Relationship"
                          type="text"
                          name="familyrelationship"
                          onChange={this.onChangeHandler}
                          value={this.state.familyrelationship}
                        />
                      </Col>
                      <Col lg={6}>
                        <div style={{ marginBottom: "15px" }}>
                          <label>Referred Source</label>
                          <Typeahead
                            selected={[this.state.referredsource]}
                            id="referredsource"
                            multiple={false}
                            options={options}
                            onChange={this.handleRS}
                            placeholder="Choose a Referred Source..."
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div style={{ marginBottom: "15px" }}>
                          <label>Other Source</label>
                          <Typeahead
                            selected={[this.state.othersource]}
                            id="othersource"
                            multiple={false}
                            options={OSoptions}
                            onChange={this.handleOS}
                            placeholder="Choose a Other Source..."
                          />
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="form-group">
                          <label>Living Expenses</label>
                          <Row>
                            <Col lg={6}>
                              <input
                                type="text"
                                name="annualExpense"
                                value={this.state.annualExpense}
                                className="form-control"
                                onChange={this.onChangeHandler}
                                onBlur={this.onBlurHandler}
                                placeholder="Yearly"
                              />
                            </Col>
                            <Col lg={6}>
                              <input
                                type="text"
                                name="monthlyExpense"
                                value={this.state.monthlyExpense}
                                className="form-control"
                                onChange={this.onChangeHandler}
                                onBlur={this.onBlurHandler}
                                placeholder="Monthly"
                              />
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="form-group">
                          <label>Short Term Savings</label>
                          <Row>
                            <Col lg={6}>
                              <input
                                type="text"
                                name="annualShortTermSavings"
                                value={this.state.annualShortTermSavings}
                                className="form-control"
                                onChange={this.onChangeHandler}
                                onBlur={this.onBlurHandler}
                                placeholder="Yearly"
                              />
                            </Col>
                            <Col lg={6}>
                              <input
                                type="text"
                                name="monthlyShortTermSavings"
                                value={this.state.monthlyShortTermSavings}
                                className="form-control"
                                onChange={this.onChangeHandler}
                                onBlur={this.onBlurHandler}
                                placeholder="Monthly"
                              />
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="form-group">
                          <label>Income</label>
                          <Row>
                            <Col lg={6}>
                              <input
                                type="text"
                                name="annualIncome"
                                value={this.state.annualIncome}
                                className="form-control"
                                onChange={this.onChangeHandler}
                                onBlur={this.onBlurHandler}
                                placeholder="Yearly"
                              />
                            </Col>
                            <Col lg={6}>
                              <input
                                type="text"
                                name="monthlyIncome"
                                value={this.state.monthlyIncome}
                                className="form-control"
                                onChange={this.onChangeHandler}
                                onBlur={this.onBlurHandler}
                                placeholder="Monthly"
                              />
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Last Purchase "
                          type="date"
                          name="lastpurchasae"
                          onChange={this.onChangeHandler}
                          value={this.state.lastpurchasae}
                        />
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Next Followup Date "
                          type="date"
                          name="nextFollowUpDate"
                          onChange={this.onChangeHandler}
                          value={this.state.nextFollowUpDate}
                        />
                      </Col>
                      <Col lg={12}>
                        <Input
                          label="Remarks"
                          type="text"
                          name="remarks"
                          onChange={this.onChangeHandler}
                          value={this.state.remarks}
                        />
                      </Col>
                      <Col lg={12}>
                        <UploadCardPicture
                          setFileList={this.setFileList}
                          fileList={this.state.fileList}
                          deleteFileList={this.deleteFileList}
                        />
                      </Col>
                      <Col lg={12}>
                        <Button color="primary">Submit</Button>
                      </Col>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { clients, client, clientAdded,updateClientSuccess, loading, error } = state.User;
  return { clients, updateClientSuccess,client, clientAdded, loading, error };
};

export default connect(
  mapStateToProps,
  { getClients,updateClient, getClient }
)(EditClient);
