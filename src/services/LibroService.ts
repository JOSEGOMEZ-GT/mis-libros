import Libro from "../models/Libro";

class LibroService {
  private libros: Libro[] = [];
  private siguienteId: number = 1;

  agregarLibro(titulo: string, autor: string, anio: number): Libro {
    const nuevoLibro = new Libro(this.siguienteId, titulo, autor, anio);
    this.libros.push(nuevoLibro);
    this.siguienteId++;
    return nuevoLibro;
  }

  eliminarLibro(id: number): void {
    this.libros = this.libros.filter((libro) => libro.id !== id);
  }

  obtenerLibros(): Libro[] {
    return this.libros;
  }
}

export default LibroService;
