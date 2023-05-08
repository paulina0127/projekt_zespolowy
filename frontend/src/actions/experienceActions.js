

export const createExperience = (id, values) => async dispatch => {
  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'))
    const token = userTokens.access
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
        'Accept': 'application/json'
      }
    }
    try {
      dispatch({type: OFFER_CREATE_REQUEST})

      const body = JSON.stringify({
        position: values.position,
        company: values.company,
        location: {
          street_address: values.location.street_address,
          postal_code: values.location.postal_code,
          city: values.location.city
        },
        start_date: values.start_date,
        end_date: values.end_date,
        duties: values.duties.filter((duty) => duty !== ''),
        is_current: values.is_current,
        references: values.references
      })

      const { data } = await axios.post(`/candidates/${id}/experience`, body, config)
      dispatch({
          type: OFFER_CREATE_SUCCESS,
          payload: data,
      })

    } catch (error) {
      dispatch({
        type: OFFER_CREATE_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  } else {
    dispatch({
      type: OFFER_CREATE_FAIL
    })
  }
}