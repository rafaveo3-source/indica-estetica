-- Bloco 011: ledger de wallet para transações de crédito e débito.

create table if not exists public.wallet_transactions (
    id uuid primary key,
    clinic_id uuid not null references public.clinics(id) on delete restrict,
    patient_id uuid not null references public.patients(id) on delete restrict,
    type text check (type in ('credit', 'debit')),
    source text check (source in ('referral', 'redemption', 'manual')),
    reference_id uuid,
    amount numeric(10,2) not null,
    description text,
    created_by uuid,
    created_at timestamptz default now()
);

create index if not exists idx_wallet_transactions_clinic_id
on public.wallet_transactions (clinic_id);

create index if not exists idx_wallet_transactions_patient_id
on public.wallet_transactions (patient_id);

create index if not exists idx_wallet_transactions_type
on public.wallet_transactions (type);

create index if not exists idx_wallet_transactions_source
on public.wallet_transactions (source);

create index if not exists idx_wallet_transactions_created_at
on public.wallet_transactions (created_at);

comment on table public.wallet_transactions is 'Ledger de transações da Wallet. O saldo é calculado a partir destas entradas e nunca deve ser armazenado nesta tabela.';
comment on column public.wallet_transactions.clinic_id is 'Clínica responsável pela transação.';
comment on column public.wallet_transactions.patient_id is 'Paciente associado à transação.';
comment on column public.wallet_transactions.type is 'Tipo da movimentação: crédito ou débito.';
comment on column public.wallet_transactions.source is 'Origem da movimentação: indicação, resgate ou manual.';
comment on column public.wallet_transactions.amount is 'Valor monetário da transação. O saldo calculado deve ser derivado do ledger e não armazenado nesta tabela.';
comment on column public.wallet_transactions.description is 'Descrição da movimentação.';
comment on column public.wallet_transactions.created_at is 'Data de criação da transação.';
