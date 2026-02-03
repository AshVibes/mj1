from django.shortcuts import render
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET"])
def home(request):
    """Home page view"""
    return render(request, 'home.html')


@require_http_methods(["GET"])
def interviews(request):
    """Interviews list view"""
    return render(request, 'interviews.html')


@require_http_methods(["GET"])
def interview_session(request):
    """Interview session view"""
    return render(request, 'interview_session.html')


@require_http_methods(["GET"])
def candidates(request):
    """Candidates list view"""
    return render(request, 'candidates.html')


@require_http_methods(["GET"])
def questions(request):
    """Questions bank view"""
    return render(request, 'questions.html')
