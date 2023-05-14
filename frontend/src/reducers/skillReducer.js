import { 
  SKILL_LIST_REQUEST,
  SKILL_LIST_SUCCESS,
  SKILL_LIST_FAIL,
  SKILL_LIST_CLEAR
} from '../constants/skillConst'

export const skillListReducer = (state = {skills:[]}, action) => {
  switch(action.type) {
    case SKILL_LIST_REQUEST:
      return {loading:true, skills:[]}
    case SKILL_LIST_SUCCESS:
      return {loading:false, skills: action.payload}
    case SKILL_LIST_FAIL:
      return {loading:false, error: action.payload} 
    case SKILL_LIST_CLEAR:
      return { skills: [] }
    default:
      return state     
  }
}