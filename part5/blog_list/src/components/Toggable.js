import { useState } from 'react'

const Toggable = (props) => {
  const [isVisible, setIsVisible] = useState(false)

  const showWhenVisible = isVisible ? '' : 'none'
  const hideWhenVisible = isVisible ? 'none' : ''

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div>
      <div style={{ display: hideWhenVisible }}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={{ display: showWhenVisible }}>
        { props.children }
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
}

export default Toggable