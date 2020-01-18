import React from "react";
import Avatar from "react-avatar-edit";
import { Row, Col, CardBody, Card } from "reactstrap";
import profilePic from "../assets/images/users/user-1.jpg";
export default class AvatarUpload extends React.Component {
  constructor(props) {
    super(props);
    const src = "";
    this.state = {
      preview: profilePic,
      src
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.setState({ preview: profilePic });
  }

  onCrop(preview) {
    this.setState({ preview });
  }

  render() {
    return (
        <Card>
          <CardBody>
            <Row >
              <Col  style={{margin:'5px'}} >
                {" "}
                <Avatar
                 imageWidth={230}
                  onCrop={this.onCrop}
                  onClose={this.onClose}
                  src={this.state.src}
                />
              </Col>
              <Col  style={{margin:'5px'}}>
                <img
                  src={this.state.preview}
                  alt="Preview"
                  style={{ borderRadius: "50%" }}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
    
    );
  }
}
