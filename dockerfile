# Usa una imagen base con Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración del proyecto
COPY package.json package-lock.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Compila la aplicación
RUN npm run dev

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD ["npm", "start"]
