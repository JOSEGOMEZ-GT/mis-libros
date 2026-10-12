import { supabase } from "../lib/supabase";
import Libro from "../models/Libro";

// Forma de una fila tal como viene de la base de datos (datos externos)
interface FilaLibro {
  id: number;
  titulo: string;
  autor: string;
  anio: number;
}

class LibroRepository {
  private static instancia: LibroRepository;

  private constructor() {}

  public static getInstance(): LibroRepository {
    if (!LibroRepository.instancia) {
      LibroRepository.instancia = new LibroRepository();
    }
    return LibroRepository.instancia;
  }

  async obtenerLibros(): Promise<Libro[]> {
    const { data, error } = await supabase
      .from("libros")
      .select("id, titulo, autor, anio")
      .order("id", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map(
      (fila: FilaLibro) =>
        new Libro(fila.id, fila.titulo, fila.autor, fila.anio),
    );
  }

  async agregarLibro(
    titulo: string,
    autor: string,
    anio: number,
  ): Promise<Libro> {
    const { data, error } = await supabase
      .from("libros")
      .insert({ titulo, autor, anio })
      .select("id, titulo, autor, anio")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    const fila = data as FilaLibro;
    return new Libro(fila.id, fila.titulo, fila.autor, fila.anio);
  }

  async eliminarLibro(id: number): Promise<void> {
    const { error } = await supabase.from("libros").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  }
}

export default LibroRepository;
