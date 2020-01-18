import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Upload, Icon, Modal, notification } from "antd";
const { Dragger } = Upload;

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 50);
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: ""
  };

  handleCancel = () => this.setState({ previewVisible: false });

  beforeUpload(file) {
    const isJPG = file.type === "image/jpeg";
    if (!isJPG) {
      notification.open({
        message: "ERROR",
        key: "error",
        duration: 1,
        description: `Only JPG Allowed`,
        icon: (
          <Icon type="close-circle" theme="filled" style={{ color: "red" }} />
        )
      });
    }
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => {
    const { setFileList } = this.props;
    if (fileList.length > 3) {
      notification.open({
        message: "ERROR",
        key: "error",
        duration: 1,
        description: `Maximun 3 Pictures can be Uploaded`,
        icon: (
          <Icon type="close-circle" theme="filled" style={{ color: "red" }} />
        )
      });
    } else {
      setFileList(fileList);
    }
  };
  handleRemove = (file) => {
    if(file._id){
      this.props.deleteFileList(file);
    }
  };

  render() {
    const { previewVisible, previewImage } = this.state;
    const { fileList, justDisplay} = this.props;
    const uploadButton = (
      <div>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </div>
    );
    return (
      <div className="clearfix">
        {justDisplay ? (
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            disabled={true}
          ></Upload>
        ) : (
          <Dragger
            customRequest={dummyRequest}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onRemove={this.handleRemove}
            onChange={this.handleChange}
          >
            {!justDisplay && uploadButton}
          </Dragger>
        )}
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
          zIndex={1051}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}


