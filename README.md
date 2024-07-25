# Calculator
This is a test Django project for front-end styling with JavaScript, HTML, and CSS, and deployment in a production environment. The project is deployed on AWS and is accessible at this address: [http://13.39.23.137].

For its proper functioning, three additional files are required:

1. .env: Contains environment variables for configuration, including sensitive information like access keys.
2. nginx.conf: Contains global Nginx configuration settings, defining basic server parameters and including additional configuration files.
3. default.conf: Specifies the virtual host configuration for serving the Django application, including proxy settings and paths for static and media files.

All three files must be placed in the root directory of the project.
