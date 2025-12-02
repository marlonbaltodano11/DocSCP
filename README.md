# DocSCP

**DocSCP (Document Syllabus Conversion Platform)** es una herramienta para convertir documentos de planes de asignatura antiguos al nuevo formato oficial de syllabus.  

El proyecto cuenta con un **backend en Django** y un **frontend en React**.

---

## Tecnologías

- **Backend:** Django (Python 3.12)  
- **Frontend:** React (Node.js)  
- **Base de datos:** No requerida

---

## Requisitos

- Ubuntu 22.04 LTS (recomendado)  
- Python 3.12  
- Node.js (v14 o superior)  
- npm  
- Permisos de administrador para instalar dependencias  

---

## Instalación

### 1. Actualizar sistema

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Instalar dependencias para Python
```bash
sudo apt install -y build-essential libssl-dev zlib1g-dev libncurses5-dev \
libncursesw5-dev libreadline-dev libsqlite3-dev libgdbm-dev libdb5.3-dev \
libbz2-dev libexpat1-dev liblzma-dev tk-dev libffi-dev libnss3-dev
```

### 3. Instalar Python 3.12
```bash
wget https://www.python.org/ftp/python/3.12.0/Python-3.12.0.tgz
tar -xvzf Python-3.12.0.tgz
cd Python-3.12.0
./configure --enable-optimizations
make -j $(nproc)
sudo make altinstall
python3.12 --version
```

### 4. Instalar Node.js y npm
```bash
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

### 5. Clonar el repositorio
```bash
git clone https://github.com/marlonbaltodano11/DocSCP.git
cd DocSCP
```

---

## Configuración del back-end (Django)

### 1. Crear entorno virtual:
```bash
python3.12 -m venv venv
source ./venv/bin/activate
```

### 2. Instalar dependencias
```bash
pip install -r requirements-linux.txt
```

### 3. Migrar la base de datos de Django
```bash
python manage.py migrate
```

### 4. Iniciar servidor back-end
```bash
python manage.py runserver
```

---

## Configuración del Frontend (React)

### 1. Instalar dependencias
```bash
npm i
```

### 2. Modificar URL del back-end
```
Editar ./frontend/src/config/api/ApiUrl.js para apuntar a la URL pública del backend.
```

### 3. Generar archivos de producción
```bash
npm run build
```

### 4. Servir frontend con Nginx
```bash
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx
```

---

## Uso

1. Acceder a la aplicación vía navegador usando la URL configurada para el frontend.
2. Subir documentos de planes de asignatura antiguos y generar la versión en el formato de syllabus oficial.