###### Must run 'ng build -c local' to build at local before creating image ######

######  Use NgInx alpine image  ###### 
FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy nginx config file
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy dist folder fro build stage to nginx public folder
COPY ./dist /usr/share/nginx/html

# Start NgInx service
CMD ["nginx", "-g", "daemon off;"]