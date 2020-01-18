import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import { registerUser } from '../../redux/actions';
import { isUserAuthenticated } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo-dark.png';

class Register extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        document.body.classList.add('authentication-bg');
        document.body.classList.add('authentication-bg-pattern');
    }

    componentWillUnmount() {
        this._isMounted = false;
        document.body.classList.remove('authentication-bg');
        document.body.classList.remove('authentication-bg-pattern');
    }

    /**
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        this.props.registerUser(values.fullname, values.email, values.password);
    }

    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to='/' />
        }
    }

    /**
     * Redirect to confirm
     */
    renderRedirectToConfirm = () => {
        return <Redirect to='/confirm' />;
    }

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>

                {this.renderRedirectToRoot()}

                {Object.keys(this.props.user || {}).length > 0 && this.renderRedirectToConfirm()}

                {(this._isMounted || !isAuthTokenValid) && <div className="account-pages mt-5 mb-5">
                    <Container>
                    <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5} >
                                <Card className="bg-pattern">
                                    <CardBody className="p-4 position-relative">
                                        { /* preloader */}
                                        {this.props.loading && <Loader />}

                                        <div className="text-center w-75 m-auto">
                                            <a href="/">
                                                <span><img src={logo} alt="" height="22" /></span>
                                            </a>
                                            <p className="text-muted mb-4 mt-3">Don't have an account? Create your account, it takes less than a minute</p>
                                        </div>

                                        {this.props.error && <Alert color="danger" isOpen={this.props.error ? true : false}>
                                            <div>{this.props.error}</div>
                                        </Alert>}

                                        <AvForm onValidSubmit={this.handleValidSubmit}>
                                            <AvField name="fullname" label="Full Name" placeholder="Enter your name" required />

                                            <AvField type="email" name="email" label="Email address" placeholder="Enter your email" required />

                                            <AvGroup>
                                                <Label for="password">Password</Label>
                                                <AvInput type="password" name="password" id="password" placeholder="Enter your password" required />
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

                        <Row className="mt-1">
                            <Col className="col-12 text-center">
                                <p className="text-white-50">Already have an account? <Link to="/login" className="text-white ml-1"><b>Sign In</b></Link></p>
                            </Col>
                        </Row>
                    </Container>
                </div>}

                <footer className="footer footer-alt">
                    2015 - 2019 &copy; UBold theme by <Link to="https://coderthemes.com" className="text-white-50">Coderthemes</Link>
                </footer>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(mapStateToProps, { registerUser })(Register);