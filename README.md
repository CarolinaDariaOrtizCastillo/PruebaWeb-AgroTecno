# 🌱 AgroTecno - Sistema Web Full Stack

## 👥 Integrante

- Carolina Ortiz

---

# 📌 Descripción del Proyecto

AgroTecno es una aplicación web desarrollada para la gestión y visualización de información agrícola mediante una arquitectura Full Stack.  
El sistema permite consumir servicios REST desde un frontend desarrollado en Angular conectado a un backend en Spring Boot y una base de datos SQL Server.

El proyecto fue desplegado utilizando contenedores Docker y servicios en la nube de AWS EC2, permitiendo separar frontend, backend y base de datos en diferentes instancias para una arquitectura más escalable.

---

# 🚀 Tecnologías Utilizadas

## Frontend
- Angular
- TypeScript
- HTML5
- CSS3
- Nginx
- Docker

## Backend
- Java 25
- Spring Boot 3
- Spring Data JPA
- Maven
- Docker

## Base de Datos
- SQL Server 2022
- Docker

## Cloud & DevOps
- AWS EC2
- Docker Compose
- Docker Hub
- Linux Ubuntu

---

# 🐳 Imágenes Docker Utilizadas

## Frontend
```bash
carolinaortiz/frontend-agrotecno-07:latest
```

## Backend
```bash
carolinaortiz/springboot-sqlserver:3.0
```

## SQL Server
```bash
carolinaortiz/sql-server:2022
```

---

# ⚙️ Pasos de Despliegue

## 1️⃣ Crear instancias EC2 en AWS

Se crearon tres instancias EC2:

- Frontend
- Backend
- Base de Datos SQL Server

---

## 2️⃣ Instalar Docker

```bash
sudo apt update
sudo apt install docker.io -y
```

---

## 3️⃣ Verificar Docker

```bash
docker --version
```

---

# 🗄️ Despliegue de la Base de Datos

## Descargar imagen

```bash
sudo docker pull carolinaortiz/sql-server:2022
```

## Crear contenedor SQL Server

```bash
sudo docker run -d \
-e "ACCEPT_EULA=Y" \
-e "SA_PASSWORD=TuPassword123!" \
-p 1433:1433 \
--name sql-server \
carolinaortiz/sql-server:2022
```

---

# ☕ Despliegue del Backend

## Descargar imagen

```bash
sudo docker pull carolinaortiz/springboot-sqlserver:3.0
```

## Archivo docker-compose-be.yml

```yaml
version: '3'

services:
  backend:
    image: carolinaortiz/springboot-sqlserver:3.0
    container_name: springboot-sqlserver
    ports:
      - "2000:2000"
    environment:
      - PORT=2000
      - SERVER_URL=http://localhost:2000
      - DATABASE_URL=jdbc:sqlserver://3.230.248.29:1433;databaseName=agroTecno_db;encrypt=true;trustServerCertificate=true
      - DATABASE_USERNAME=sa
      - DATABASE_PASSWORD=TuPassword123!
      - DATABASE_DRIVER=com.microsoft.sqlserver.jdbc.SQLServerDriver
```

## Levantar backend

```bash
sudo docker-compose -f docker-compose-be.yml up -d
```

---

# 💻 Despliegue del Frontend

## Descargar imagen

```bash
sudo docker pull carolinaortiz/frontend-agrotecno-07:latest
```

## Archivo docker-compose-fe.yml

```yaml
version: '3'

services:
  frontend:
    image: carolinaortiz/frontend-agrotecno-07:latest
    container_name: frontend-agrotecno
    ports:
      - "80:80"
```

## Levantar frontend

```bash
sudo docker-compose -f docker-compose-fe.yml up -d
```

---

# 🔐 Configuración de Security Groups en AWS

## Frontend
| Puerto | Tipo |
|---|---|
| 80 | HTTP |
| 22 | SSH |

## Backend
| Puerto | Tipo |
|---|---|
| 2000 | Custom TCP |
| 22 | SSH |

## Base de Datos
| Puerto | Tipo |
|---|---|
| 1433 | Custom TCP |
| 22 | SSH |

---

# 🐳 Comandos Docker Utilizados

## Ver contenedores

```bash
sudo docker ps
```

## Ver logs

```bash
sudo docker logs nombre-contenedor
```

## Eliminar contenedor

```bash
sudo docker rm -f nombre-contenedor
```

## Descargar imágenes

```bash
sudo docker pull nombre-imagen
```

## Levantar contenedores con compose

```bash
sudo docker-compose up -d
```

## Detener contenedores

```bash
sudo docker-compose down
```

---

# 🌐 URLs del Proyecto

## Frontend

```text
http://54.225.228.117
```

## Backend Swagger

```text
http://32.194.22.148:2000/swagger-ui/index.html
```

---

# 📸 Evidencia de Funcionamiento

## Frontend desplegado en AWS

✅ Aplicación Angular funcionando correctamente desde EC2.

## Backend desplegado en AWS

✅ API Spring Boot funcionando correctamente en puerto 2000.

## Base de Datos conectada

✅ SQL Server conectado exitosamente con Spring Boot mediante Docker y AWS.

---

# ✅ Estado Final del Proyecto

- Frontend desplegado correctamente
- Backend desplegado correctamente
- Base de datos conectada
- Comunicación entre servicios funcionando
- Infraestructura desplegada en AWS
- Contenedores Docker funcionando correctamente