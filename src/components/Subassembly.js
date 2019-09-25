/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-24 16:06:26
 * @LastEditTime: 2019-09-25 11:09:39
 */
import React, {Component} from 'react';

class Subassembly extends Component {
  render(){
    return (
      <span style={{
        color: '#666',
        fontSize: '10px',
        marginRight: '20px'
      }}>
        {this.props.label ?  <span style={{ marginRight: '5px'}}>{this.props.label}: </span> : ''}       
        <span>{this.props.info}</span>
      </span>
    )
  }

}

export default Subassembly;