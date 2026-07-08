-- Bloco 002: extensão do modelo de clínicas para suportar lifecycle e auditoria SaaS.

alter table public.clinics
    add column if not exists active boolean not null default true,
    add column if not exists created_by uuid,
    add column if not exists updated_by uuid,
    add column if not exists deleted_at timestamptz;

alter table public.clinics
    alter column plan set default 'trial',
    alter column status set default 'active';

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'clinics_plan_check'
    ) THEN
        ALTER TABLE public.clinics
            ADD CONSTRAINT clinics_plan_check
            CHECK (plan IN ('trial', 'basic', 'pro', 'enterprise'));
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'clinics_status_check'
    ) THEN
        ALTER TABLE public.clinics
            ADD CONSTRAINT clinics_status_check
            CHECK (status IN ('active', 'inactive', 'blocked'));
    END IF;
END $$;

create index if not exists idx_clinics_created_at
on public.clinics(created_at);

comment on table public.clinics is 'Core clinic records for the Indica Estética SaaS platform.';
