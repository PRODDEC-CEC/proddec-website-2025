import React from 'react'
import './button1.css'

const button = () => {
  return (
    <div>
<button class="cta">
  <span>Join Us</span>
  <svg width="15px" height="10px" viewBox="0 0 13 10">
    <path d="M1,5 L11,5"></path>
    <polyline points="8 1 12 5 8 9"></polyline>
  </svg>
</button>
    </div>
  )
}

export default button
