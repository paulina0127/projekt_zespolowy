from django.urls import path

from .views import (ApiRoot, CategoryDetail, CategoryList,
                    SkillDetail, SkillList)

urlpatterns = [
    path('', ApiRoot.as_view(), name=ApiRoot.name),
    # Skills
    path('skills', SkillList.as_view(), name=SkillList.name),
    path('skills/<int:pk>', SkillDetail.as_view(), name=SkillDetail.name),
    # Categories
    path('categories', CategoryList.as_view(), name=CategoryList.name),
    path('categories/<int:pk>',
         CategoryDetail.as_view(),
         name=CategoryDetail.name),

]
