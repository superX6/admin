/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-23 11:38:31
 * @LastEditTime: 2019-09-24 10:09:35
 */
import React, { Component } from 'react'
import Create from './create';


export default class Admin extends Component {
constructor(props){
  super(props)
}
render(){
  return (
    <div>
      <Create></Create>
    </div>
   )
  }
}
