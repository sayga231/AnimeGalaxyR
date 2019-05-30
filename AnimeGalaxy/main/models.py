import os

from ckeditor.fields import RichTextField
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.files.storage import FileSystemStorage
from django.core.validators import MinValueValidator
from django.db import models
from django.db.models import Model
from django.utils import timezone

# File Storage
anime_storage = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT, 'animes'), base_url=os.path.join(settings.MEDIA_URL, 'animes'))
video_storage = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT, 'video'), base_url=os.path.join(settings.MEDIA_URL, 'video'))
thumb_storage = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT, 'thumbs'), base_url=os.path.join(settings.MEDIA_URL, 'thumbs'))
user_storage = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT, 'users'), base_url=os.path.join(settings.MEDIA_URL, 'users'))


class Genre(Model):
	# Meta configurations
	class Meta:
		verbose_name = 'Género'

	# Model fields
	name = models.CharField(max_length=50, null=False, blank=False, unique=True, verbose_name="Nome")

	def __str__(self) -> str:
		return self.name


class Quality(Model):
	# Meta configurations
	class Meta:
		verbose_name = 'Qualidade'

	# Model fields
	name = models.CharField(max_length=20, null=False, blank=False, unique=True, verbose_name="Nome")

	def __str__(self) -> str:
		return self.name


class Anime(Model):
	# Meta configurations
	class Meta:
		verbose_name = 'Anime'

	# Model relations
	genres = models.ManyToManyField(Genre, verbose_name="Géneros", related_name="animes", blank=False)

	# Model fields
	name = models.CharField(max_length=200, null=False, blank=False, unique=True, verbose_name="Nome")
	image = models.ImageField(storage=anime_storage, null=False, blank=False, default='default.jpg', verbose_name="Imagem")
	thumbnail = models.ImageField(storage=thumb_storage, null=False, blank=False, default='default.jpg', verbose_name="Thumbnail")
	description = RichTextField(null=False, blank=False, verbose_name="Descrição")

	def __str__(self) -> str:
		return self.name


class Episode(Model):
	# Meta configurations
	class Meta:
		unique_together = ['anime', 'number']
		verbose_name = 'Episódio'

	# Model relations
	anime = models.ForeignKey(Anime, on_delete=models.CASCADE, verbose_name="Anime", related_name="episodes", null=False, blank=False)

	# Model fields
	number = models.IntegerField(default=0, null=False, blank=False, validators=[MinValueValidator(0)], verbose_name="Número de Episódio")
	views = models.IntegerField(default=0, null=False, validators=[MinValueValidator(0)], verbose_name="Visualizações")

	# Hidden Model fields
	added = models.DateTimeField(default=timezone.now, editable=False)

	def __str__(self) -> str:
		return f"{self.anime} - {self.number}"


class Video(Model):
	# Meta configurations
	class Meta:
		unique_together = ['episode', 'quality']

	# Model relations
	episode = models.ForeignKey(Episode, on_delete=models.CASCADE, verbose_name="Episódio", related_name="videos", null=False, blank=False)
	quality = models.ForeignKey(Quality, on_delete=models.CASCADE, verbose_name="Qualidade", related_name="videos", null=False, blank=False)

	# Model fields
	# url = models.URLField(max_length=1500, null=False, blank=False, verbose_name="URL")
	video = models.FileField(storage=video_storage, blank=False, null=False)

	def __str__(self) -> str:
		return f"{self.episode} [{self.quality}]"


class CustomUser(AbstractUser):
	# User custom fields
	avatar = models.ImageField(storage=user_storage, null=False, blank=False, default='default.jpg', verbose_name="Avatar")
