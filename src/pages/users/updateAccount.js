import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody, Button, Label, FormGroup, Alert} from 'reactstrap';

import {getLoggedInUser} from '../../helpers/authUtils';
import {getUser, updateAccount} from '../../redux/actions';
import Loader from '../../components/Loader';
import {AvFeedback, AvField, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import AvatarUplaod from '../../components/AvatarUpload'
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

class UpdateAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser()
        };
    }

    componentDidMount() {
        this.props.getUser(this.state.user.id)
    }

    onSubmitHandler = (e, v) => {
        this.props.updateAccount(this.props.user._id, v.fullName, v.password);
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
        if (this.props.updateAccountSuccess) {
            return <Redirect to='/login'/>;
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
                                        <h4 className="page-title">Update Account</h4>
                                    </Col>
                                    <Col lg={5} className="mt-lg-3 mt-md-0">

                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                            <AvatarUplaod />
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
    const {user, updateAccountSuccess, loading, error} = state.User;
    return {user, updateAccountSuccess, loading, error};
};

export default connect(mapStateToProps, {getUser, updateAccount})(UpdateAccount);
