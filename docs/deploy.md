# Despliegue de applicación calculadora
## Guía de despligue en servidor Ubuntu 20

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

```bash
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@   ________        _  ____              ___              ___       ___  ____     @
@   `MMMMMMMb.     dM. `Mb(      db      )d'              `MMb     dMM' 6MMMMb    @
@    MM    `Mb    ,MMb  YM.     ,PM.     ,P                MMM.   ,PMM 6M'  `Mb   @
@    MM     MM    d'YM. `Mb     d'Mb     d'  ____          M`Mb   d'MM MM    M9   @
@    MM     MM   ,P `Mb  YM.   ,P YM.   ,P  6MMMMb         M YM. ,P MM YM.  ,9    @
@    MM     MM   d'  YM. `Mb   d' `Mb   d' MM'  `Mb        M `Mb d' MM  YMMMMb    @
@    MM     MM  ,P   `Mb  YM. ,P   YM. ,P       ,MM        M  YM.P  MM  6'  `Mb   @
@    MM     MM  d'    YM. `Mb d'   `Mb d'      ,MM'        M  `Mb'  MM 6M    MM   @
@    MM     MM ,MMMMMMMMb  YM,P     YM,P     ,M'           M   YP   MM MM    MM   @
@    MM    .M9 d'      YM. `MM'     `MM'   ,M'             M   `'   MM YM.  ,M9   @
@   _MMMMMMM9_dM_     _dMM_ YP       YP    MMMMMMMM       _M_      _MM_ YMMMM9    @
@                                                                                 @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
```
   
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## ¿Qué vamos a hacer?

Se va a preparar el sistema para servir una aplicación web que consiste en una página html estática (con archivos css y js) y además una api que ofrecerá servicio utilizando flask. Apache servirá todo desde el puerto 8080 y mediará con la API flask haciendo uso de módulos.

## Instalación de paquetes ubuntu

Partimos de un sistema Ubuntu 20.04. Se deben instalar los siguientes paquetes en el servidor.

`sudo apt update`

- (Opcional) Git: `sudo apt install git`
- Apache2: `sudo apt install apache2`
- Python3: `sudo apt install python3`


## Preparar los archivos fuente

(Opcional) Si hemos decidido usar Git podemos traer el código fuente tanto de la aplicación cliente como de la aplicación servidor que están alojadas en el repositorio github `https://github.com/daniel-dominguez-daw/m8-uf2-proyecto/`, sino podemos utilizar un simple unzip.

Usando unzip o git dejaremos los archivos de código fuente bajo la carpeta home por ejemplo `~/calc/src/`.

`~/calc/src/public/` hace referencia a los archivos estáticos.

`~/calc/src/server/` contiene los archivos python con la ejecución de una API utilizando Flask.

## Instalación de módulos de python3

Se debe crear un entorno virtual de python3 donde instalaremos los módulos necesarios para hacer funcionar la API Flask.

```bash
pip3 install virtualenv
cd ~/calc/src/server/
python3 -m venv env
. env/bin/activate
```

```bash
(env) $ pip3 install Flask
# @TODO Alex dependencias de python que faltan aquí
```

## Ejecución del Flask http server

Ejecución en segundo plano.

```bash
cd ~/calc/src/server/
python3 calc.py &
```

Probamos con curl:

```bash
curl localhost:5000/suma/2/3/
```

## Activar módulos de apache

Para redirigir el tráfico de apache a Flask se deben activar los mods `proxy` y `proxy_http`.

```bash
$ sudo a2enmod proxy
$ sudo a2enmod proxy_http
$ sudo systemctl restart apache2
```

## Configuración de virtualhost de apache2

Esta es la configuración de virtualhost necesaria.

Importante copiar el contenido de `~/calc/src/public/` en `/var/www/daw2m8/`

```
<VirtualHost *:8080>
    ServerName daw2m8
    DocumentRoot /var/www/daw2m8
    Proxypass / http://localhost:5000/
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

## Resolución de problemas
