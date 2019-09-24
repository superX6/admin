/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-24 16:06:26
 * @LastEditTime: 2019-09-24 16:23:37
 */
import React, {Component} from 'react';

class Subassembly extends Component {
  constructor(props){
    super(props)    
  }

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