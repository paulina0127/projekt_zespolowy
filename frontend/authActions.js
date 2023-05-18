import axios from 'axios'

const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem('jwt'));
  return {
    Authorization: `Bearer ${token}`,
  }
}

export const fetchUser = async (updateContextUser) => {
  const config = { headers: getAuthHeaders() }
  try {
    const response = await axios.get(
      'http://127.0.0.1:5000/authentication/display',
      config
    )
    const userData = response.data;
    // Zaktualizowanie użytkownika 
    updateContextUser(userData);
  } catch (error) {
    console.error('Błąd podczas pobierania użytkownika:', error);
  }
}

export const login = async (e_mail, password, toggleAuth, AuthContext) => {
  const data = { e_mail, password }
  try {
    const response = await axios.post(
      'http://127.0.0.1:5000/authentication/sign_in',
      data
    )
    console.log(response);
    if (response.status === 200) {
      const { access_token } = response.data
      localStorage.setItem('jwt', JSON.stringify(access_token));
      toggleAuth()
      fetchUser(AuthContext.updateContextUser)   
    }
  } catch (error) {
    alert('Nieprawidłowy email lub hasło')
  }
}

