FROM nginx:latest

# Install Certbot
RUN apt-get update && \
    apt-get install -y certbot python3-certbot-nginx

# Copy the custom nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Open necessary ports
EXPOSE 80
EXPOSE 443

