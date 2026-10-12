import { useEffect, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import Libro from "../../models/Libro";
import AuthService from "../../services/AuthService";
import LibroService from "../../services/LibroService";

// Los servicios ya no guardan estado propio (el estado vive en Supabase),
// así que basta una instancia fuera del componente.
const libroService = new LibroService();
const authService = new AuthService();

export default function HomeScreen() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [anio, setAnio] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function cargarLibros() {
    try {
      const lista = await libroService.obtenerLibros();
      setLibros(lista);
    } catch (error) {
      setMensaje(
        error instanceof Error
          ? error.message
          : "No se pudieron cargar los libros",
      );
    }
  }

  // Se ejecuta UNA vez al aparecer la pantalla (Clase 5: useEffect con [])
  useEffect(() => {
    cargarLibros();
    authService.obtenerSesion().then((sesion) => {
      setCorreo(sesion?.user.email ?? "");
    });
  }, []);

  async function manejarAgregar() {
    if (
      titulo === "" ||
      autor === "" ||
      anio === "" ||
      Number.isNaN(Number(anio))
    ) {
      setMensaje("Completa todos los campos (el año debe ser un número)");
      return;
    }
    setMensaje("");
    try {
      await libroService.agregarLibro(titulo, autor, Number(anio));
      setTitulo("");
      setAutor("");
      setAnio("");
      await cargarLibros();
    } catch (error) {
      setMensaje(
        error instanceof Error ? error.message : "No se pudo agregar el libro",
      );
    }
  }

  async function manejarEliminar(id: number) {
    try {
      await libroService.eliminarLibro(id);
      await cargarLibros();
    } catch (error) {
      setMensaje(
        error instanceof Error ? error.message : "No se pudo eliminar el libro",
      );
    }
  }

  async function manejarCerrarSesion() {
    try {
      await authService.cerrarSesion();
      // Sin router.push: al desaparecer la sesión, _layout.tsx vuelve a Login solo.
    } catch (error) {
      setMensaje(
        error instanceof Error ? error.message : "No se pudo cerrar sesión",
      );
    }
  }

  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <View style={estilos.encabezado}>
        <Text style={estilos.titulo}>Mis Libros</Text>
        <Pressable onPress={manejarCerrarSesion}>
          <Text style={estilos.cerrar}>Cerrar sesión</Text>
        </Pressable>
      </View>
      <Text style={estilos.correo}>Sesión: {correo}</Text>

      <TextInput
        style={estilos.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={estilos.input}
        placeholder="Autor"
        value={autor}
        onChangeText={setAutor}
      />
      <TextInput
        style={estilos.input}
        placeholder="Año"
        value={anio}
        onChangeText={setAnio}
        keyboardType="numeric"
      />

      {mensaje !== "" && <Text style={estilos.mensaje}>{mensaje}</Text>}

      <Pressable style={estilos.boton} onPress={manejarAgregar}>
        <Text style={estilos.textoBoton}>Agregar libro</Text>
      </Pressable>

      {libros.map((libro) => (
        <View key={libro.id} style={estilos.fila}>
          <Text style={estilos.textoLibro}>{libro.mostrarInformacion()}</Text>
          <Pressable onPress={() => manejarEliminar(libro.id)}>
            <Text style={estilos.eliminar}>Eliminar</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: "#1E1E2E" },
  contenido: { padding: 20 },
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  titulo: { fontSize: 24, color: "#61DAFB" },
  cerrar: { color: "#FF6B6B" },
  correo: { color: "#A0A0B8", marginBottom: 20 },
  input: {
    backgroundColor: "#2A2A3C",
    color: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  mensaje: { color: "#FF6B6B", marginBottom: 10 },
  boton: {
    backgroundColor: "#61DAFB",
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
  },
  textoBoton: { color: "#1E1E2E", textAlign: "center", fontWeight: "bold" },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textoLibro: { color: "white", flex: 1 },
  eliminar: { color: "#FF6B6B" },
});
