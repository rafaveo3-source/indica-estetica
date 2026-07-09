-- Bloco 010: habilita row level security para as tabelas do domínio multi-tenant.

alter table public.clinics enable row level security;
alter table public.patients enable row level security;
alter table public.referrals enable row level security;
alter table public.reward_catalog enable row level security;
alter table public.reward_redemptions enable row level security;
alter table public.promotions enable row level security;

comment on table public.clinics is 'TODO: Policies serão implementadas após integração completa com Supabase Auth. Cada registro pertence a uma clínica. Toda consulta futura deverá respeitar clinic_id.';
comment on table public.patients is 'TODO: Policies serão implementadas após integração completa com Supabase Auth. Cada registro pertence a uma clínica. Toda consulta futura deverá respeitar clinic_id.';
comment on table public.referrals is 'TODO: Policies serão implementadas após integração completa com Supabase Auth. Cada registro pertence a uma clínica. Toda consulta futura deverá respeitar clinic_id.';
comment on table public.reward_catalog is 'TODO: Policies serão implementadas após integração completa com Supabase Auth. Cada registro pertence a uma clínica. Toda consulta futura deverá respeitar clinic_id.';
comment on table public.reward_redemptions is 'TODO: Policies serão implementadas após integração completa com Supabase Auth. Cada registro pertence a uma clínica. Toda consulta futura deverá respeitar clinic_id.';
comment on table public.promotions is 'TODO: Policies serão implementadas após integração completa com Supabase Auth. Cada registro pertence a uma clínica. Toda consulta futura deverá respeitar clinic_id.';
