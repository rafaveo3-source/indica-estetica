-- Bloco 008: hardening do banco para produção sem alterar o modelo base existente.

-- PARTE 1: ampliar a tabela de clínicas com branding e contato adicional.
alter table public.clinics
    add column if not exists whatsapp text,
    add column if not exists primary_color text default '#6D5DF6',
    add column if not exists secondary_color text default '#FFFFFF';

-- PARTE 2: adicionar ordenação e CTA para campanhas promocionais.
alter table public.promotions
    add column if not exists display_order integer not null default 0,
    add column if not exists button_text text default 'Agendar pelo WhatsApp',
    add column if not exists button_url text;

create index if not exists idx_promotions_display_order
on public.promotions(display_order);

-- PARTE 3: adicionar unicidade composta para pacientes, permitindo valores NULL de forma segura.
do $$
begin
    if not exists (
        select 1
        from pg_constraint
        where conname = 'patients_clinic_id_cpf_key'
    ) then
        alter table public.patients
            add constraint patients_clinic_id_cpf_key unique (clinic_id, cpf);
    end if;
end $$;

do $$
begin
    if not exists (
        select 1
        from pg_constraint
        where conname = 'patients_clinic_id_phone_key'
    ) then
        alter table public.patients
            add constraint patients_clinic_id_phone_key unique (clinic_id, phone);
    end if;
end $$;

do $$
begin
    if not exists (
        select 1
        from pg_constraint
        where conname = 'patients_clinic_id_email_key'
    ) then
        alter table public.patients
            add constraint patients_clinic_id_email_key unique (clinic_id, email);
    end if;
end $$;

-- PARTE 4: renomear o campo de valor da recompensa para refletir o domínio monetário.
do $$
begin
    if exists (
        select 1
        from information_schema.columns
        where table_schema = 'public'
          and table_name = 'reward_catalog'
          and column_name = 'points_cost'
    ) and not exists (
        select 1
        from information_schema.columns
        where table_schema = 'public'
          and table_name = 'reward_catalog'
          and column_name = 'reward_value'
    ) then
        alter table public.reward_catalog
            rename column points_cost to reward_value;
    end if;
end $$;

comment on column public.reward_catalog.reward_value is 'Representa o valor monetário do benefício disponível para resgate.';

-- PARTE 5: renomear o campo de uso do resgate para refletir o valor monetário.
do $$
begin
    if exists (
        select 1
        from information_schema.columns
        where table_schema = 'public'
          and table_name = 'reward_redemptions'
          and column_name = 'points_spent'
    ) and not exists (
        select 1
        from information_schema.columns
        where table_schema = 'public'
          and table_name = 'reward_redemptions'
          and column_name = 'amount_used'
    ) then
        alter table public.reward_redemptions
            rename column points_spent to amount_used;
    end if;
end $$;

comment on column public.reward_redemptions.amount_used is 'Valor monetário utilizado pelo paciente no resgate.';

-- PARTE 6: revisar FKs para preservar histórico de negócio em vez de apagar dados por cascata.
-- As FKs de dados técnicos permanecem com cascata quando fizer sentido; demais relações de negócio foram mantidas com RESTRICT.

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_schema = 'public'
          AND table_name = 'referrals'
          AND constraint_name = 'referrals_patient_id_fkey'
    ) THEN
        ALTER TABLE public.referrals
            DROP CONSTRAINT IF EXISTS referrals_patient_id_fkey;
        ALTER TABLE public.referrals
            ADD CONSTRAINT referrals_patient_id_fkey
            FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE RESTRICT;
    END IF;
END $$;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_schema = 'public'
          AND table_name = 'reward_redemptions'
          AND constraint_name = 'reward_redemptions_patient_id_fkey'
    ) THEN
        ALTER TABLE public.reward_redemptions
            DROP CONSTRAINT IF EXISTS reward_redemptions_patient_id_fkey;
        ALTER TABLE public.reward_redemptions
            ADD CONSTRAINT reward_redemptions_patient_id_fkey
            FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE RESTRICT;
    END IF;
END $$;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_schema = 'public'
          AND table_name = 'reward_redemptions'
          AND constraint_name = 'reward_redemptions_reward_id_fkey'
    ) THEN
        ALTER TABLE public.reward_redemptions
            DROP CONSTRAINT IF EXISTS reward_redemptions_reward_id_fkey;
        ALTER TABLE public.reward_redemptions
            ADD CONSTRAINT reward_redemptions_reward_id_fkey
            FOREIGN KEY (reward_id) REFERENCES public.reward_catalog(id) ON DELETE RESTRICT;
    END IF;
END $$;

-- PARTE 7: comentários de domínio para facilitar a manutenção futura.
comment on table public.patients is 'Multi-tenant patient wallet model for the Indica Estética ecosystem.';
comment on table public.reward_catalog is 'Reward catalog with wallet-style benefits available for redemption.';
comment on table public.reward_redemptions is 'Reward redemption history using the wallet model.';
comment on table public.clinics is 'Multi-tenant core entity that owns patients, referrals, rewards and promotions.';
