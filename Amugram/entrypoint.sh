#!/bin/bash
# Start Gunicorn
gunicorn --bind 0.0.0.0:8000 --workers 3 config.wsgi:application &

# Start Celery worker
celery -A config worker --loglevel=info
