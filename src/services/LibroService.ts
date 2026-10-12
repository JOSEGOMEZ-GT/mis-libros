import Libro from "../models/Libro";
import LibroRepository from "../repositories/LibroRepository";

class LibroService {
  private repositorio: LibroRepository;

  constructor() {
    this.repositorio = LibroRepository.getInstance();
  }

  async agregarLibro(
    titulo: string,
    autor: string,
    anio: number,
  ): Promise<Libro> {
    return this.repositorio.agregarLibro(titulo, autor, anio);
  }

  async eliminarLibro(id: number): Promise<void> {
    return this.repositorio.eliminarLibro(id);
  }

  async obtenerLibros(): Promise<Libro[]> {
    return this.repositorio.obtenerLibros();
  }
}

export default LibroService;
