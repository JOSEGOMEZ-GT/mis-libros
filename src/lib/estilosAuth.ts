import { StyleSheet } from "react-native";

export const estilosAuth = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1E1E2E",
    justifyContent: "center",
  },
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
    marginBottom: 16,
  },
  textoBoton: { color: "#1E1E2E", textAlign: "center", fontWeight: "bold" },
  mensaje: { color: "#FF6B6B", marginBottom: 12 },
  enlace: { color: "#61DAFB", textAlign: "center" },
});
