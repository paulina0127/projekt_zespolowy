// export const companyProfileDetails = id => async dispatch => {
//   try {
//     dispatch({type: COMPANY_PROFILE_REQUEST})

//     const { data } = await axios.get(`/companies/${id}`)

//     dispatch({
//       type: COMPANY_PROFILE_SUCCESS,
//       payload: data
//     })

//   } catch (error) {
//     dispatch({
//       type:COMPANY_PROFILE_FAIL,
//       payload:error.response && error.response.data.detail
//       ? error.response.data.detail
//       : error.message,
//     })
//   }
// }

