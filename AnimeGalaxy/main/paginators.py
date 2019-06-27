from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
	page_size = 24
	template = None


class HomeResultsSetPagination(PageNumberPagination):
	page_size = 8
	template = None
