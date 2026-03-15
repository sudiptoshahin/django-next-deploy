from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    
    if response is not None:
        error_payload = {
            'status': 'error',
            'code': response.status_code,
            'errors': response.data,
        }
        response.data = error_payload
    else:
        logger.exception("Unhandled exception", exc_info=exc)
        response = Response(
            {'status': 'error', 'code': 500, 'errors': 'Internal server error'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    return response