-- Eventos table + RLS policies
-- Run in Supabase SQL editor

create extension if not exists "pgcrypto";

create table if not exists public.eventos (
  id uuid primary key default gen_random_uuid(),
  fecha date not null,
  title text not null,
  subject text not null default '',
  teacher text not null default '',
  start_time time not null,
  end_time time not null,
  tags text[] not null default '{}',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint eventos_time_range_chk check (end_time > start_time)
);

create index if not exists eventos_fecha_idx
  on public.eventos (fecha asc);

create index if not exists eventos_published_fecha_idx
  on public.eventos (published, fecha asc);

create or replace function public.set_eventos_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_eventos_updated_at on public.eventos;
create trigger trg_eventos_updated_at
before update on public.eventos
for each row execute function public.set_eventos_updated_at();

alter table public.eventos enable row level security;

drop policy if exists "Public eventos read" on public.eventos;
create policy "Public eventos read" on public.eventos
  for select
  using (published = true);

drop policy if exists "Admin leader insert eventos" on public.eventos;
create policy "Admin leader insert eventos" on public.eventos
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.role in ('admin', 'leader')
    )
  );

drop policy if exists "Admin leader update eventos" on public.eventos;
create policy "Admin leader update eventos" on public.eventos
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.role in ('admin', 'leader')
    )
  )
  with check (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.role in ('admin', 'leader')
    )
  );

drop policy if exists "Admin leader delete eventos" on public.eventos;
create policy "Admin leader delete eventos" on public.eventos
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.role in ('admin', 'leader')
    )
  );

grant select on table public.eventos to anon, authenticated;
grant insert, update, delete on table public.eventos to authenticated;

-- Optional seed data
insert into public.eventos (fecha, title, subject, teacher, start_time, end_time, tags, published)
values
  (current_date + 1, 'Culto de Jóvenes', 'Avivamiento', 'Ps. Daniel', '19:00', '21:00', array['jóvenes', 'presencial'], true),
  (current_date + 3, 'Escuela Bíblica', 'Romanos 8', 'Hna. Ruth', '18:30', '20:00', array['estudio'], true),
  (current_date + 7, 'Noche de Oración', 'Intercesión', 'Líderes', '20:00', '22:00', array['oración'], true)
on conflict do nothing;

-- Main query used by app SSR:
-- select * from public.eventos where published = true order by fecha asc;