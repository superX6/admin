import React from 'react';
import { SlotContext } from './SlotProvider'
import PropTypes from 'prop-types'
const Slot = ({ name, children }) => {
 return (
  <SlotContext.Consumer>
   {(value) => {
    const addOnRenderer = value.requestAddOnRenderer(name)
     return (addOnRenderer && addOnRenderer()) || children || null
   }}
  </SlotContext.Consumer>
 )
}
Slot.displayName = 'Slot'
Slot.propTypes = { name: PropTypes.string }
Slot.defaultProps = { name: '$$default' }
export default Slot