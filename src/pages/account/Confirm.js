import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

import { Container, Row, Col, Card, CardBody, } from 'reactstrap';

import { isUserAuthenticated } from '../../helpers/authUtils';
import logo from '../../assets/images/logo-dark.png';

class Confirm extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
        }
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
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to='/' />
        }
    }

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>

                {this.renderRedirectToRoot()}

                {(this._isMounted || !isAuthTokenValid) && <div className="account-pages mt-5 mb-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5} >
                                <Card className="bg-pattern">
                                    <CardBody className="p-4 position-relative">
                                        <div className="text-center w-75 m-auto">
                                            <a href="/">
                                                <img src={logo} alt="" height="22" className="mb-3" />
                                            </a>
                                        </div>
                                        <div className="text-center m-auto">
                                            <h4 className="mt-3">Please check your email</h4>
                                            <p className="text-muted mt-2"> An email has been send to <span className="font-weight-medium">youremail@domain.com</span>.
                                                Please check for an email from company and click on the included link to
                                        reset your password. </p>

                                            <p className="text-center">
                                                <Link className="btn btn-block btn-pink waves-effect waves-light mt-3" to="/login">Back to Login</Link>
                                            </p>
                                        </div>
                                    </CardBody>
                                </Card>
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

export default connect()(Confirm);