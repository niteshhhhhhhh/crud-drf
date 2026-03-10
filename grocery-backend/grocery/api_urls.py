from django.urls import path

from . import views

app_name = 'grocery_api'

urlpatterns = [
    path('', views.GroceryListAPIView.as_view(), name='grocery-list'),
    path('<int:pk>/', views.GroceryDetailAPIView.as_view(), name='grocery-detail'),
    path('<int:pk>/toggle/', views.GroceryToggleAPIView.as_view(), name='grocery-toggle'),
]
