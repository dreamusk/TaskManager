from django.urls import path,include
from . import views
from .employee.view import urls
urlpatterns=[
    path('',views.welcome_pal,name="routes"),
    path('employee/',include(urls)),
]