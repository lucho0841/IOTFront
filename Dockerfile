# Define la imagen base
FROM node:14.15-alpine AS node

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Construye la aplicación Angular
RUN npm run build

# Define la imagen base final
FROM nginx:latest

# Copia la aplicación Angular construida en la imagen final
COPY --from=node /app/dist/IOTFront /usr/share/nginx/html

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80
