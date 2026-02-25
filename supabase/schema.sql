-- Supabase Schema for Bo-Biseo
-- Run this in the Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===== Users table =====
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR(20),
  name VARCHAR(50),
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== Policies (insurance policies) =====
CREATE TABLE IF NOT EXISTS policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  insurer VARCHAR(50) NOT NULL,
  product_name VARCHAR(200) NOT NULL,
  contract_date DATE,
  main_coverage TEXT,
  ocr_raw_data JSONB,
  status VARCHAR(20) DEFAULT 'analyzing' CHECK (status IN ('analyzing', 'completed', 'error')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_policies_user_id ON policies(user_id);

-- ===== Riders (policy add-ons) =====
CREATE TABLE IF NOT EXISTS riders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  policy_id UUID REFERENCES policies(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  coverage_amount INTEGER DEFAULT 0,
  matched BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_riders_policy_id ON riders(policy_id);

-- ===== Scanned Documents =====
CREATE TABLE IF NOT EXISTS scanned_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  doc_type VARCHAR(30) NOT NULL CHECK (doc_type IN ('prescription', 'surgery', 'opinion', 'treatment')),
  image_url TEXT,
  ocr_raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_scanned_docs_user_id ON scanned_documents(user_id);

-- ===== KCD Codes (extracted disease codes) =====
CREATE TABLE IF NOT EXISTS kcd_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID REFERENCES scanned_documents(id) ON DELETE CASCADE,
  code VARCHAR(10) NOT NULL,
  disease_name VARCHAR(200) NOT NULL,
  department VARCHAR(50),
  confidence FLOAT DEFAULT 0 CHECK (confidence >= 0 AND confidence <= 1)
);

CREATE INDEX idx_kcd_codes_document_id ON kcd_codes(document_id);

-- ===== Claims =====
CREATE TABLE IF NOT EXISTS claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  policy_id UUID REFERENCES policies(id) ON DELETE SET NULL,
  kcd_code_id UUID REFERENCES kcd_codes(id) ON DELETE SET NULL,
  total_amount INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'docs_preparing' CHECK (status IN ('docs_preparing', 'analyzing', 'matched', 'submitted')),
  receipt_number VARCHAR(50),
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_claims_user_id ON claims(user_id);

-- ===== Claim Items (detailed items per claim) =====
CREATE TABLE IF NOT EXISTS claim_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  claim_id UUID REFERENCES claims(id) ON DELETE CASCADE,
  rider_id UUID REFERENCES riders(id) ON DELETE SET NULL,
  matched_amount INTEGER DEFAULT 0,
  confidence FLOAT DEFAULT 0 CHECK (confidence >= 0 AND confidence <= 1)
);

CREATE INDEX idx_claim_items_claim_id ON claim_items(claim_id);

-- ===== Row Level Security =====
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE riders ENABLE ROW LEVEL SECURITY;
ALTER TABLE scanned_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE kcd_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_items ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own policies" ON policies
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own riders" ON riders
  FOR SELECT USING (
    policy_id IN (SELECT id FROM policies WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can view own scanned docs" ON scanned_documents
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own kcd codes" ON kcd_codes
  FOR SELECT USING (
    document_id IN (SELECT id FROM scanned_documents WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can view own claims" ON claims
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own claim items" ON claim_items
  FOR SELECT USING (
    claim_id IN (SELECT id FROM claims WHERE user_id = auth.uid())
  );

-- ===== Storage Bucket =====
-- Create via Supabase Dashboard:
-- Bucket name: documents
-- Public: false
-- File size limit: 10MB
-- Allowed MIME types: image/jpeg, image/png, application/pdf
