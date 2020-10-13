import React, { Component } from 'react';
function getDisplayName(component) {
  return component.displayName || component.name || 'component'
}
export const SlotContext = React.createContext({
  requestAddOnRenderer: () => { }
})
const SlotProviderHoC = (WrappedComponent) => {
  return class extends Component {
    static displayName = `SlotProvider(${getDisplayName(WrappedComponent)})`
    // 用于缓存每个<AddOn />的内容
    addOnRenderers = {}
    requestAddOnRenderer = (name) => {
      if (!this.addOnRenderers[name]) {
        return undefined
      }
      return () => (
        this.addOnRenderers[name]
      )
    }
    render() {
      const {
        children,
        ...restProps
      } = this.props
      if (children) {
        // 以k-v的方式缓存<AddOn />的内容
        const arr = React.Children.toArray(children)
        const nameChecked = []
        this.addOnRenderers = {}
        arr.forEach(item => {
          const itemType = item.type
          console.log('itemType',itemType)
          if (item.type.displayName === 'AddOn') {
            const slotName = item.props.slot || '$$default'
            // 确保内容唯一性
            if (nameChecked.findIndex(item => item === slotName) !== -1) {
              throw new Error(`Slot(${slotName}) has been occupied`)
            }
            this.addOnRenderers[slotName] = item.props.children
            nameChecked.push(slotName)
          }
        })
      }
      return (
        <SlotContext.Provider value={{ requestAddOnRenderer: this.requestAddOnRenderer }}>
          <WrappedComponent {...restProps} />
        </SlotContext.Provider >
      )
    }
  }
 }
 export default SlotProviderHoC