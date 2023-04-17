from rest_framework import generics, permissions
from ..models import (Candidate, Company, Course, CSkill, Education, Experience,
                      File, Link)
from ..utils.serializers import CompanyProfileSerializer, CompanySerializer, CandidateProfileSerializer, CandidateSerializer, FileSerializer, ExperienceSerializer, EducationSerializer, CSkillSerializer, CourseSerializer, LinkSerializer
from ..utils.filters import CompanyFilter
from apps.core.utils.permissions import IsCompany, IsCompanyOwner, IsCandidate
