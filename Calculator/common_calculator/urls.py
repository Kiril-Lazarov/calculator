from django.urls import path

from Calculator.common_calculator import views

urlpatterns = [
    path('', views.calculator_display, name='display calculator')
]