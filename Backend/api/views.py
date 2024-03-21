from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Task,Employee,TaskCompleted,TaskRejected
from .serializers import TasksSerializer,TaskCompletedSerializer
# Create your views here.



@api_view(['POST'])
def welcome_pal(request):
    return Response("Hii Buddy")



######################### Task##################################
@api_view(['POST'])#Adding the task
def taskAdd(request):
    data=request.data
    print('task.koofd')
    task=Task.objects.create(
        
        task_id=data['task_id'],
        team=data['team'],
        description=data['description'],
        manager_id=data['manager_id'],
        employees=data['employees'],
        start_date=data['start_date'],
        deadline=data['deadline'],
        percentage_Completed=data['percentage_Completed']
    )
    return Response({"message": "Task Added"}, status=status.HTTP_201_CREATED)
#Getting the task based on Employee Id
@api_view(['GET'])
def getTaskByEid(request, eId):
    try:
        # Filter the tasks based on employee_id
        filtered_tasks = []
        tasks = Task.objects.all()  # Assuming Task is the model representing tasks
        for task in tasks:
            for employee in task.employees:
                if employee['employee_id'] == eId:
                    filtered_tasks.append(task)
                    break  # Once found, break the inner loop

        # Serialize the filtered tasks
        serializer = TasksSerializer(filtered_tasks, many=True)
        return Response(serializer.data)
    except Task.DoesNotExist:
        return Response(status=404)
#task Upadte of employee completed
@api_view(['PUT'])
def taskUpdate(request, tId):
    try:
        # Filter the task based on task_id
        task = Task.objects.get(task_id=tId)

        # Extract data from request
        data = request.data
        eId = data['eId']
        isComplete = data['isComplete']
        isRejected = data['isRejected']

        # Update isComplete, isRejected, and remark for the employee with eId
        for employee in task.employees:
            if employee['employee_id'] == eId:
                employee['isComplete'] = isComplete
                employee['isRejected'] = isRejected
                employee['remark'] = data.get('remark', '')  # Add remark if provided

        # Save the updated task
        task.save()

        # Serialize and return the updated task data
        serializer = TasksSerializer(task)
        return Response(serializer.data)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
######################### Task Completed##################################
@api_view(['POST'])
def taskCompleted(request):
    data=request.data
    task_completed = TaskCompleted.objects.create(
    tcid=data['tcid'],
    task_completed_id=data['task_completed_id'],
    task_id=data['task_id'],
    employee_id=data['employee_id'],
    manager_id=data['manager_id'],
    completed_date=data['completed_date'],
    remark=data['remark'],
    percentage_done=data['percentage_done'],
    hours_contributed=data['hours_contributed']
    )
    return Response({"message": "Task Completed"}, status=status.HTTP_201_CREATED)
@api_view(['GET'])
def taskCompletedGet(request,eId):
    try:
        # Filter the tasks based on employee_id
        filtered_tasks = TaskCompleted.objects.filter(employee_id=eId)

        # Serialize the filtered tasks
        serializer = TaskCompletedSerializer(filtered_tasks, many=True)
        print(serializer.data)
        return Response(serializer.data)
    except TaskCompleted.DoesNotExist:
        return Response(status=404)
######################### Task Rejected##################################
@api_view(['POST'])
def taskRejected(request):
    data=request.data
    trcid=data['trcid'],
    task_rejected_id=data['task_rejected_id'],
    task_id=data['task_id'],
    employee_id=data['employee_id'],
    manager_id=data['manager_id'],
    rejected_date=data['rejected_date'],
    reason=data['reason'],
    hours_contributed=data['hours_contributed']
    return Response({"message": "Task Added"}, status=status.HTTP_201_CREATED)