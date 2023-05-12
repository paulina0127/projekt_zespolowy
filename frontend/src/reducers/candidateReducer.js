import { 
  CANDIDATE_COMPONENT_REQUEST,
  CANDIDATE_COMPONENT_SUCCESS,
  CANDIDATE_COMPONENT_FAIL,
  CANDIDATE_COMPONENT_RESET,
} from '../constants/candidateConst'

export const candidateReducer = (state = {}, action) => {
  switch (action.type) {
    case CANDIDATE_COMPONENT_REQUEST:
      return { loading: true }
    case CANDIDATE_COMPONENT_SUCCESS:
      return { loading: false, success: true }
    case CANDIDATE_COMPONENT_FAIL:
      return { loading: false, error: action.payload }
    case CANDIDATE_COMPONENT_RESET:
      return {}
    default:
      return state
  }
}