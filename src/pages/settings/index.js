import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Form, FormGroup, Label, Input, Dropdown } from "reactstrap";

import { getLoggedInUser } from "../../helpers/authUtils";
import { getUser, getSetting, updateAccountCategories, updateAccountFinancial } from "../../redux/actions";
import Loader from "../../components/Loader";
import classnames from 'classnames';
import "antd/dist/antd.css";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'financial',
      user: getLoggedInUser(),    
      default_death: 0,
      default_tpd: 0,
      default_critical_illness: 0,
      default_early_critical_illness: 0,
      default_disability_income: 0,
      default_accidental_death: 0,
      default_accidental_disability: 0,
      default_accidental_reimbursement: 0,
      default_categories:[],
      death: 0,
      tpd: 0,
      critical_illness: 0,
      early_critical_illness: 0,
      disability_income: 0,
      accidental_death: 0,
      accidental_disability: 0,
      accidental_reimbursement: 0,
      currentCategory: '',
      categories: []
    };

    this.setActive = this.setActive.bind(this);

    this.onFinancialSubmitHandler = this.onFinancialSubmitHandler.bind(this);

    this.addCategory = this.addCategory.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.setting !== this.props.setting) {
      this.setState({
        default_death: nextProps.setting.default_death,
        default_tpd: nextProps.setting.default_tpd,
        default_critical_illness: nextProps.setting.default_critical_illness,
        default_early_critical_illness: nextProps.setting.default_early_critical_illness,
        default_disability_income: nextProps.setting.default_disability_income,
        default_accidental_death: nextProps.setting.default_accidental_death,
        default_accidental_disability: nextProps.setting.default_accidental_disability,
        default_accidental_reimbursement: nextProps.setting.default_death,
        default_categories: nextProps.setting.default_categories,
        currentCategory: ''
      });
    }

    if(nextProps.user !== this.props.user) {
      this.setState({
        death: nextProps.user.financial.death,
        tpd:  nextProps.user.financial.tpd,
        critical_illness:  nextProps.user.financial.critical_illness,
        early_critical_illness:  nextProps.user.financial.early_critical_illness,
        disability_income:  nextProps.user.financial.disability_income,
        accidental_death:  nextProps.user.financial.accidental_death,
        accidental_disability:  nextProps.user.financial.accidental_disability,
        accidental_reimbursement:  nextProps.user.financial.accidental_reimbursement,
        categories: nextProps.user.categories
      });
    }
  }


  setActive = active => {
    this.setState({
      active
    });
  };

  componentDidMount() {
    this.props.getUser(this.state.user.id);
    this.props.getSetting();
  }

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onFinancialSubmitHandler = (e) => {
    this.props.updateAccountFinancial(this.state.user.id,{
      death: this.state.death,
      tpd: this.state.tpd,
      critical_illness: this.state.critical_illness,
      early_critical_illness: this.state.early_critical_illness,
      disability_income: this.state.disability_income,
      accidental_death: this.state.accidental_death,
      accidental_disability: this.state.accidental_disability,
      accidental_reimbursement: this.state.accidental_reimbursement
    });
  }

  deleteCategory(c) {
    this.state.categories = this.state.categories.filter(category => category != c);

    this.props.updateAccountCategories(this.state.user.id, this.state.categories);
  }

  addCategory(e) { 
    e.preventDefault();
    for(let category of this.state.categories) {
      if(category == this.state.currentCategory) {
        return;
      }
    }
    this.state.categories.push(this.state.currentCategory);
    this.props.updateAccountCategories(this.state.user.id, this.state.categories);
  }

  render() {
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
                    <h4 className="page-title">Settings</h4>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.active === 'financial' })}
                onClick={() => this.setActive("financial")}
              >
                Financial Summary
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active:  this.state.active === 'category' })}
                onClick={() => this.setActive("category")}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Categories&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.active} >
            <TabPane tabId="financial">
              <Form onSubmit={this.onFinancialSubmitHandler}>
                <Row style={{'marginBottom' : 15, 'marginTop': 20}}>
                  <Col lg={{ size: 2, offset: 1}}>
                    <Label style={{'fontSize': 20}}><b>Income Protection</b></Label>
                  </Col>
                  <Col lg={{ size: 4}}>
                    <Label style={{'fontSize': 20}}>Optimisation</Label>
                  </Col>
                  <Col lg={{ size: 2}}>
                  </Col>
                </Row>
                <FormGroup row>
                  <Label for="exampleEmail" lg={{size: 2, offset: 1}}>Death</Label>
                  <Col sm={2}>
                    <Input type="number" name="death" id="death" placeholder="Death" 
                          onChange={this.onChangeHandler}
                          value={this.state.death} />
                  </Col>
                  <Label for="death" lg={{size: 1}}>%</Label>
                  <Label for="death" lg={{size: 1}}>of annual income</Label>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" lg={{size: 2, offset: 1}}>TPD</Label>
                  <Col sm={2}>
                    <Input type="number" name="tpd" id="tpd" placeholder="TPD"
                          onChange={this.onChangeHandler}
                          value={this.state.tpd}  />
                  </Col>
                  <Label for="tpd" lg={{size: 1}}>%</Label>
                  <Label for="tpd" lg={{size: 1}}>of annual income</Label>
                </FormGroup>
                <FormGroup row>
                  <Label for="critical_illness" lg={{size: 2, offset: 1}}>Critical illness</Label>
                  <Col sm={2}>
                    <Input type="number" name="critical_illness" id="critical_illness" placeholder="Critical Illness" 
                          onChange={this.onChangeHandler}
                          value={this.state.critical_illness} />
                  </Col>
                  <Label for="critical_illness" lg={{size: 1}}>%</Label>
                  <Label for="critical_illness" lg={{size: 1}}>of annual income</Label>
                </FormGroup>
                <FormGroup row>
                  <Label for="disability_income" lg={{size: 2, offset: 1}}>Disability Income</Label>
                  <Col sm={2}>
                    <Input type="number" name="disability_income" id="disability_income" placeholder="Disability Income"
                          onChange={this.onChangeHandler}
                          value={this.state.disability_income} />
                  </Col>
                  <Label for="disability_income" lg={{size: 1}}>%</Label>
                  <Label for="disability_income" lg={{size: 1}}>of month income</Label>
                </FormGroup>
                <Row style={{'marginBottom' : 15}}>
                  <Col lg={{ size: 2, offset: 1}}>
                    <Label style={{'fontSize': 20}}><b>Accident Protection</b></Label>
                  </Col>
                </Row>
                <FormGroup row>
                  <Label for="accidental_death" lg={{size: 2, offset: 1}}>Accidental Death</Label>
                  <Label for="accidental_reimbursement" style={{'marginTop': 7}}>$</Label>
                  <Col sm={2}>
                    <Input type="number" name="accidental_death" id="accidental_death" placeholder="Accidental Death" 
                          onChange={this.onChangeHandler}
                          value={this.state.accidental_death} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="accidental_disability" lg={{size: 2, offset: 1}}>Accidental Disability</Label>
                  <Label for="accidental_reimbursement" style={{'marginTop': 7}}>$</Label>
                  <Col sm={2}>
                    <Input type="number" name="accidental_disability" id="accidental_disability" placeholder="Accidental Disability" 
                          onChange={this.onChangeHandler}
                          value={this.state.accidental_disability} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="accidental_reimbursement" lg={{size: 2, offset: 1}}>Accidental Reimbursement</Label>
                  <Label for="accidental_reimbursement" style={{'marginTop': 7}}>$</Label>
                  <Col sm={2}>
                    <Input type="number" name="accidental_reimbursement" id="accidental_reimbursement" placeholder="Accidental Reimbursement" 
                          onChange={this.onChangeHandler}
                          value={this.state.accidental_reimbursement} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={2}>
                      <button className="btn btn-info" style={{'marginLeft': 140, 'marginTop': 40 ,'width': 90}}>Save</button>
                  </Col>
                </FormGroup>
              </Form>
            </TabPane>
            <TabPane tabId="category">
              <FormGroup>
                <Col lg={{ size: 2, offset: 1}}>
                  <Label style={{'fontSize': 20}}><b>Add Categories</b></Label>
                </Col>
                <Row style={{'marginBottom' : 15, 'marginTop': 20}}>
                  <Col lg={{ size: 2, offset: 1}}>
                    <Input type="text" name="currentCategory" id="currentCategory" 
                          editable="true"
                          onChange={this.onChangeHandler}
                          value={this.state.currentCategory}>
                      {
                        this.state.default_categories.map((category, i) => (
                          <option key={i}>{category}</option>
                        ))
                      }
                    </Input>
                  </Col>
                  <Col lg={{ size: 2}}>
                    <button className="btn btn-info" style={{'width': 90}} onClick={this.addCategory}>Add</button>
                  </Col>
                </Row>
                <Row>
                  <Col lg={{ size: 4, offset: 1}}>
                    <table className='table table-bordered'>
                      <tbody>
                        <tr>
                          <th>My Categories</th>
                          <th>Action</th>
                        </tr>
                      </tbody>
                      <tbody>
                        {
                          this.state.categories.map((category, i) => (
                            <tr key={i}>
                              <td>{category}</td>
                              <td><a href="#" onClick={ () => this.deleteCategory(category)}>Delete</a></td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </FormGroup>
            </TabPane>
          </TabContent>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const {loading, setting, user, error } = state.User;
  return {  setting, loading, user,  error };
};

export default connect(
  mapStateToProps,
  { getUser, getSetting, updateAccountCategories, updateAccountFinancial }
)(Settings);
