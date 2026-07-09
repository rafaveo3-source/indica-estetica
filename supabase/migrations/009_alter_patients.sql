-- Bloco 009: prepara a tabela patients para o fluxo de indicações.

alter table public.patients
    add column if not exists referral_code text,
    add column if not exists referral_slug text,
    add column if not exists last_indication_at timestamptz,
    add column if not exists last_redemption_at timestamptz,
    add column if not exists total_indications integer not null default 0,
    add column if not exists total_rewards numeric(10,2) not null default 0;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'patients_referral_code_key'
    ) THEN
        ALTER TABLE public.patients
            ADD CONSTRAINT patients_referral_code_key UNIQUE (referral_code);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'patients_referral_slug_key'
    ) THEN
        ALTER TABLE public.patients
            ADD CONSTRAINT patients_referral_slug_key UNIQUE (referral_slug);
    END IF;
END $$;

create unique index if not exists idx_patients_referral_code_unique
on public.patients(referral_code);

create unique index if not exists idx_patients_referral_slug_unique
on public.patients(referral_slug);

create index if not exists idx_patients_referral_code
on public.patients(referral_code);

create index if not exists idx_patients_referral_slug
on public.patients(referral_slug);

comment on column public.patients.referral_code is 'Código público mostrado ao paciente. Nunca utilizar UUID na interface.';
comment on column public.patients.referral_slug is 'Identificador amigável para URLs.';
comment on column public.patients.total_rewards is 'Valor total já recebido pelo paciente.';
