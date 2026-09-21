import Libro from "../models/Libro";

class LibroRepository {
  private static instancia: LibroRepository;
  private libros: Libro[];
  private siguienteId: number;

  // El constructor es PRIVADO: nadie puede escribir "new LibroRepository()" desde afuera.
  private constructor() {
    // Datos Mock: libros de ejemplo para que la app no arranque vacía
    this.libros = [
      new Libro(1, "1984", "George Orwell", 1949),
      new Libro(2, "Cien años de soledad", "Gabriel García Márquez", 1967),
    ];
    this.siguienteId = 3;
  }

  // Este es el único punto de entrada para obtener el repositorio
  public static getInstance(): LibroRepository {
    if (!LibroRepository.instancia) {
      LibroRepository.instancia = new LibroRepository();
    }
    return LibroRepository.instancia;
  }

  obtenerLibros(): Libro[] {
    return this.libros;
  }

  agregarLibro(titulo: string, autor: string, anio: number): Libro {
    const nuevoLibro = new Libro(this.siguienteId, titulo, autor, anio);
    this.libros.push(nuevoLibro);
    this.siguienteId++;
    return nuevoLibro;
  }

  eliminarLibro(id: number): void {
    this.libros = this.libros.filter((libro) => libro.id !== id);
  }
}

export default LibroRepository;
