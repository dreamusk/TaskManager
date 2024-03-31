from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from ... models import Employee
from django.contrib.auth.hashers import make_password,check_password
from .. serializers import EmployeeSerializer
@api_view(['GET'])
def hell_yeah(request):
    return Response("Bring it Son")

#Register
@api_view(['POST'])
def newEmployee(request):
    data=request.data
    eid=data[id]
    temp=Employee.objects.get(id=eid)
    if(temp):
        return Response('User Exist')
    


@api_view(['POST'])
def register_employee(request):
    # Extract data from request
    print("hererer")
    data = request.data
    name = data['name']
    gmail = data['gmail']
    password = data['password']
    age = data['age']
    gender = data['gender']
    designation = data['designation']
    employee_id = data['employee_id']
    team = data['team']
    is_admin = data['is_admin']
   

    # Check if all required fields are provided
    if not all([name, password, age, gender, designation, employee_id]):
        return Response({"error": "Please add all the required fields"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Check if an employee with the provided email or username already exists
    if Employee.objects.filter(gmail=gmail).exists() or Employee.objects.filter(employee_id=employee_id).exists():
        return Response({"error": "Employee already exists with that email or username"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Hash the password
    # hashed_password = make_password(password)

    # Create and save the employee
    employee = Employee.objects.create(
        name=name,
        password=password,
        age=age,
        gender=gender,
        designation=designation,
        employee_id=employee_id,
        team=team,
        is_admin=is_admin,
        gmail=gmail
    )

    return Response({"message": "Registered successfully"}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def employeeLogin(request):
    data=request.data
    print(data)
    password=data['password']
    eid=data['employee_id']
    # Check if all required fields are provided
    if not all([ password,eid]):
        return Response({"error": "Please add all the required fields"}, status=status.HTTP_401_UNAUTHORIZED)
    
    tempE=Employee.objects.get(employee_id=eid)
    if tempE is None:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
    # if check_password(password, tempE.password):
    #      return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
    if(password==tempE.password):
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def getEmployeeByEid(request,eid):
    employee=Employee.objects.get(employee_id=eid)
    serialzer=EmployeeSerializer(employee,many=False)
    return Response(serialzer.data);





















@api_view(['POST'])#CREATING EMPLOYEE
def addEmployee(request):
    print("here")
    data = request.data
    # Ensure all required keys are present in the data dictionary
    required_keys = ['name', 'designation', 'age', 'gender', 'employee_id', 'team', 'is_admin']
    for key in required_keys:
        if key not in data:
            return Response({"error": f"{key} is required"}, status=400)

    # Create a new User object
    employee = Employee.objects.create(
        name=data['name'],
        designation=data['designation'],
        age=data['age'],
        gender=data['gender'],
        employee_id=data['employee_id'],
        team=data['team'],
        is_admin=data['is_admin']
    )

    # Serialize the created User object
    serializer = EmployeeSerializer(employee, many=False)

    # Return the serialized data in the response
    return Response(serializer.data)

@api_view(['GET'])#GETTING EMPLOYEE
def getAllEmployee(requets):
    employees=Employee.objects.all()
    serializer = EmployeeSerializer(employees, many=True)
    return Response(serializer.data)

@api_view(['GET'])#GETTING EMPLOYEE BY ID
def getEmployeeById(request,eid):
    employee=Employee.objects.get(id=eid)
    serializer = EmployeeSerializer(employee, many=False)
    return Response(serializer.data)

@api_view(['PUT'])#UPDATING EMPLOYEE 
def updateEmployee(request,eid):
    data = request.data
    employee = Employee.objects.get(id=eid)
    serializer = EmployeeSerializer(instance=employee, data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])#Deleting EMPLOYEE 
def deleteEmployee(request,eid):
    employee=Employee.objects.get(id=eid)
    employee.delete()
    return Response('Employee Details is being Deleted')
    