import { useState } from 'react'
import { Button } from 'react-bootstrap'

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
        <Button variant="secondary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={{ display: showWhenVisible }} className={props.className}>
        {props.children}
        <Button variant="warning" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default Toggable
