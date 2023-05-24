from django.urls import path

from .views import (CandidateDetail, CandidateList, CompanyDetail, CompanyList,
                    CourseDetail, CourseList, CSkillDetail, CSkillList,
                    EducationDetail, EducationList, ExperienceDetail,
                    ExperienceList, FileDetail, FileList, LinkDetail, LinkList)

urlpatterns = [
    # Companies
    path("companies", CompanyList.as_view(), name=CompanyList.name),
    path("companies/<int:pk>", CompanyDetail.as_view(), name=CompanyDetail.name),
    # Candidates
    path("candidates", CandidateList.as_view(), name=CandidateList.name),
    path("candidates/<int:pk>", CandidateDetail.as_view(), name=CandidateDetail.name),
    # Candidate - files
    path(
        "candidates/<int:candidate>/files",
        FileList.as_view(),
        name=FileList.name,
    ),
    path(
        "candidates/<int:candidate>/files/<int:pk>",
        FileDetail.as_view(),
        name=FileDetail.name,
    ),
    # Candidate - experience
    path(
        "candidates/<int:candidate>/experience",
        ExperienceList.as_view(),
        name=ExperienceList.name,
    ),
    path(
        "candidates/<int:candidate>/experience/<int:pk>",
        ExperienceDetail.as_view(),
        name=ExperienceDetail.name,
    ),
    # Candidate - education
    path(
        "candidates/<int:candidate>/education",
        EducationList.as_view(),
        name=EducationList.name,
    ),
    path(
        "candidates/<int:candidate>/education/<int:pk>",
        EducationDetail.as_view(),
        name=EducationDetail.name,
    ),
    # Candidate - skills
    path(
        "candidates/<int:candidate>/skills",
        CSkillList.as_view(),
        name=CSkillList.name,
    ),
    path(
        "candidates/<int:candidate>/skills/<int:pk>",
        CSkillDetail.as_view(),
        name=CSkillDetail.name,
    ),
    # Candidate - courses
    path(
        "candidates/<int:candidate>/courses",
        CourseList.as_view(),
        name=CourseList.name,
    ),
    path(
        "candidates/<int:candidate>/courses/<int:pk>",
        CourseDetail.as_view(),
        name=CourseDetail.name,
    ),
    # Candidate -links
    path(
        "candidates/<int:candidate>/links",
        LinkList.as_view(),
        name=LinkList.name,
    ),
    path(
        "candidates/<int:candidate>/links/<int:pk>",
        LinkDetail.as_view(),
        name=LinkDetail.name,
    ),
]
