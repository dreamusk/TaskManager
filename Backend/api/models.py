from django.db import models

# Create your models here.


class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.body[0:50]
    

class Employee(models.Model):
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    )
    
    TEAM_CHOICES = (
        ('Data_Analyst', 'Data_Analyst'),
        ('Dev_Ops', 'Dev_Ops'),
        ('Backend', 'Backend'),
        ('sales', 'Sales'),('Frontend', 'Frontend'),
        # Add more choices as needed
    )
   
    name = models.TextField(null=False, blank=False)
    designation = models.TextField(null=False, blank=False)
    age = models.IntegerField(null=False, blank=False)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=False, blank=False)
    employee_id = models.CharField(max_length=20, unique=True, null=False, blank=False)
    team = models.CharField(max_length=20, choices=TEAM_CHOICES, null=True, blank=True)
    is_admin = models.BooleanField(default=False)  # Boolean field to indicate admin status
    password = models.CharField(max_length=255, default="")# Password field
    gmail = models.EmailField(null=True, blank=True)  # Email field

    def __str__(self):
        return self.name



 
class Task(models.Model):
    TEAM_CHOICES = (
        ('Data_Analyst', 'Data_Analyst'),
        ('Dev_Ops', 'Dev_Ops'),
        ('Backend', 'Backend'),
        ('sales', 'Sales'),('Frontend', 'Frontend'),
        # Add more choices as needed
    )
    tid = models.AutoField(primary_key=True)
    task_id = models.CharField(max_length=20, unique=True, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    manager_id = models.CharField(max_length=20, null=False, blank=False)  # Not unique since a manager can manage multiple tasks
    employees = models.JSONField(null=True, blank=True)
    start_date = models.DateTimeField(null=False, blank=False)
    deadline = models.DateTimeField(null=False, blank=False)
    percentage_Completed = models.DecimalField(max_digits=5, decimal_places=2, blank=True, default=0)
    is_Completed = models.BooleanField(default=False)
    rating= models.CharField(max_length=20, null=True, blank=False)
    team = models.CharField(max_length=20, choices=TEAM_CHOICES, null=True, blank=True)
    def __str__(self):
        return self.description 
class Hours(models.Model):
    TEAM_CHOICES = (
        ('Data_Analyst', 'Data_Analyst'),
        ('Dev_Ops', 'Dev_Ops'),
        ('Backend', 'Backend'),
        ('sales', 'Sales'),('Frontend', 'Frontend'),
        # Add more choices as needed
    )
    hid = models.AutoField(primary_key=True)
    employee_id = models.CharField(max_length=20, unique=False, null=False, blank=False)
    task_id = models.CharField(max_length=20, unique=False, null=False, blank=False)
    hours = models.DecimalField(max_digits=5, decimal_places=2)
    completed_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField(null=False, blank=False)
    team = models.CharField(max_length=20, choices=TEAM_CHOICES, null=True, blank=True)
class TaskCompleted(models.Model):
    tcid=models.AutoField(primary_key=True)
    task_completed_id=models.CharField(max_length=20, unique=True, null=False, blank=False)
    task_id= models.CharField(max_length=20, unique=False, null=False, blank=False)
    employee_id = models.CharField(max_length=20, unique=False, null=False, blank=False)
    manager_id = models.CharField(max_length=20, null=False, blank=False)
    completed_date=models.DateTimeField(null=False, blank=False)
    remark= models.TextField(null=False, blank=False)
    percentage_done= models.DecimalField(max_digits=5, decimal_places=2) 
    hours_contributed= models.DecimalField(max_digits=5, decimal_places=2) 
    def __str__(self):
        return self.remark
    


class TaskRejected(models.Model):
    trcid=models.AutoField(primary_key=True)
    task_rejected_id=models.CharField(max_length=20, unique=True, null=False, blank=False)
    task_id= models.CharField(max_length=20, unique=False, null=False, blank=False)
    employee_id = models.CharField(max_length=20, unique=False, null=False, blank=False)
    manager_id = models.CharField(max_length=20, null=False, blank=False)
    rejected_date=models.DateTimeField(null=False, blank=False)
    reason= models.TextField(null=False, blank=False)
    hours_contributed=models.DecimalField(max_digits=5, decimal_places=2) 
    def __str__(self):
        return self.remark



