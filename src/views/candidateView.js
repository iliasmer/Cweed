import { Link } from 'react-router-dom'
import Alert from '../components/Alert'

const CandidateView = (props) => {
  const { name, phone, email, content } = props.candidate
  return (
    <div className='container'>
      {props.isCreated ? <Alert className='alert alert-success alert-dismissible fade show' alertText='Candidate Successfully Created!' /> : false}
      <div className='row'>
        <div className='col'>
          <h2>Candidate</h2>
        </div>
        <div className='col'>
          <p className='text-end'><Link className='text-custom-green' to='/list'>&larr; Back to the list.</Link></p>
        </div>
      </div>
      <div className='row mt-3 p-3'>
        <div className='p-3 shadow col-lg-8'>
          <h3>{name}</h3>
          <ul className='list-unstyled'>
            <li>&#9742; {phone}</li>
            <li>&#9993; <a className='text-custom-green' href={`mailto:${email}`}>{email}</a></li>
          </ul>
          <h4>Resume</h4>
          <p>{content}</p>
        </div>
      </div>
    </div>
  )
}

export default CandidateView
