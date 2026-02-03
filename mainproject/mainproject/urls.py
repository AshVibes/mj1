"""
URL configuration for mainproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('interviews/', views.interviews, name='interviews'),
    path('interview/<int:interview_id>/', views.interview_session, name='interview_session'),
    path('candidates/', views.candidates, name='candidates'),
    path('questions/', views.questions, name='questions'),
]
