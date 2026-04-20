from django.contrib import admin
from .models import Project, Document, Enquiry

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'client_name', 'service_type', 'completion_date')
    list_filter = ('service_type', 'completion_date')

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('file_name', 'project', 'uploaded_by', 'is_report', 'created_at')
    list_filter = ('is_report', 'created_at')

@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'company', 'service_required', 'created_at')
    list_filter = ('service_required', 'created_at')
