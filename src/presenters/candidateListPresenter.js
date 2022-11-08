import CandidateListView from '../views/candidateListView'

const CandidateListPresenter = (props) => {
  const candidates = props.model.getCandidates()

  return (<CandidateListView candidates={candidates} />) // naming?
}

export default CandidateListPresenter
