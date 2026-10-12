import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

class AuthService {
  // Devuelve la sesión si el proyecto no exige confirmar el correo; null si exige confirmación.
  async registrar(correo: string, clave: string): Promise<Session | null> {
    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password: clave,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data.session;
  }

  async iniciarSesion(correo: string, clave: string): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: clave,
    });
    if (error) {
      throw new Error(error.message);
    }
  }

  async cerrarSesion(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  async obtenerSesion(): Promise<Session | null> {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw new Error(error.message);
    }
    return data.session;
  }

  // Avisa cada vez que la sesión cambia (login, logout...).
  // Devuelve una función para dejar de escuchar (la "limpieza" del useEffect, Clase 5).
  escucharCambios(callback: (sesion: Session | null) => void): () => void {
    const { data } = supabase.auth.onAuthStateChange((_evento, sesion) => {
      callback(sesion);
    });
    return () => data.subscription.unsubscribe();
  }
}

export default AuthService;
