-- Bloco 005: catálogo de recompensas disponíveis por clínica.

create table if not exists public.reward_catalog (
    id uuid primary key default gen_random_uuid(),
    clinic_id uuid not null references public.clinics(id) on delete cascade,

    title text not null,
    description text,
    points_cost numeric(10,2) not null default 0,
    active boolean not null default true,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists idx_reward_catalog_clinic_id
on public.reward_catalog(clinic_id);

create index if not exists idx_reward_catalog_active
on public.reward_catalog(active);

create index if not exists idx_reward_catalog_created_at
on public.reward_catalog(created_at);

drop trigger if exists reward_catalog_updated_at on public.reward_catalog;

create trigger reward_catalog_updated_at
before update on public.reward_catalog
for each row
execute procedure public.set_updated_at();

comment on table public.reward_catalog is 'Catalog of rewards that can be redeemed by patients.';
