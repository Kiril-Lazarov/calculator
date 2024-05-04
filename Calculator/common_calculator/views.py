from django.http import HttpResponse
from django.shortcuts import render

def calculator_display(request):

    return HttpResponse('It works')
