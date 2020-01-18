import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Button, Alert } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { getLoggedInUser } from "../../helpers/authUtils";
import { getPolicy, updatePolicy } from "../../redux/actions";
import Loader from "../../components/Loader";
import Input from "../../components/Input";

class EditPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),

      _id: "",
      policyName: "",
      policyNumber: "",
      policyType: "",
      company: "",
      policyStartDate: "",
      ageIncepted: "",
      policyEndAge: "",
      policyDuration: "",
      premiumSGD: "",
      paymentFrequency: "",
      paymentMethod: "Cash",
      premiumEndAge: "",
      cashValueAmount: 0,
      cashValueAge: 0,
      remarks: "",

      benefitId: "",
      death: "",
      totalPermanentDisability: "",
      disabilityIncome: "",
      criticalIllness: "",
      earlyCriticalIllness: "",
      accidentalDeath: "",
      accidentalDisability: "",
      accidentalReimbursement: "",
      hospitalization: "",
      hospitalIncome: "",
      other: ""
    };
  }
  calcPolicyDuration() {
    if (this.state.policyEndAge !== "" && this.state.ageIncepted !== "") {
      let x = parseInt(this.state.policyEndAge, "10");
      let y = parseInt(this.state.ageIncepted, "10");
      this.setState({
        policyDuration: `${x - y} years`
      });
    }
  }
  onChangeDecimalHandler = e => {
    if (e.target.value.search(/\D+/) >= 0) {
      return null;
    }
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  
  handlecompany = e => {
    let x = typeof e[0];
    if (typeof e[0] === "object") {
      this.setState({ company: e[0].label });
      return null;
    }
    if (e.length) this.setState({ company: e[0] });
  };
  handlePayment = e => {
    if (e.length) this.setState({ paymentMethod: e[0] });
  };
  componentDidMount() {
    this.props.getPolicy(this.props.match.params.policyId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.policy !== this.props.policy) {
      let company = nextProps.policy.company ? nextProps.policy.company : "";
      let paymentMethod = nextProps.policy.paymentMethod
        ? nextProps.policy.paymentMethod
        : "";
      this.setState({
        _id: nextProps.policy._id,
        policyName: nextProps.policy.policyName,
        policyNumber: nextProps.policy.policyNumber,
        policyType: nextProps.policy.policyType,
        company: company,
        policyStartDate: nextProps.policy.policyStartDate,
        ageIncepted: nextProps.policy.ageIncepted,
        policyEndAge: nextProps.policy.policyEndAge,
        policyDuration: nextProps.policy.policyDuration,
        premiumSGD: nextProps.policy.premiumSGD,
        paymentFrequency: nextProps.policy.paymentFrequency,
        paymentMethod: paymentMethod,
        premiumEndAge: nextProps.policy.premiumEndAge,
        cashValueAge: nextProps.policy.cashValueAge,
        cashValueAmount: nextProps.policy.cashValueAmount,
        remarks: nextProps.policy.remarks,

        benefitId: nextProps.policy.benefit._id,
        death: nextProps.policy.benefit.death,
        totalPermanentDisability:
          nextProps.policy.benefit.totalPermanentDisability,
        disabilityIncome: nextProps.policy.benefit.disabilityIncome,
        criticalIllness: nextProps.policy.benefit.criticalIllness,
        earlyCriticalIllness: nextProps.policy.benefit.earlyCriticalIllness,
        accidentalDeath: nextProps.policy.benefit.accidentalDeath,
        accidentalDisability: nextProps.policy.benefit.accidentalDisability,
        accidentalReimbursement:
          nextProps.policy.benefit.accidentalReimbursement,
        hospitalization: nextProps.policy.benefit.hospitalization,
        hospitalIncome: nextProps.policy.benefit.hospitalIncome,
        other: nextProps.policy.benefit.other
      });
    }
  }

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const {
      _id,
      policyName,
      policyNumber,
      policyType,
      company,
      policyStartDate,
      ageIncepted,
      policyEndAge,
      policyDuration,
      premiumSGD,
      paymentFrequency,
      paymentMethod,
      premiumEndAge,
      cashValueAge,
      cashValueAmount,
      remarks,

      benefitId,
      death,
      totalPermanentDisability,
      disabilityIncome,
      criticalIllness,
      earlyCriticalIllness,
      accidentalDeath,
      accidentalDisability,
      accidentalReimbursement,
      hospitalization,
      hospitalIncome,
      other
    } = this.state;
    this.props.updatePolicy(
      _id,
      policyName,
      policyNumber,
      policyType,
      company,
      policyStartDate,
      ageIncepted,
      policyEndAge,
      policyDuration,
      premiumSGD,
      paymentFrequency,
      paymentMethod,
      premiumEndAge,
      cashValueAge,
      cashValueAmount,
      remarks,

      benefitId,
      death,
      totalPermanentDisability,
      disabilityIncome,
      criticalIllness,
      earlyCriticalIllness,
      accidentalDeath,
      accidentalDisability,
      accidentalReimbursement,
      hospitalization,
      hospitalIncome,
      other
    );
  };

  render() {
    if (this.props.updatePolicySuccess) {
      return (
        <Redirect to={`/clients/${this.props.match.params.id}/view#i-p`} />
      );
    }
    const paymentOption = ["Cash", "Medisave", "CPF- OA", "CPF- SA"];
    const companyoption = [
      "AIA",
      "Aviva",
      "AXA Life",
      "China Life",
      "Great Eastern",
      "HSBC",
      "Manulife",
      "NTUC Income",
      "Overseas Assurance",
      "Singapore Life",
      "Transamerica",
      "Prudential",
      "Zurich"
    ];
    return (
      <React.Fragment>
        <div>
          {this.props.loading && <Loader />}
          <Row>
            <Col>
              <div className="page-title-box">
                <Row>
                  <Col lg={7}>
                    <h4 className="page-title">Update Policy</h4>
                  </Col>
                  <Col lg={5} className="mt-lg-3 mt-md-0" />
                </Row>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  {this.props.error && (
                    <Alert color="danger" isOpen={!!this.props.error}>
                      <div>{this.props.error}</div>
                    </Alert>
                  )}
                  <form onSubmit={this.onSubmitHandler}>
                    <Row>
                      <Col lg={12}>
                        <h4 className="page-title">Policy</h4>
                        <div style={{ margin: "25px 0px 20px 0px" }}>
                          <span
                            style={{
                              display: "block",
                              border: "none",
                              color: "white",
                              height: "1px",
                              background: "black",
                              background:
                                "-webkit-gradient(radial, 50% 50%, 0, 50% 50%, 350, from(#000), to(#fff))"
                            }}
                          ></span>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <Input
                          label="Policy Name"
                          type="text"
                          name="policyName"
                          onChange={this.onChangeHandler}
                          value={this.state.policyName}
                        />
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Policy Number"
                          type="text"
                          name="policyNumber"
                          onChange={this.onChangeHandler}
                          value={this.state.policyNumber}
                        />
                      </Col>
                      <Col lg={6}>
                        <div className="form-group">
                          <label>Policy Type</label>
                          <select
                            name="policyType"
                            className="form-control"
                            onChange={this.onChangeHandler}
                            value={this.state.policyType}
                          >
                            <option value="">Choose type</option>
                            <option value="Risk Management">
                              Risk Management
                            </option>
                            <option value="Wealth Accumulation">
                              Wealth Accumulation
                            </option>
                            <option value="Wealth Preservation">
                              Wealth Preservation
                            </option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div style={{ marginBottom: "15px" }}>
                          <label>Company</label>
                          <Typeahead
                            allowNew
                            selected={[this.state.company]}
                            id="company"
                            multiple={false}
                            options={companyoption}
                            onChange={this.handlecompany}
                            placeholder="Choose a Company...."
                          />
                        </div>
                      </Col>
                      <Col lg={3}>
                        <Input
                          label="Policy Start Date"
                          type="date"
                          name="policyStartDate"
                          onChange={this.onChangeHandler}
                          value={this.state.policyStartDate}
                        />
                      </Col>
                      <Col lg={3}>
                        <Input
                          label="Age Incepted"
                          type="text"
                          name="ageIncepted"
                          onChange={e => {
                            this.onChangeDecimalHandler(e);
                          }}
                          value={this.state.ageIncepted}
                          onBlur={e => this.calcPolicyDuration()}
                        />
                      </Col>
                      <Col lg={3}>
                        <Input
                          label="Policy End Age"
                          type="text"
                          name="policyEndAge"
                          onChange={e => {
                            this.onChangeDecimalHandler(e);
                          }}
                          value={this.state.policyEndAge}
                          onBlur={e => this.calcPolicyDuration()}
                          // onBlur={this.calcPolicyDuration}
                        />
                      </Col>
                      <Col lg={3}>
                        <Input
                          label="Policy Duration"
                          type="text"
                          name="policyDuration"
                          onChange={this.onChangeHandler}
                          value={this.state.policyDuration}
                        />
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Premium (SGD)"
                          type="text"
                          name="premiumSGD"
                          onChange={this.onChangeHandler}
                          value={this.state.premiumSGD}
                        />
                      </Col>
                      <Col lg={6}>
                        <div className="form-group">
                          <label>Payment Frequency</label>
                          <select
                            name="paymentFrequency"
                            className="form-control"
                            onChange={this.onChangeHandler}
                            value={this.state.paymentFrequency}
                          >
                            <option value="">Choose type</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="Half Yearly">Half Yearly</option>
                            <option value="Annually">Annually</option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div style={{ marginBottom: "15px" }}>
                          <label>Payment Method</label>
                          <Typeahead
                            id="Payment Method"
                            selected={[this.state.paymentMethod]}
                            multiple={false}
                            options={paymentOption}
                            onChange={e => this.handlePayment(e)}
                            placeholder="Choose a Payment Method...."
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Premium End Age"
                          type="text"
                          name="premiumEndAge"
                          onChange={this.onChangeDecimalHandler}
                          value={this.state.premiumEndAge}
                        />
                      </Col>
                      <Col lg={12}>
                        <div className="form-group">
                          <label>Cash Value</label>
                          <Row>
                            <Col lg={6}>
                              <input
                                type="number"
                                name="cashValueAge"
                                value={this.state.cashValueAge}
                                onChange={this.onChangeHandler}
                                placeholder="Age"
                                className="form-control"
                                onBlur={e => {
                                  this.setState({
                                    cashValueAge: parseFloat(
                                      e.target.value,
                                      "10"
                                    ).toFixed(0)
                                  });
                                }}

                                //onChange={this.onChangeHandler}
                              />
                            </Col>
                            <Col lg={6}>
                              <input
                                type="number"
                                name="cashValueAmount"
                                className="form-control"
                                value={this.state.cashValueAmount}
                                onChange={this.onChangeHandler}
                                onBlur={e => {
                                  this.setState({
                                    cashValueAmount: parseFloat(
                                      e.target.value,
                                      "10"
                                    ).toFixed(2)
                                  });
                                }}
                                placeholder="Amount"
                              />
                            </Col>
                          </Row>
                        </div>
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
                        <h4 className="page-title">Benefit</h4>
                        <div style={{ margin: "25px 0px 20px 0px" }}>
                          <span
                            style={{
                              display: "block",
                              border: "none",
                              color: "white",
                              height: "2px",
                              background: "black",
                              background:
                                "-webkit-gradient(radial, 50% 50%, 0, 50% 50%, 350, from(#000), to(#fff))"
                            }}
                          ></span>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Death"
                          type="text"
                          name="death"
                          onChange={this.onChangeHandler}
                          value={this.state.death}
                        />
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Total Permanent Disability"
                          type="text"
                          name="totalPermanentDisability"
                          onChange={this.onChangeHandler}
                          value={this.state.totalPermanentDisability}
                        />
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Disability Income"
                          type="text"
                          name="disabilityIncome"
                          onChange={this.onChangeHandler}
                          value={this.state.disabilityIncome}
                        />
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Critical Illness"
                          type="text"
                          name="criticalIllness"
                          onChange={this.onChangeHandler}
                          value={this.state.criticalIllness}
                        />
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Early Critical Illness"
                          type="text"
                          name="earlyCriticalIllness"
                          onChange={this.onChangeHandler}
                          value={this.state.earlyCriticalIllness}
                        />
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Accidental Death"
                          type="text"
                          name="accidentalDeath"
                          onChange={this.onChangeHandler}
                          value={this.state.accidentalDeath}
                        />
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Accidental Disability"
                          type="text"
                          name="accidentalDisability"
                          onChange={this.onChangeHandler}
                          value={this.state.accidentalDisability}
                        />
                      </Col>
                      <Col lg={6}>
                        <Input
                          label="Accidental Reimbursement"
                          type="text"
                          name="accidentalReimbursement"
                          onChange={this.onChangeHandler}
                          value={this.state.accidentalReimbursement}
                        />
                      </Col>
                      <Col lg={12}>
                        <Input
                          label="Hospitalization"
                          type="text"
                          name="hospitalization"
                          onChange={this.onChangeHandler}
                          value={this.state.hospitalization}
                        />
                      </Col>
                      <Col lg={12}>
                        <Input
                          label="Hospital Income"
                          type="text"
                          name="hospitalIncome"
                          onChange={this.onChangeHandler}
                          value={this.state.hospitalIncome}
                        />
                      </Col>
                      <Col lg={12}>
                        <Input
                          label="Other"
                          type="text"
                          name="otherBenefit"
                          onChange={this.onChangeHandler}
                          value={this.state.otherBenefit}
                        />
                      </Col>
                      <Col lg={12}>
                        <Button type="submit" color="primary">
                          Submit
                        </Button>
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
  const { user, policy, updatePolicySuccess, loading, error } = state.User;
  return { user, policy, updatePolicySuccess, loading, error };
};

export default connect(
  mapStateToProps,
  { getPolicy, updatePolicy }
)(EditPolicy);
