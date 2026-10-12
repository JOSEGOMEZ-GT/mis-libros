import type { Session } from "@supabase/supabase-js";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AuthService from "../services/AuthService";

const authService = new AuthService();

export default function RootLayout() {
  const [sesion, setSesion] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // 1. Leer la sesión guardada (si el usuario ya había iniciado sesión antes)
    authService.obtenerSesion().then((sesionGuardada) => {
      setSesion(sesionGuardada);
      setCargando(false);
    });

    // 2. Escuchar cambios: login, logout, registro...
    const dejarDeEscuchar = authService.escucharCambios((nuevaSesion) => {
      setSesion(nuevaSesion);
    });

    // 3. Limpieza (igual que clearInterval en la Clase 5)
    return dejarDeEscuchar;
  }, []);

  if (cargando) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#1E1E2E",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#61DAFB", textAlign: "center" }}>
          Cargando...
        </Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={sesion !== null}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={sesion === null}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
