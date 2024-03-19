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
        ('engineering', 'Engineering'),
        ('design', 'Design'),
        ('marketing', 'Marketing'),
        ('sales', 'Sales'),
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
