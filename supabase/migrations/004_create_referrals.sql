-- Bloco 004: tabela de indicações e encaminhamentos entre clínicas e pacientes.

create table if not exists public.referrals (
    id uuid primary key default gen_random_uuid(),
    clinic_id uuid not null references public.clinics(id) on delete cascade,
    patient_id uuid references public.patients(id) on delete set null,

    referred_name text not null,
    referred_phone text,
    referred_email text,

    reward_amount numeric(10,2) not null default 0,
    status text not null default 'pending',
    approved_at timestamptz,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists idx_referrals_clinic_id
on public.referrals(clinic_id);

create index if not exists idx_referrals_patient_id
on public.referrals(patient_id);

create index if not exists idx_referrals_status
on public.referrals(status);

create index if not exists idx_referrals_created_at
on public.referrals(created_at);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'referrals_status_check'
    ) THEN
        ALTER TABLE public.referrals
            ADD CONSTRAINT referrals_status_check
            CHECK (status IN ('pending', 'approved', 'rejected'));
    END IF;
END $$;

drop trigger if exists referrals_updated_at on public.referrals;

create trigger referrals_updated_at
before update on public.referrals
for each row
execute procedure public.set_updated_at();

comment on table public.referrals is 'Referral records created by clinics for prospective patients.';
