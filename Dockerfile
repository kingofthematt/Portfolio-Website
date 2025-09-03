# Use Python 3.11 slim image
FROM python:3.11

# Set working directory
WORKDIR /app

# Copy website files
COPY index.html .
COPY styles.css .
COPY script.js .

# Expose port 8000
EXPOSE 8000

# Start Python HTTP server
CMD ["python", "-m", "http.server", "8000", "--bind", "0.0.0.0"]

