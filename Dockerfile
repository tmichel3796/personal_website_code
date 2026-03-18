FROM python:3.11-slim

# Ensure logs are visible immediately and avoid .pyc files
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install dependencies first for better layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Container runtime port
EXPOSE 5000

# Keep the same production entry style used elsewhere in the project
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
