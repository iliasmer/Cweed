import { useState } from 'react'

const ScannerForm = (props) => {
  const [query, setQuery] = useState('')

  // the example shows comma separated terms, we split on both spaces
  // AND commas just to be safe
  const handleSubmit = (e) => {
    e.preventDefault() // avoid submission
    props.onSearch(query.split(/[, ]+/))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='row justify-content-center'>
        <div className='form-group col-md-8'>
          <label className='form-label text-muted' htmlFor='q'><h4>Enter role specific keywords</h4></label>
          <div className='inputContainer'>
            <img className='keywordInputIcon' src='../search.png' />
            <input
              className='form-control form-control-lg'
              required
              id='query'
              onChange={({ target }) => setQuery(target.value)}
              value={query}
              type='text'
              name='name'
              placeholder='Developer, Teamwork, Leadership...'
            />
          </div>
          <div className='form-text'>Enter one or more comma or space separated words.</div>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='mt-3 form-group col-md-8'>
          <button type='submit' className='btn btn-lg btn-dark'>Search</button>
        </div>
      </div>
    </form>
  )
}

export default ScannerForm
