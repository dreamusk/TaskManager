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
    path('task/teamBarGraph/<str:eId>/',views.getTeamPerformance,name="graph got"),
    path('task/getTaskOfEmployeeTeamAndEid/<str:eId>/',views.getTaskOfEmployeeTeamAndEid,name="graph got"),
    path('task/updateTaskOfEmployeeReview/<str:eId>/',views.taskReviewUpdate,name="Review Updated"),
    path('task/TaskUpdateByEmployee/<str:eId>/',views.taskDoneBYEmployeeUpdate,name="Review Updated"),
    path('task/updateByManager/',views.taskUpdateByManager,name="Review Updated"),
    path('task/completed/',views.taskCompleted,name="task Completed"),
    path('task/rejected/',views.taskRejected,name="task Rejected"),
    path('task/update/<str:tId>/',views.taskUpdate,name="task Updated"),
    path('hours/add/',views.hoursAdd,name="task Updated"),
    path('hours/getById/<str:eId>/',views.hoursGet,name="task Updated"),
    path('task/deleteByManager/<str:task_id>/',views.task_delete_by_manager,name="task Updated"),
    path('task/employeeReviewEmployeeDetailEditByManager/<str:task_id>/',views.employeeReviewEmployeeDetailEditByManager,name="task Updated"),
    path('task/removeEmployeeFromTask/<str:task_id>/',views.removeEmployeeFromTask,name="Employee Removed"),

]
