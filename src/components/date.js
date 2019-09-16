/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 14:59:02
 * @LastEditTime: 2019-08-15 15:04:06
 * @LastEditors: Please set LastEditors
 */
import React, {component, Component} from 'react'
import { DatePicker } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class TimePicter extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  onchange(date, dateString){
    console.log(date, dateString)
  }
  render(){
    return (
      <div>
        <DatePicker onChange={this.onChange} />
    <br />
    <MonthPicker onChange={this.onChange} placeholder="Select month" />
    <br />
    <RangePicker onChange={this.onChange} />
    <br />
    <WeekPicker onChange={this.onChange} placeholder="Select week" />
      </div>
    )
  }
}

export default TimePicter