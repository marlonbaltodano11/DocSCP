"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from apps.plan_extractor.views import ParseLessonPlanView
from apps.data_formatter.views import ProcessLessonPlanView
from apps.syllabus_generator.views import ExportSyllabusView

urlpatterns = [
    # Parse lesson plan
    path('api/v1/lesson-plans/parse', ParseLessonPlanView.as_view(), name='parse_lesson_plan'),

    # Process lesson plan
    path('api/v1/lesson-plans/process', ProcessLessonPlanView.as_view(), name='process_lesson_plan'),

    # Export syllabus
    path('api/v1/syllabus/export', ExportSyllabusView.as_view(), name='export_syllabus'),
]
