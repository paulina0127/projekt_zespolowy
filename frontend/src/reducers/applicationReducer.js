import { 
  APPLICATION_LIST_REQUEST,
  APPLICATION_LIST_SUCCESS,
  APPLICATION_LIST_FAIL,
  APPLICATION_LIST_CLEAR
} from '../constants/applicationConst'

export const applicationReducer = (state = {applications:[]}, action) => {
  switch(action.type) {
    case APPLICATION_LIST_REQUEST:
      return {loading:true, applications:[]}
    case APPLICATION_LIST_SUCCESS:
      return {loading:false, applications: action.payload}
    case APPLICATION_LIST_FAIL:
      return {loading:false, error: action.payload} 
    case APPLICATION_LIST_CLEAR:
      return { applications: [] }
    default:
      return state     
  }
}