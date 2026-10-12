import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { estilosAuth } from "../../lib/estilosAuth";
import AuthService from "../../services/AuthService";

const authService = new AuthService();

export default function RegistroScreen() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  async function manejarRegistro() {
    if (correo === "" || clave === "" || confirmar === "") {
      setMensaje("Completa todos los campos");
      return;
    }
    if (clave !== confirmar) {
      setMensaje("Las contraseñas no coinciden");
      return;
    }
    if (clave.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setCargando(true);
    setMensaje("");
    try {
      const sesion = await authService.registrar(correo, clave);
      if (sesion === null) {
        // El proyecto exige confirmar el correo antes de iniciar sesión
        setMensaje(
          "Cuenta creada. Revisa tu correo para confirmarla y luego inicia sesión.",
        );
      }
      // Si hay sesión, _layout.tsx cambia a Home automáticamente.
    } catch (error) {
      setMensaje(
        error instanceof Error ? error.message : "No se pudo registrar",
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <View style={estilosAuth.contenedor}>
      <Text style={estilosAuth.titulo}>Crear cuenta</Text>

      <TextInput
        style={estilosAuth.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={estilosAuth.input}
        placeholder="Contraseña (mínimo 6 caracteres)"
        value={clave}
        onChangeText={setClave}
        secureTextEntry
      />
      <TextInput
        style={estilosAuth.input}
        placeholder="Confirmar contraseña"
        value={confirmar}
        onChangeText={setConfirmar}
        secureTextEntry
      />

      {mensaje !== "" && <Text style={estilosAuth.mensaje}>{mensaje}</Text>}

      <Pressable
        style={estilosAuth.boton}
        onPress={manejarRegistro}
        disabled={cargando}
      >
        <Text style={estilosAuth.textoBoton}>
          {cargando ? "Creando..." : "Registrarme"}
        </Text>
      </Pressable>

      <Link href="/login" style={estilosAuth.enlace}>
        ¿Ya tienes cuenta? Inicia sesión
      </Link>
    </View>
  );
}
