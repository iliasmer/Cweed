import { useState } from 'react'

const Alert = (props) => {
  const [isHidden, setHidden] = useState(false)
  const dismissAlertCB = () => {
    setHidden(true)
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className={isHidden ? 'hideAlert' : props.className} role='alert'>
            {props.alertText}
            <button type='button' className='btn-close float-right' data-bs-dismiss='alert' aria-label='Close' onClick={dismissAlertCB} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alert
