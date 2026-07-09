-- Bloco 012: pipeline operacional para indicações sem alterar o status de resultado.

alter table public.referrals
    add column if not exists pipeline_stage text default 'new';

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'referrals_pipeline_stage_check'
    ) THEN
        ALTER TABLE public.referrals
            ADD CONSTRAINT referrals_pipeline_stage_check
            CHECK (pipeline_stage IN ('new', 'contacted', 'scheduled', 'completed', 'credited'));
    END IF;
END $$;

create index if not exists idx_referrals_pipeline_stage
on public.referrals(pipeline_stage);

comment on column public.referrals.pipeline_stage is 'Fluxo operacional da indicação, independente do status final.';
