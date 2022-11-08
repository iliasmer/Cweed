import CandidateView from '../views/candidateView'
import { Navigate, useLocation, useParams } from 'react-router-dom'

const CandidatePresenter = (props) => {
  const { id } = useParams()
  const candidate = props.model.getCandidate(id)
  const location = useLocation()

  if (!candidate) {
    // for now redirecting to 404 page, might be nice to display list (with warning)
    return <Navigate to='/candidate-not-found' />
  }

  return (<CandidateView candidate={candidate} isCreated={location.state?.isCreated} />)
}

export default CandidatePresenter
