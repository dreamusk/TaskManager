from django.urls import path,include
from . import views
urlpatterns=[
    path('',views.hell_yeah,name="routes"),
    path('register/',views.register_employee,name="register"),
    path('login/',views.employeeLogin,name="Login"),
    path('eid/<str:eid>/',views.getEmployeeByEid,name="Auth"),
]