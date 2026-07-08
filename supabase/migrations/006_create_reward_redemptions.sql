-- Bloco 006: registro de resgates de recompensas por pacientes.

create table if not exists public.reward_redemptions (
    id uuid primary key default gen_random_uuid(),
    clinic_id uuid not null references public.clinics(id) on delete cascade,
    patient_id uuid not null references public.patients(id) on delete cascade,
    reward_id uuid not null references public.reward_catalog(id) on delete cascade,

    points_spent numeric(10,2) not null default 0,
    status text not null default 'pending',
    redeemed_at timestamptz,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists idx_reward_redemptions_clinic_id
on public.reward_redemptions(clinic_id);

create index if not exists idx_reward_redemptions_patient_id
on public.reward_redemptions(patient_id);

create index if not exists idx_reward_redemptions_reward_id
on public.reward_redemptions(reward_id);

create index if not exists idx_reward_redemptions_status
on public.reward_redemptions(status);

create index if not exists idx_reward_redemptions_created_at
on public.reward_redemptions(created_at);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'reward_redemptions_status_check'
    ) THEN
        ALTER TABLE public.reward_redemptions
            ADD CONSTRAINT reward_redemptions_status_check
            CHECK (status IN ('pending', 'approved', 'cancelled'));
    END IF;
END $$;

drop trigger if exists reward_redemptions_updated_at on public.reward_redemptions;

create trigger reward_redemptions_updated_at
before update on public.reward_redemptions
for each row
execute procedure public.set_updated_at();

comment on table public.reward_redemptions is 'Reward redemption records for patients.';
