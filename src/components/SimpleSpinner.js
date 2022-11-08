import { Spinner } from 'react-bootstrap'

const SimpleSpinner = () => {
  return (
    <div className='container d-flex justify-content-center align-content-center'>
      <Spinner size='lg' animation='border' role='status' className='text-custom-green' />
    </div>
  )
}

export default SimpleSpinner
