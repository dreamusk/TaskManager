from django.urls import path,include
from . import views
from .employee.view import urls
urlpatterns=[
    path('',views.welcome_pal,name="routes"),
    path('employee/',include(urls)),
    path('task/add/',views.taskAdd,name="task Added"),
    path('task/getByEid/<str:eId>/',views.getTaskByEid,name="task got"),
    path('task/getByMid/<str:eId>/',views.getTaskByMid,name="task Manger got"),
    path('task/getByMidCompleted/<str:eId>/',views.getTaskByMidCompleted,name="task got"),
    path('task/getByMidReview/<str:eId>/',views.getTaskByMidReview,name="task got"),
    path('task/completed/',views.taskCompleted,name="task Completed"),
    path('task/rejected/',views.taskRejected,name="task Rejected"),
    path('task/update/<str:tId>/',views.taskUpdate,name="task Updated"),

]
