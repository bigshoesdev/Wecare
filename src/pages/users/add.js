import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {Row, Col, Card, CardBody, Button, Label, FormGroup, Alert} from 'reactstrap';

import { addUser } from '../../redux/actions';
import Loader from '../../components/Loader';
import {AvFeedback, AvField, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";

class Add extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onSubmitHandler = (e, v) => {
        console.log('Submit user...');
        this.props.addUser(v.fullName, v.username, v.role, v.password);
    };

    render() {
        if (this.props.userAdded._id) {
            return <Redirect to='/users' />;
        }
        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                    <Row>
                        <Col>
                            <div className="page-title-box">
                                <Row>
                                    <Col lg={7}>
                                        <h4 className="page-title">Add User</h4>
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
                                    <AvForm onValidSubmit={this.onSubmitHandler}>
                                        <AvField name="fullName" label="Full Name" placeholder="Enter your name" required />

                                        <AvField type="text" name="username" label="Username" placeholder="Enter your username" required />

                                        <AvField type="select" name="role" label="Role" required>
                                            <option value="">Choose role</option>
                                            <option value="staff">Staff</option>
                                            <option value="admin">Admin</option>
                                        </AvField>

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
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const { userAdded, loading, error } = state.User;
    return { userAdded, loading, error };
};

export default connect(mapStateToProps, { addUser })(Add);
