### Instalacion, Aplicacion Web
### Dashboard

```bash

Instalamos Git
sudo yum install git

Instalacion en Debian de NodeJS (como root) y NPM

sudo yum install gcc gcc-c++
sudo yum install epel-release
sudo yum install nodejs
sudo yum install npm

Actualizamos NPM
npm install npm -g

Instalamos Forever para correr App en background
npm install -g forever

Clonamos Repositorio
git clone http://git.gcba.gob.ar/labgcba/webapp-dashboardcivico.git

Instalamos Dependencias de App
cd webapp-dashboardcivico && npm install

Exportamos variables de Entorno

Asignamos Ip y port, al Server NodeJS

export VM_NODEJS_IP="0.0.0.0"
export VM_NODEJS_PORT=8080

Asignamos la Ip, port y password al Server Redis

export VM_REDIS_HOST="127.0.0.1"
export VM_EXTREDIS_DB_PORT="6379"
export VM_EXTREDIS_DB_NAME=""
export VM_EXTREDIS_DB_PASSWORD=""

Iniciamos Server.js
forever --pidFile /home/ignacio/projects/dgiga/webapp-dashboardcivico/webappdashboard.pid -a -l /home/ignacio/projects/dgiga/webapp-dashboardcivico/webappdashboard.log start server.js

Ver estado de App
forever list

Ver logs
tail -f /directorio/log/webappdashboard.log

Detener App
forever stop 0

Reiniciar App
forever restart 0
```