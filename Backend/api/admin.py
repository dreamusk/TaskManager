from django.contrib import admin

# Register your models here.
from .models import Note,Employee,Task,TaskCompleted
admin.site.register(Note)
admin.site.register(Employee)
admin.site.register(Task)
admin.site.register(TaskCompleted)