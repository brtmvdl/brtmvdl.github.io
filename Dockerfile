FROM nginx:stable

WORKDIR /usr/share/nginx/html

COPY . .
