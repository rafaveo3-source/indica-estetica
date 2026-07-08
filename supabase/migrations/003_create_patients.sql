-- Bloco 003: tabela de pacientes vinculados a uma clínica.

create table if not exists public.patients (
    id uuid primary key default gen_random_uuid(),
    clinic_id uuid not null references public.clinics(id) on delete cascade,

    name text not null,
    cpf text,
    email text,
    phone text,
    birth_date date,

    balance numeric(10,2) not null default 0,
    status text not null default 'active',

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists idx_patients_clinic_id
on public.patients(clinic_id);

create index if not exists idx_patients_cpf
on public.patients(cpf);

create index if not exists idx_patients_phone
on public.patients(phone);

create index if not exists idx_patients_status
on public.patients(status);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'patients_status_check'
    ) THEN
        ALTER TABLE public.patients
            ADD CONSTRAINT patients_status_check
            CHECK (status IN ('active', 'inactive', 'archived'));
    END IF;
END $$;

drop trigger if exists patients_updated_at on public.patients;

create trigger patients_updated_at
before update on public.patients
for each row
execute procedure public.set_updated_at();

comment on table public.patients is 'Patient profiles associated with a clinic.';
