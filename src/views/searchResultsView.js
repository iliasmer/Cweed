import { Link, useNavigate } from 'react-router-dom'

const SearchResultsView = (props) => {
  const navigate = useNavigate()

  // DB might return 'undefined' if none stored
  const results = props.search.results || []

  results.sort((a, b) => {
    return b.score - a.score
  })

  const wrapper = (result) => {
    const { id, score } = result
    const { name } = props.getById(id)
    return searchResultRow({ id, name, score })
  }

  const searchResultRow = ({ id, score, name }) => {
    return (
      <tr key={id} onClick={() => navigate(`/candidate/${id}`)} role='button'>
        <td>{name}</td>
        <td className='text-center'>{score}</td>
      </tr>
    )
  }

  return (
    <div className='container'>
      <h2>Search results</h2>
      <p>
        Here are the results for your last recent search. Only relevant results are shown.
        To search for a different set of keywords go to
        the <Link to='/' className='text-custom-green'>search page</Link>.
      </p>
      <h3>Search details</h3>
      <p>
        Results shown for the query <em>"{props.search.terms.join(', ')}"</em>.
        Click on a candidate to show more details about them.
      </p>
      <p>Search date: {props.search.date}</p>
      <table className='table table-striped table-hover'>
        <thead className='table-dark'>
          <tr>
            <th><h5>Candidate Name</h5></th>
            <th className='text-center'>
              <h5>Score</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map(wrapper)}
        </tbody>
      </table>
      {(results.length > 0) || (<div className='mt-3'><em className='text-secondary'>No results found</em></div>)}
    </div>
  )
}

export default SearchResultsView
