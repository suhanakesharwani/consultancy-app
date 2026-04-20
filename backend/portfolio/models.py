from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    SERVICE_CHOICES = [
        ('topological', 'Topological Surveying'),
        ('geotechnical', 'Geotechnical Investigation'),
        ('structural', 'Structural Design'),
    ]

    title = models.CharField(max_length=200)
    client = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='projects')
    client_name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    service_type = models.CharField(max_length=50, choices=SERVICE_CHOICES)
    description = models.TextField()
    completion_date = models.DateField()
    
    # Images (up to 4)
    image_1 = models.ImageField(upload_to='projects/', blank=True, null=True)
    image_2 = models.ImageField(upload_to='projects/', blank=True, null=True)
    image_3 = models.ImageField(upload_to='projects/', blank=True, null=True)
    image_4 = models.ImageField(upload_to='projects/', blank=True, null=True)

    def __str__(self):
        return self.title

class Document(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='documents')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(upload_to='documents/')
    file_name = models.CharField(max_length=255)
    is_report = models.BooleanField(default=False, help_text="True if uploaded by admin as a report, False if client site document")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.file_name

class Enquiry(models.Model):
    SERVICE_CHOICES = [
        ('topological', 'Topological Surveying'),
        ('geotechnical', 'Geotechnical Investigation'),
        ('structural', 'Structural Design'),
        ('multiple', 'Multiple Services / General'),
    ]

    full_name = models.CharField(max_length=100)
    company = models.CharField(max_length=100, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    service_required = models.CharField(max_length=50, choices=SERVICE_CHOICES)
    project_location = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    attachment = models.FileField(upload_to='enquiries/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.service_required}"
