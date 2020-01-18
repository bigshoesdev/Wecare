import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Modal, ModalHeader, ModalFooter, ModalBody} from "reactstrap";

import { getLoggedInUser } from "../../helpers/authUtils";
import { getClients } from "../../redux/actions";
import Loader from "../../components/Loader";
import { format, parseISO } from "date-fns";
import { Table, Divider, Button, Input } from "antd";
import "antd/dist/antd.css";
import { PDFDownloadLink } from "@react-pdf/renderer";

const { Search } = Input;

const columns = [
  {
    title: "Name",
    dataIndex: "nricName",
    key: "name",
    render: (value, record) => `${value} (${record.preferredName})`,
    sorter: (a, b) => {
      return a.nricName.length - b.nricName.length;
    }
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact"
  },
  {
    title: "Birth Date",
    dataIndex: "dob",
    key: "dob",
    sorter: (a, b) => {
      return new Date(b.dob) - new Date(a.dob);
    },
    render: value => {
      if (value) {
        return format(parseISO(value), "yyyy/MM/dd");
      }
      return null;
    }
  },
  {
    title: "Next Followup Date",
    key: "tags",
    dataIndex: "nextFollowUpDate",
    sorter: (a, b) => {
      return new Date(b.dob) - new Date(a.dob);
    },
    render: value => {
      if (value) {
        return format(parseISO(value), "yyyy/MM/dd");
      }
      return null;
    }
  },
  {
    title: "Action",
    key: "action",
    render: (value, record) => (
      <span>
        <Link to={`/clients/${record._id}/view`}>View</Link>
        <Divider type="vertical" />
        <Link to={`/clients/${record._id}/Edit`}>Edit</Link>
      </span>
    )
  }
];

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
      key: ''
    };
  }

  componentDidMount() {
    this.props.getClients();
  }

  handleChange(value) {
    this.props.getClients(value);
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
                  <Col lg={6}>
                    <h4 className="page-title">Clients</h4>
                  </Col>
                  <Col lg={6} className="mt-lg-3 mt-md-0 text-right">
                    <Search
                      placeholder=""
                      style={{ width: 200, 'marginRight': 20 }}
                      onSearch={this.handleChange.bind(this)}
                      allowClear
                    >
                    </Search>
                    <Link to="/clients/add">
                      <Button type="primary" ghost>
                        Add Client
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Table
                columns={columns}
                rowKey="_id"
                dataSource={this.props.clients}
              />
              {/* <Card>
                <CardBody>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Birth Date</th>
                        <th>Next Followup Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.clients.map((client, i) => (
                        <tr key={i}>
                          <td>
                            {client.nricName} ({client.preferredName})
                          </td>
                          <td>{client.contact}</td>
                          <td>
                            {client.dob &&
                              format(parseISO(client.dob), "yyyy/MM/dd")}
                          </td>
                          <td>
                            {client.nextFollowUpDate}
                          </td>
                          <td>
                            <Link to={`/clients/${client._id}/view`}>View</Link>
                          </td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>*/}
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { clients, loading, error } = state.User;
  return { clients, loading, error };
};

export default connect(
  mapStateToProps,
  { getClients }
)(Clients);
