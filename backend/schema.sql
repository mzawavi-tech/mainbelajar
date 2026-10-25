-- Jalankan dalam Supabase > SQL Editor
create table if not exists mb_orders(
  id uuid primary key default gen_random_uuid(),
  bill_code text unique,
  name text, email text, phone text,
  product text not null,            -- 'all' atau id game: kira,sifir,baca,lukis,puzzle,pecahan,duit,bahasa,sains,words
  amount int not null,              -- sen
  status text not null default 'pending',  -- pending | paid
  code text,
  created_at timestamptz default now(),
  paid_at timestamptz
);
create table if not exists mb_codes(
  code text primary key,
  product text not null,
  order_id uuid references mb_orders(id),
  devices jsonb not null default '[]',
  max_devices int not null default 3,
  revoked boolean not null default false,
  created_at timestamptz default now()
);
alter table mb_orders enable row level security;
alter table mb_codes enable row level security;
-- tiada policy = hanya service role (edge function) boleh akses
