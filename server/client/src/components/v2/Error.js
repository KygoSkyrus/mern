import React from 'react'
import errorSvg from './../../assets/images/newImg/collections/oops-404-error-animate.svg'

const Error = () => {
  return (
    <div>
      <img src={errorSvg} alt='' />
        <h1 className='text-danger'>ERROR</h1>
        </div>
  )
}

export default Error