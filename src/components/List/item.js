import React, {Component} from 'react'


class Item extends Component {

  render(h) {
    const {label} = this.props
    console.log(label)
    return (  
      <li>{label}</li>
    )
  }

}

export default Item