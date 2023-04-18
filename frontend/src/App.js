import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import ActivateAccountScreen from "./screens/Auth/ActivateAccountScreen";
import ResetPassword from "./screens/Auth/ResetPassword";
import ResetPasswordConfirm from "./screens/Auth/ResetPasswordConfirm";
import OfferScreen from "./screens/OfferScreen";

import Layout from './hocs/Layout';

const App = () => {
  return (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/logowanie" element={<LoginScreen/>} />
        <Route path="/rejestracja" element={<SignUpScreen/>} />
        <Route path="/przypominanie-hasła" element={<ResetPassword />}  />
        <Route path="/resetowanie-hasła/:uid/:token" element={<ResetPasswordConfirm />} />
        <Route path="/aktywacja-konta/:uid/:token" element={<ActivateAccountScreen/>} />
        <Route path="/oferta/:id" element={<OfferScreen />}/>
      </Routes>
    </Layout>
  </BrowserRouter>
  );
};

export default App;
