import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import ActivateScreen from "./screens/Auth/ActivateScreen";
import ResetPassword from "./screens/Auth/ResetPassword";
import ResetPasswordConfirm from "./screens/Auth/ResetPasswordConfirm";

import Layout from './hocs/Layout';

const App = () => {
  return (
  <BrowserRouter>
    <Layout>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/login" element={<LoginScreen/>} exact />
          <Route path="/rejestracja" element={<SignUpScreen/>} exact />
          <Route path="/reset-password" element={<ResetPassword />} exact />
          <Route path="/password/reset/confirm/:iud/:token" element={<ResetPasswordConfirm />} exact />
          <Route path="/activate/:uid/:token" element={<ActivateScreen/>} exact />
        </Routes>
      </main>
    </Layout>
  </BrowserRouter>
  );
};

export default App;
