import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Libro from "../models/Libro";
import LibroRepository from "../repositories/LibroRepository";
import LibroService from "../services/LibroService";

export default function HomeScreen() {
  const [servicio] = useState(() => new LibroService());
  const [libros, setLibros] = useState<Libro[]>([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [anio, setAnio] = useState("");
  useEffect(() => {
    const instancia1 = LibroRepository.getInstance();
    const instancia2 = LibroRepository.getInstance();
    console.log("¿Son la misma instancia?", instancia1 === instancia2);
  }, []);

  function manejarAgregar() {
    if (titulo === "" || autor === "" || anio === "") {
      return;
    }
    servicio.agregarLibro(titulo, autor, Number(anio));
    setLibros([...servicio.obtenerLibros()]);
    setTitulo("");
    setAutor("");
    setAnio("");
  }

  function manejarEliminar(id: number) {
    servicio.eliminarLibro(id);
    setLibros([...servicio.obtenerLibros()]);
  }

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Mis Libros</Text>

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
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 20, backgroundColor: "#1E1E2E" },
  titulo: { fontSize: 24, color: "#61DAFB", marginBottom: 20 },
  input: {
    backgroundColor: "#2A2A3C",
    color: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
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
  textoLibro: { color: "white" },
  eliminar: { color: "#FF6B6B" },
});
