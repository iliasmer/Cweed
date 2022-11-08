import CreateView from '../views/createView'
import { useNavigate } from 'react-router-dom'

const CreatePresenter = (props) => {
  const navigate = useNavigate()
  const handleUpload = (candidate) => {
    const id = props.model.addCandidate({ candidate })
    navigate(`/candidate/${id}`, { state: { isCreated: true } })
  }

  return (<CreateView handleUpload={handleUpload} />)
}

export default CreatePresenter
