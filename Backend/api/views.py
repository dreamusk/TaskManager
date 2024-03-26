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
    tempTask=Task.objects.filter(task_id=data['task_id']).first()
    if(tempTask):
        for i in tempTask.employees:
            if(i['employee_id']==data['employees'][0]['employee_id']):
                message={"status":202}
                return Response(message)
        tempTask.employees.extend(data['employees'])
        tempTask.save()
        # tempTask.employees.extend(data['employees'])
        return Response({"message": "Task Added"}, status=status.HTTP_201_CREATED)
    else:
        Task.objects.create(
        task_id=data['task_id'],
        description=data['description'],
        employees=data['employees'],
        manager_id=data['manager_id'],
        start_date=data['start_date'],
        deadline=data['deadline'],
        team=data['team']
        
      )
    return Response({"message": "Task Added"}, status=status.HTTP_201_CREATED)
#Getting the task based on Employee Id
@api_view(['GET'])
def getTaskByEid(request, eId):
    try:
        # Retrieve tasks associated with the employee ID
        print(eId)
        tasks = Task.objects.all()
        tempTasks=[]
        for i in tasks:
            for j in i.employees:
                if(j['employee_id']==eId):
                    tempTasks.append(i)
        tasks=tempTasks
        print(tasks)
        # Serialize the tasks
        serializer = TasksSerializer(tasks, many=True)
        print(serializer.data)
        return Response(serializer.data)
    
    except Task.DoesNotExist:
        return Response(status=404)
@api_view(['GET'])
def getTaskByMid(request, eId):
    try:
        # Retrieve tasks associated with the employee ID
        print(eId)
        tasks = Task.objects.filter(manager_id=eId)
        # print(tasks)
        # Serialize the tasks
        serializer = TasksSerializer(tasks, many=True)
        print(serializer.data)
        return Response(serializer.data)
    
    except Task.DoesNotExist:
        return Response(status=404)
@api_view(['GET'])
def getTaskByMidCompleted(request, eId):
    try:
        # Retrieve tasks associated with the employee ID
        print(eId)
        tasks = Task.objects.filter(manager_id=eId, is_Completed=True)

        # print(tasks)
        # Serialize the tasks
        serializer = TasksSerializer(tasks, many=True)
        print(serializer.data)
        return Response(serializer.data)
    
    except Task.DoesNotExist:
        return Response(status=404)
    
@api_view(['GET'])
def getTaskByMidReview(request, eId):
    try:
        # Retrieve tasks associated with the employee ID
        print(eId)
        tasks = Task.objects.filter(manager_id=eId, is_Completed=False)

        # print(tasks)
        # Serialize the tasks
        serializer = TasksSerializer(tasks, many=True)
        print(serializer.data)
        return Response(serializer.data)
    
    except Task.DoesNotExist:
        return Response(status=404)
@api_view(['GET'])
def getTeamPerformance(request, eId):
    try:
        # Retrieve tasks associated with the employee ID
        print(eId)
        tasks = Task.objects.filter(manager_id=eId)
        frontendC=0
        frontendT=0
        backendC=0
        backendT=0
        Data_AnalystC=0
        Data_AnalystT=0
        Dev_OpsC=0
        Dev_OpsT=0
        salesC=0
        salesT=0
        for i in tasks:
            if(i.team=="Frontend"):
                if(i.is_Completed):
                    frontendC+=1
                print("ji")
                frontendT+=1
            if(i.team=="Backend"):
                if(i.is_Completed):
                    backendC+=1
                backendT+=1
            if(i.team=="Data_Analyst"):
                if(i.is_Completed):
                    Data_AnalystC+=1
                Data_AnalystT+=1
            if(i.team=="Dev_Ops"):
                if(i.is_Completed):
                    Dev_OpsC+=1
                Dev_OpsT+=1
            if(i.team=="Sales"):
                if(i.is_Completed):
                    salesC+=1
                salesT+=1
        data = [
               {'team': 'frontend', 'completed': frontendC, 'total': frontendT},
               {'team': 'backend', 'completed': backendC, 'total': backendT},
               {'team': 'Data Analyst', 'completed': Data_AnalystC, 'total': Data_AnalystT},
               {'team': 'Dev_Ops', 'completed': Dev_OpsC, 'total': Dev_OpsT},
               {'team': 'sales', 'completed': salesC, 'total': salesT},
    ]
        return Response(data)
    except Task.DoesNotExist:
        return Response(status=404)
@api_view(['Post'])
def getTaskOfEmployeeTeamAndEid(request,eId):
    try:
        Id=request.data['id']
        team=request.data['team']
        print(Id)
        tasks = Task.objects.filter(manager_id=eId,team=team)
        taskC=0
        taskT=0
        for i in tasks:
            for j in i.employees:
                if(j['employee_id']==Id):
                    if(j['isComplete']=='1'):
                        taskC+=1
                    taskT+=1
        data = [
               {'EmployeeId': Id,  'completed': taskC, 'total': taskT}
        ]
        
        return Response(data)
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