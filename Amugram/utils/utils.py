from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import BasePermission

from friends.models import Block


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 10000


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 100


class IsNotBlocked(BasePermission):
    def has_permission(self, request, view):
        target_user = view.kwargs.get('username')

        if Block.objects.filter(blocker=request.user, blocked__username=target_user).exists():
            return False
        return True
