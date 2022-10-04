FROM php:8.1 as php

# Install extension
RUN apt-get update -y
RUN apt-get install -y unzip libpq-dev libcurl4-gnutls-dev
RUN docker-php-ext-install pdo pdo_mysql bcmath

# copy project files to the server (. ->copy from var/wwww to . -> work dir)
WORKDIR /var/www
COPY . .

# Install composer
COPY --from=composer:2.3.5 /usr/bin/composer /usr/bin/composer

# Create new variable used in extrypoint.sh
ENV PORT=8000

# Run defined command in the script (migration, seeds,...)
ENTRYPOINT [ "./Docker/entrypoint.sh" ]





