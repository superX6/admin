/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-17 09:31:44
 * @LastEditTime: 2019-09-17 09:36:24
 */
import {INCREASE, DECREASE } from '../types'


const actions = {
  increase: () => ({type: INCREASE}),
  decrease: () => ({type: DECREASE})
}

export default actions;