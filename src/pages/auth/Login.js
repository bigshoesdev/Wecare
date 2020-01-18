import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import { loginUser } from '../../redux/actions';
import { isUserAuthenticated } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import logo from '../../assets/images/winadvisors-logo.png';

class Login extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {
            username: '',
            password: ''
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
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        this.props.loginUser(values.username, values.password, this.props.history);
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
                                        { /* preloader */}
                                        {this.props.loading && <Loader />}

                                        <div className="text-center w-75 m-auto">
                                            <a href="/">
                                                <span><img src={logo} alt="" height="70" /></span>
                                            </a>
                                            <p className="text-muted mb-4 mt-3">Enter your username and password to access admin panel.</p>
                                        </div>


                                        {this.props.error && <Alert color="danger" isOpen={!!this.props.error}>
                                            <div>{this.props.error}</div>
                                        </Alert>}

                                        <AvForm onValidSubmit={this.handleValidSubmit}>
                                            <AvField name="username" label="Username" placeholder="Enter your username" value={this.state.username} required />

                                            <AvGroup className="mb-3">
                                                <Label for="password">Password</Label>
                                                <AvInput type="password" name="password" id="password" placeholder="Enter your password" value={this.state.password} required />
                                                <AvFeedback>This field is invalid</AvFeedback>
                                            </AvGroup>

                                            <FormGroup>
                                                <Button color="primary" className="btn-block">Log In</Button>
                                            </FormGroup>
                                        </AvForm>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>}
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(mapStateToProps, { loginUser })(Login);
