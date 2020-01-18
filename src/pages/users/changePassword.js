import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody, Button, Label, FormGroup, Alert} from 'reactstrap';
import {AvFeedback, AvField, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";

import {getLoggedInUser} from '../../helpers/authUtils';
import {getUser, changePassword} from '../../redux/actions';
import Loader from '../../components/Loader';

const password = (value, ctx) => {
    if (!ctx.password) {
        return false;
    }
    return true;
};

const confirmPassword = (value, ctx) => {
    if (!ctx.password) {
        return false;
    }

    if (!ctx.confirmPassword) {
        return false;
    }

    if (ctx.password !== ctx.confirmPassword) {
        return "Passwords do not match.";
    }
    return true;
};

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser()
        };
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.id)
    }

    onSubmitHandler = (e, v) => {
        this.props.changePassword(this.props.user._id, v.fullName, v.role, v.password);
    };

    onInvalidSubmit = (event, errors, values) => {
        this.setState({errors, values});
    };
    validatePassword = () => {
        this.form.validateInput('password');
    };

    validateConfirmPassword = () => {
        this.form.validateInput('confirmPassword');
    };

    render() {
        if (this.props.changedPassword) {
            return <Redirect to='/users'/>;
        }
        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader/>}

                    <Row>
                        <Col>
                            <div className="page-title-box">
                                <Row>
                                    <Col lg={7}>
                                        <h4 className="page-title">Update User</h4>
                                    </Col>
                                    <Col lg={5} className="mt-lg-3 mt-md-0">

                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    {this.props.error && <Alert color="danger" isOpen={!!this.props.error}>
                                        <div>{this.props.error}</div>
                                    </Alert>}
                                    <AvForm ref={c => (this.form = c)} onValidSubmit={this.onSubmitHandler}
                                            onInvalidSubmit={this.onInvalidSubmit}>
                                        <AvField name="fullName" label="Full Name" placeholder="Enter your name"
                                                 value={this.props.user.fullName} required/>

                                        <AvField type="text" name="username" label="Username"
                                                 placeholder="Enter your username" value={this.props.user.username}
                                                 readOnly required/>

                                        <AvField type="select" name="role" label="Role"
                                                 value={this.props.user.role} required>
                                            <option value="">Choose role</option>
                                            <option value="staff">FSC</option>
                                            <option value="admin">Admin</option>
                                        </AvField>

                                        <AvGroup>
                                            <Label for="password">Password</Label>
                                            <AvInput type="password" label="Password" name="password" id="password"
                                                     placeholder="Enter your password"
                                                     validate={{myValidation: password}}
                                                     onChange={this.validatePassword}/>
                                        </AvGroup>

                                        <AvGroup>
                                            <Label for="confirmPassword">Confirm Password</Label>
                                            <AvInput type="password" label="Confirm Password" name="confirmPassword"
                                                     id="confirmPassword" validate={{myValidation: confirmPassword}}
                                                     onChange={this.validateConfirmPassword}
                                                     placeholder="Confirm your password"/>
                                            <AvFeedback>This field is invalid</AvFeedback>
                                        </AvGroup>

                                        <FormGroup className="mt-3 mb-0 text-center">
                                            <Button color="success" className="btn-block">Submit</Button>
                                        </FormGroup>
                                    </AvForm>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const {user, changePassword, loading, error} = state.User;
    return {user, changedPassword: changePassword, loading, error};
};

export default connect(mapStateToProps, {getUser, changePassword})(ChangePassword);
