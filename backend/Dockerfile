# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory to /app
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements into a 'backend' directory so imports like 'from backend...' work
COPY requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy the rest of the application into the 'backend' directory
COPY . ./backend/
COPY .env ./.env

# Expose the port Cloud Run uses
ENV PORT 8080
EXPOSE 8080

# Run uvicorn pointing to the backend.main module
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
