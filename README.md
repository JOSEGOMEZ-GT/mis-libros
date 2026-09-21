# Welcome to your Expo app 👋

# Mis Libros

Aplicación en React Native + TypeScript para agregar, listar y eliminar libros.

## Reflexión

**¿Por qué es conveniente separar la lógica de los libros de App.tsx?**
Se hace para tener una mejor estructura y hacer el codigo mas manejable, ya que al hacer cambios la logica no afecta a interfaz de la pantalla y previene trabajo adicional o errores en la interfaz

**¿Qué responsabilidad tiene LibroService?**
Guardar la lista de libros y ofrecer las operaciones sobre ella (agregar, eliminar, obtener).

**¿Qué responsabilidad tiene la clase Libro?**
Representar los datos y el comportamiento de un solo libro.

## Captura de la aplicación

![Captura](Captura.png.png)

## Cambios — Repository y Singleton

Se agregó la clase `LibroRepository`, encargada de administrar la colección
de libros (antes esa responsabilidad la tenía `LibroService`). `LibroService`
ahora delega en `LibroRepository` las operaciones de agregar, eliminar y
obtener libros.

`LibroRepository` implementa el patrón Singleton: su constructor es privado
y solo se puede obtener una instancia a través de `LibroRepository.getInstance()`.
Se comprobó en la consola del navegador que dos llamadas a `getInstance()`
devuelven la misma instancia.

### Captura de la app funcionando

![captura app](capt2.png)

### Captura de la prueba del Singleton

![captura singleton](capt1.png)
