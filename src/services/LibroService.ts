import Libro from "../models/Libro";
import LibroRepository from "../repositories/LibroRepository";

class LibroService {
  private repositorio: LibroRepository;

  constructor() {
    this.repositorio = LibroRepository.getInstance();
  }

  agregarLibro(titulo: string, autor: string, anio: number): Libro {
    return this.repositorio.agregarLibro(titulo, autor, anio);
  }

  eliminarLibro(id: number): void {
    this.repositorio.eliminarLibro(id);
  }

  obtenerLibros(): Libro[] {
    return this.repositorio.obtenerLibros();
  }
}

export default LibroService;
