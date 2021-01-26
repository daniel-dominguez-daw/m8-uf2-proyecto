FORMAT: 1A

# Calculadora con autentificación de usuario

API que permite calcular operaciones matemáticas básicas comprobando siempre la autentificación del usuario.

## SUMA [/suma/{a}/{b}/]

### SUMA [GET]

Suma dos parámetros

+ Parameters
    + a: 3 (number) - Primer operando.
    + b: 5 (number) - Segundo operando.

+ Response 200 (application/json)

    + Body
        [
            {
                "result": 8
            }
        ]
        
## RESTA [/resta/{a}/{b}/]

### RESTA [GET]

Resta dos parámetros

+ Parameters
    + a: 3 (number) - Primer operando.
    + b: 5 (number) - Segundo operando.

+ Response 200 (application/json)

    + Body
        [
            {
                "result": -2
            }
        ]
        
## MULTIPLICA [/multiplica/{a}/{b}/]

### MULTIPLICA [GET]
    
Multiplica dos parámetros

+ Parameters
    + a: 3 (number) - Primer operando.
    + b: 5 (number) - Segundo operando.

+ Response 200 (application/json)

    + Body
        [
            {
                "result": 15
            }
        ]

## DIVIDE [/divide/{a}/{b}/]

### DIVIDE [GET]

Divide dos parámetros

+ Parameters
    + a: 15 (number) - Primer operando.
    + b: 5 (number) - Segundo operando.

+ Response 200 (application/json)

    + Body
        [
            {
                "result": 3
            }
        ]
