from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.mail import send_mail
from .models import Project, Document, Enquiry
from .serializers import ProjectSerializer, DocumentSerializer, EnquirySerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-completion_date')
    serializer_class = ProjectSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        service_type = self.request.query_params.get('service_type')
        if service_type:
            queryset = queryset.filter(service_type=service_type)
        return queryset

class ClientProjectViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(client=self.request.user).order_by('-completion_date')

class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        if self.request.user.is_staff:
            return Document.objects.all()
        return Document.objects.filter(project__client=self.request.user)

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user, is_report=self.request.user.is_staff)

class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all().order_by('-created_at')
    serializer_class = EnquirySerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        enquiry = serializer.save()
        send_mail(
            subject=f"Confirmation: Enquiry Received - {enquiry.get_service_required_display()}",
            message=f"Dear {enquiry.full_name},\n\nThank you for reaching out to Allied Engineers. We have received your enquiry regarding {enquiry.get_service_required_display()}.\n\nOur team will review your project details and get back to you shortly.\n\nBest regards,\nAllied Engineers Team",
            from_email="no-reply@alliedengineers.com",
            recipient_list=[enquiry.email],
            fail_silently=True,
        )
