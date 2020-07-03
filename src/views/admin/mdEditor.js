import React, { Component } from "react";
import http$ from "../../lib/axios";
import { message } from "antd";
import Editor from "for-editor";


class MdEditor extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
    };
    this.$vm = React.createRef()
  }

  handleChange(value) {
    console.log(value, "val");
    this.props.handleVal(value);
    this.setState({
      value,
    });
  }

  handleAddImg(file){
    console.log( file)
    // 创建form 对象
    let param = new FormData();
    param.append('file', file)
    // console.log(param.get('file'));
    let config = {
      headers: {'Content-type': 'multipart/form-data'}
    }
    // http$.post('/md/upload', null, {headers: { Content-type: 'multipart/form-data'}})
    http$.post('/md/upload', param, {headers: {'Content-type': 'multipart/form-data'}}).then(data => {
      // console.log(data)
      this.$vm.current.$img2Url(file.name, data.filename)
    })

  }

  render() {
    const { value } = this.state;
    return (
      <Editor 
        ref={this.$vm}
        value={value} 
        addImg={(value) => this.handleAddImg(value)}
        onChange={(value) => this.handleChange(value)} />
    );
  }
}

export default MdEditor;
