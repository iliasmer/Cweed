import { Link, useNavigate } from 'react-router-dom'

const CandidateListView = (props) => {
  const navigate = useNavigate()
  // DB might return 'undefined' if none stored
  const candidates = props.candidates || []

  const candidateRow = ({ id, candidate }) => {
    const { name } = candidate
    return (
      <tr key={id} onClick={() => navigate(`/candidate/${id}`)} role='button'>
        <td>{name}</td>
      </tr>
    )
  }

  return (
    <div className='container'>
      <h2>Resumes</h2>
      <p>
        The table below shows all candidates. You can upload a new
        resume <Link className='text-custom-green' to='/create'>here</Link>.
      </p>
      <h3>All resumes</h3>
      <p>Click on a candidate to show more details about them.</p>
      <table className='table table-striped table-hover'>
        <thead className='table-dark'>
          <tr>
            <th>
              <h5>Candidate</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidateRow)}
        </tbody>
      </table>
      {(candidates.length > 0) || (<div className='mt-3'><em className='text-secondary'>No results found</em></div>)}
    </div>
  )
}

export default CandidateListView
