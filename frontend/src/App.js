import { BrowserRouter, Routes, Route } from 'react-router-dom'

import {
  CompaniesScreen,
  CompanyDetailsScreen,
  ActivateAccountScreen,
  HomeScreen,
  LoginScreen,
  OfferDetailsScreen,
  OffersScreen,
  ResetPassword,
  ResetPasswordConfirm,
  SignUpScreen,
} from './screens'
import { AccountManagement } from './components/accountSettings'
import {
  Attachement,
  CandidateCourse,
  CandidateProfile,
  CandidateEducation,
  CandidateExperience,
  CandidateLinks,
  CandidateApplications,
  CandidateSkill,
} from './components/candidate'
import {
  CompanyOffers,
  CompanyProfile,
  ReceivedApplication,
} from './components/company'
import Layout from './hocs/Layout'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<HomeScreen />} exact />
          <Route path='/logowanie' element={<LoginScreen />} />
          <Route path='/rejestracja' element={<SignUpScreen />} />
          <Route path='/przypominanie-hasła' element={<ResetPassword />} />
          <Route
            path='/resetowanie-hasła/:uid/:token'
            element={<ResetPasswordConfirm />}
          />
          <Route
            path='/aktywacja-konta/:uid/:token'
            element={<ActivateAccountScreen />}
          />
          <Route path='/oferty/:filters?' element={<OffersScreen />} />
          <Route path='/oferta/:id' element={<OfferDetailsScreen />} />
          <Route path='/pracodawcy' element={<CompaniesScreen />} />
          <Route path='/pracodawca/:id' element={<CompanyDetailsScreen />} />

          <Route path='/user-panel/konto' element={<AccountManagement />} />
          <Route
            path='/user-panel/profil-pracodawcy'
            element={<CompanyProfile />}
          />

          <Route
            path='/user-panel/dane-osobowe'
            element={<CandidateProfile />}
          />
          <Route
            path='/user-panel/doświadczenie'
            element={<CandidateExperience />}
          />
          <Route
            path='/user-panel/wykształcenie'
            element={<CandidateEducation />}
          />
          <Route path='/user-panel/umiejętności' element={<CandidateSkill />} />
          <Route path='/user-panel/kursy' element={<CandidateCourse />} />
          <Route path='/user-panel/linki' element={<CandidateLinks />} />

          <Route path='/user-panel/moje-oferty' element={<CompanyOffers />} />
          <Route path='/user-panel/dokumenty' element={<Attachement />} />
          <Route
            path='/user-panel/aplikacje'
            element={<ReceivedApplication />}
          />
          <Route
            path='/user-panel/moje-aplikacje'
            element={<CandidateApplications />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
