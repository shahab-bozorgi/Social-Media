# Stage 1: Builder Stage
FROM python:3.12-slim AS builder

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    python3-dev

# Create the app directory
RUN mkdir /app

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Celery and Gunicorn
RUN pip install celery==5.4.0
RUN pip install gunicorn==23.0.0

# Upgrade pip
RUN pip install --upgrade pip

# Stage 2: Production Stage
FROM python:3.12-slim

# Create a non-root user and set app directory
RUN useradd -m -r appuser && \
    mkdir /app && \
    chown -R appuser /app

# Install Gunicorn and Celery in the production image
RUN pip install gunicorn==23.0.0
RUN pip install celery==5.4.0

# Copy the Python dependencies from the builder stage
COPY --from=builder /usr/local/lib/python3.12/site-packages/ /usr/local/lib/python3.12/site-packages/

# Set the working directory
WORKDIR /app

# Copy application code and set ownership
COPY --chown=appuser:appuser . .

# Copy entrypoint script and make it executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Switch to non-root user
USER appuser

# Expose the application port
EXPOSE 8000

# Start the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "config.wsgi:application"]
