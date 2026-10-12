import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { estilosAuth } from "../../lib/estilosAuth";
import AuthService from "../../services/AuthService";

const authService = new AuthService();

export default function LoginScreen() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  async function manejarLogin() {
    if (correo === "" || clave === "") {
      setMensaje("Completa el correo y la contraseña");
      return;
    }
    setCargando(true);
    setMensaje("");
    try {
      await authService.iniciarSesion(correo, clave);
      // No navegamos a ningún lado: _layout.tsx detecta la sesión nueva
      // y cambia de grupo automáticamente.
    } catch (error) {
      setMensaje(
        error instanceof Error ? error.message : "No se pudo iniciar sesión",
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <View style={estilosAuth.contenedor}>
      <Text style={estilosAuth.titulo}>Iniciar sesión</Text>

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
        placeholder="Contraseña"
        value={clave}
        onChangeText={setClave}
        secureTextEntry
      />

      {mensaje !== "" && <Text style={estilosAuth.mensaje}>{mensaje}</Text>}

      <Pressable
        style={estilosAuth.boton}
        onPress={manejarLogin}
        disabled={cargando}
      >
        <Text style={estilosAuth.textoBoton}>
          {cargando ? "Entrando..." : "Entrar"}
        </Text>
      </Pressable>

      <Link href="/registro" style={estilosAuth.enlace}>
        ¿No tienes cuenta? Regístrate
      </Link>
    </View>
  );
}
