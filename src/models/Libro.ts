class Libro {
  private _id: number;
  titulo: string;
  autor: string;
  anio: number;

  constructor(id: number, titulo: string, autor: string, anio: number) {
    this._id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
  }

  get id(): number {
    return this._id;
  }

  mostrarInformacion(): string {
    return `${this.titulo} (${this.anio}) - ${this.autor}`;
  }
}

export default Libro;
