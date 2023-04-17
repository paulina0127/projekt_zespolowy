from django.urls import path
from .views import CompanyProfile, CandidateProfile, CompanyList, CompanyDetail, CreateCandidateProfile, CreateCompanyProfile

urlpatterns = [
    # Company profile
    path('auth/users/<int:pk>/company_profile', CompanyProfile.as_view(), name=CompanyProfile.name),
    path('auth/users/<int:pk>/company_profile/create', CreateCompanyProfile.as_view(), name=CreateCompanyProfile.name),
    # Candidate profile
    path('auth/users/<int:pk>/candidate_profile', CandidateProfile.as_view(), name=CandidateProfile.name),
    path('auth/users/<int:pk>/candidate_profile/create', CreateCandidateProfile.as_view(), name=CreateCandidateProfile.name),
    # Companies
    path('companies', CompanyList.as_view(), name=CompanyList.name),
    path('companies/<int:pk>', CompanyDetail.as_view(), name=CompanyDetail.name),
]
