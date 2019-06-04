from django.urls import path
from rest_auth.registration.views import RegisterView
from rest_auth.views import LoginView, LogoutView

from . import views

urlpatterns = [
	# Authentication
	path('auth/login', LoginView.as_view(), name='rest_login'),
	path('auth/logout', LogoutView.as_view(), name='rest_logout'),
	path('auth/register', RegisterView.as_view(), name='rest_register'),

	# Reports
	path('report/video', views.create_report, {"classifier": "video-report"}, name="create-video-report"),
	path('report/video/other', views.create_report, {"classifier": "video-report-other"}, name="create-report"),

	# Episode
	path('episode/like', views.LikeView.as_view({"post": "update"}), name="like-video"),
	path('episode/latest', views.EpisodesView.as_view({"get": "list", "post": "create"}), name='list-episodes'),
	path('episode/<int:pk>', views.EpisodesView.as_view({"get": "retrieve"}), name='retrieve-episode'),

	# Anime
	path('anime/watched', views.AnimeView.as_view({"get": "watched"}), name="watched-anime"),
	path('anime/latest', views.AnimeView.as_view({"get": "latest"}), name="latest-anime"),
	path('anime/<int:pk>', views.AnimeView.as_view({"get": "retrieve"}), name="get-anime"),
	path('anime/<int:pk>/episodes', views.AnimeView.as_view({"get": "episodes"}), name="episodes/anime"),

	path('playlist/<int:pk>', views.UrlView.as_view({"get": "retrieve"}), name='retrieve-urls'),
]
