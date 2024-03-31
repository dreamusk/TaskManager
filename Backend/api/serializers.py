from rest_framework.serializers import ModelSerializer
from . models import Employee,TaskCompleted,Task,TaskRejected,Hours

class EmployeeSerializer(ModelSerializer):
    class Meta:
        model=Employee
        fields='__all__'
class TasksSerializer(ModelSerializer):
    class Meta:
        model=Task
        fields='__all__'

class TaskCompletedSerializer(ModelSerializer):
    class Meta:
        model=TaskCompleted
        fields='__all__'

class HoursSerializer(ModelSerializer):
    class Meta:
        model=Hours
        fields='__all__'