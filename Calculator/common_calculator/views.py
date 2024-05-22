from django.shortcuts import render


def calculator_display(request):
    return render(request, 'common_calculator/index.html')
