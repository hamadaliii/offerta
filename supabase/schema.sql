-- Vox-Offert Supabase Schema

CREATE TABLE quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID, -- For authentication (optional in MVP)
  client_name TEXT NOT NULL,
  client_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  items_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  total NUMERIC NOT NULL DEFAULT 0,
  tax NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, sent, paid
  payment_link TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- For MVP purposes without strict auth:
CREATE POLICY "Allow all operations for MVP" ON quotes FOR ALL USING (true);

CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE,
  company_name TEXT NOT NULL,
  org_nr TEXT,
  address TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  default_tax_rate NUMERIC DEFAULT 25
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for MVP profiles" ON profiles FOR ALL USING (true);
