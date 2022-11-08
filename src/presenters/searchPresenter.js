import SearchView from '../views/searchView'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import SimpleSpinner from '../components/SimpleSpinner'

const SearchPresenter = (props) => {
  const navigate = useNavigate()
  const [searching, setSearching] = useState(false)

  const searches = props.model.getSearches()
  const handleSearch = (terms) => {
    setSearching(true)
    props.model.doSearch(terms)
      .then((id) => navigate(`/search/${id}`))
  }

  return (searching ? <SimpleSpinner /> : <SearchView searches={searches} handleSearch={handleSearch} />)
}

export default SearchPresenter
