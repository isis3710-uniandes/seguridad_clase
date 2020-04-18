
## Usuarios para realizar pruebas 

| username | password | Descripcion |
|:--------:|:--------:|:-----------:|
|admin     |password  |Usuario con el permiso de get activo|
|admin2    |password2 |Usuario sin el permiso de get activo|

## Manejo de permnisos.

Para el manejo de permisos se almacena desde la base de datos un atributo de tipo objeto que contiene los 4 permisos generales (get, post, update y delete) y un valor lógico asociado a acada permiso que determina si el usuario cunta o no con este.

A continuación se ilustra el jsonSchema que se guarda en la base de datos:
```
{
    "$schema": "http://json-schema.org/draft-07/schema",
    "$id": "http://example.com/example.json",
    "type": "object",
    "title": "Esquema de información del usuario",
    "description": "Representa el esquema en el que se almacena la información del usuario",
    "default": {},
    "additionalProperties": true,
    "required": [
        "login",
        "pw",
        "permisos"
    ],
    "properties": {
        "login": {
            "$id": "#/properties/login",
            "type": "string",
            "description": "Nombde de usuario con el que se inicia sesión",
            "default": "",
            "examples": [
                "admin"
            ]
        },
        "pw": {
            "$id": "#/properties/pw",
            "type": "string",
            "description": "Contraseña del usurio",
            "default": "",
            "examples": [
                "password"
            ]
        },
        "permisos": {
            "$id": "#/properties/permisos",
            "type": "object",
            "description": "Propiedad que define los permisos del usuario",
            "default": {},
            "examples": [
                {
                    "delete": false,
                    "get": false,
                    "put": false,
                    "post": false
                }
            ],
            "additionalProperties": true,
            "required": [
                "get",
                "post",
                "put",
                "delete"
            ],
            "properties": {
                "get": {
                    "$id": "#/properties/permisos/properties/get",
                    "type": "boolean",
                    "description": "Determina si el usuario tiene permiso para realizar peticiones de tipo get",
                    "default": false,
                    "examples": [
                        false
                    ]
                },
                "post": {
                    "$id": "#/properties/permisos/properties/post",
                    "type": "boolean",
                    "description": "Determina si el usuario tiene permiso para realizar peticiones de tipo post",
                    "default": false,
                    "examples": [
                        false
                    ]
                },
                "put": {
                    "$id": "#/properties/permisos/properties/put",
                    "type": "boolean",
                    "description": "Determina si el usuario tiene permiso para realizar peticiones de tipo put",
                    "default": false,
                    "examples": [
                        false
                    ]
                },
                "delete": {
                    "$id": "#/properties/permisos/properties/delete",
                    "type": "boolean",
                    "description": "Determina si el usuario tiene permiso para realizar peticiones de tipo delete",
                    "default": false,
                    "examples": [
                        false
                    ]
                }
            }
        }
    }
}
```
