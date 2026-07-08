-- Bloco 007: campanhas promocionais vinculadas a clínicas.

create table if not exists public.promotions (
    id uuid primary key default gen_random_uuid(),
    clinic_id uuid not null references public.clinics(id) on delete cascade,

    title text not null,
    description text,
    image_url text,
    starts_at timestamptz,
    ends_at timestamptz,
    active boolean not null default true,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists idx_promotions_clinic_id
on public.promotions(clinic_id);

create index if not exists idx_promotions_active
on public.promotions(active);

create index if not exists idx_promotions_starts_at
on public.promotions(starts_at);

create index if not exists idx_promotions_ends_at
on public.promotions(ends_at);

drop trigger if exists promotions_updated_at on public.promotions;

create trigger promotions_updated_at
before update on public.promotions
for each row
execute procedure public.set_updated_at();

comment on table public.promotions is 'Promotion campaigns managed per clinic.';
