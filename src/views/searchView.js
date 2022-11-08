import ScannerForm from '../components/ScannerForm'

import { Link, useNavigate } from 'react-router-dom'

const SearchView = (props) => {
  const navigate = useNavigate()
  const searches = props.searches
    // sort by dates
    .sort((a, b) => new Date(b.search.date) - new Date(a.search.date))
    // take five most recent searches for rendering
    .slice(0, 5)

  const searchRow = ({ id, search }) => {
    return (
      <tr key={id} onClick={() => navigate(`/search/${id}`)} role='button'>
        <td>{search.date}</td>
        <td className=''>{search.terms.join(', ')}</td>
        <td className='text-center'>{search.results?.length || 0}</td>
      </tr>
    )
  }

  return (
    <div className='container'>
      <h2>Search</h2>
      <p>
        You can enter keywords which should be specific to the role that you are hiring for.
        The application will scan the current uploaded resumes and award them points with
        regards to the keywords you just entered, taking into account words with similar
        meaning and synonyms.
      </p>
      <p>
        You can upload a new resume <Link to='/create' className='text-custom-green'>here</Link>.
      </p>
      <div className='mt-5'>
        <ScannerForm onSearch={props.handleSearch} />
      </div>
      <h3 className='mt-5'>Recent Searches</h3>
      <p>
        The table below shows your five most recent searches. Click on a search to see the results.
      </p>
      <table className='table table-striped table-hover table-responsive-sm'>
        <thead className='table-dark'>
          <tr>
            <th><h5>Search Date</h5></th>
            <th><h5>Searched Keywords</h5></th>
            <th className='text-center'>
              <h5>Candidate Results</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          {searches.map(searchRow)}
        </tbody>
      </table>
      {(searches.length > 0) || (<div className='mt-3'><em className='text-secondary'>No results found</em></div>)}
    </div>
  )
}

export default SearchView
