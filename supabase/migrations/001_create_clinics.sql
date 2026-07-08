create extension if not exists pgcrypto;

create table if not exists public.clinics (
    id uuid primary key default gen_random_uuid(),

    name text not null,
    slug text not null unique,

    email text,
    phone text,

    plan text not null default 'trial',

    status text not null default 'active',

    logo_url text,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists idx_clinics_name
on public.clinics(name);

create index if not exists idx_clinics_status
on public.clinics(status);

create index if not exists idx_clinics_plan
on public.clinics(plan);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists clinics_updated_at on public.clinics;

create trigger clinics_updated_at
before update on public.clinics
for each row
execute procedure public.set_updated_at();
