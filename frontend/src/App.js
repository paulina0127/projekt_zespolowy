import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import SignUpScreen from './screens/Auth/SignUpScreen';
import ActivateAccountScreen from './screens/Auth/ActivateAccountScreen';
import ResetPassword from './screens/Auth/ResetPassword';
import ResetPasswordConfirm from './screens/Auth/ResetPasswordConfirm';
import OffersScreen from './screens/OffersScreen';
import OfferDetailsScreen from './screens/OfferDetailsScreen';
import AccountManagement from './components/AccountManagement'
import Attachement from './components/Attachement'
import CompanyOffers from './components/CompanyOffers'
import CompanyProfile from './components/CompanyProfile'
import CandidateProfile from './components/CandidateProfile'
import ReceivedApplication from './components/ReceivedApplication'

import Layout from './hocs/Layout';

const App = () => {
  return (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path='/' element={<HomeScreen />} exact />
        <Route path='/logowanie' element={<LoginScreen/>} />
        <Route path='/rejestracja' element={<SignUpScreen/>} />
        <Route path='/przypominanie-hasła' element={<ResetPassword />}  />
        <Route path='/resetowanie-hasła/:uid/:token' element={<ResetPasswordConfirm />} />
        <Route path='/aktywacja-konta/:uid/:token' element={<ActivateAccountScreen/>} />
        <Route path='/oferty/:filters?' element={<OffersScreen />}/>
        <Route path='/oferta/:id' element={<OfferDetailsScreen />}/>
        <Route path='/user-panel/konto' element={<AccountManagement />} />
        <Route path='/user-panel/profil-pracodawcy' element={<CompanyProfile />} />
        <Route path='/user-panel/profil-kandydata' element={<CandidateProfile />} />
        {/* <Route path='moje-aplikacje' element={<MyApplications />} /> */}
        <Route path='/user-panel/moje-oferty' element={<CompanyOffers />} />
        <Route path='/user-panel/dokumenty' element={<Attachement />} />
        <Route path='/user-panel/aplikacje' element={<ReceivedApplication />} />
        {/* <Route path='konwersacje' element={<Conversations />} /> */}
      </Routes>
    </Layout>
  </BrowserRouter>
  );
};

export default App;
