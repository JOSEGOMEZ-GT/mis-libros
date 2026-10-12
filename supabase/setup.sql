-- 1. Tabla libros
create table if not exists public.libros (
  id bigint primary key generated always as identity,
  titulo text not null,
  autor text not null,
  anio integer not null
);

-- 2. GRANT: permisos sobre la tabla (solo usuarios autenticados)
grant select, insert, delete on public.libros to authenticated;

-- 3. RLS: activar el control de acceso por fila
alter table public.libros enable row level security;

-- 4. Políticas RLS (qué filas puede tocar el rol "authenticated")
create policy "autenticados pueden consultar libros"
  on public.libros for select
  to authenticated
  using (true);

create policy "autenticados pueden agregar libros"
  on public.libros for insert
  to authenticated
  with check (true);

create policy "autenticados pueden eliminar libros"
  on public.libros for delete
  to authenticated
  using (true);

-- 5. (Opcional) Datos de ejemplo para que la tabla no quede vacía
insert into public.libros (titulo, autor, anio) values
  ('1984', 'George Orwell', 1949),
  ('Cien años de soledad', 'Gabriel García Márquez', 1967);