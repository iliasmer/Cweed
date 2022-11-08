import SearchResultsView from '../views/searchResultsView'
import { Navigate, useParams } from 'react-router-dom'

const SearchResultsPresenter = (props) => {
  const getById = (id) => {
    return props.model.getCandidate(id)
  }

  const { id } = useParams()
  const search = props.model.getSearch(id)

  // search not found, redirect either to list or page not found
  if (!search) {
    // for now redirecting to 404 page, might be nice to display list (with warning)
    return <Navigate to='/search-not-found' />
  }

  return (<SearchResultsView search={search} getById={getById} />)
}

export default SearchResultsPresenter
