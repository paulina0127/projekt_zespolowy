import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import ActivateAccountScreen from "./screens/Auth/ActivateAccountScreen";
import ResetPassword from "./screens/Auth/ResetPassword";
import ResetPasswordConfirm from "./screens/Auth/ResetPasswordConfirm";
import OffersScreen from "./screens/OffersScreen";
import OfferDetailsScreen from "./screens/OfferDetailsScreen";
import MainPanelScreen from "./screens/MainPanelScreen";

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
        <Route path="/oferty/:filters?" element={<OffersScreen />}/>
        <Route path="/oferta/:id" element={<OfferDetailsScreen />}/>
        <Route path="/user-panel" element={<MainPanelScreen />}>
          <Route path="konto" element={<MainPanelScreen />} />
          <Route path="profil" element={<MainPanelScreen />} />
          <Route path="moje-aplikacje" element={<MainPanelScreen />} />
          <Route path="moje-oferty" element={<MainPanelScreen />} />
          <Route path="dokumenty" element={<MainPanelScreen />} />
          <Route path="aplikacje" element={<MainPanelScreen />} />
          <Route path="konwersacje" element={<MainPanelScreen />} />
          </Route>
      </Routes>
    </Layout>
  </BrowserRouter>
  );
};

export default App;
