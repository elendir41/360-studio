CREATE TYPE key_status AS ENUM ('default', 'valid', 'invalid', 'expired');
CREATE TYPE key_type AS ENUM (
  'aead-ietf',
  'aead-det',
  'hmacsha512',
  'hmacsha256',
  'auth',
  'shorthash',
  'generichash',
  'kdf',
  'secretbox',
  'secretstream',
  'stream_xchacha20'
);
CREATE TYPE factor_type AS ENUM ('totp', 'webauthn');
CREATE TYPE factor_status AS ENUM ('unverified', 'verified');
CREATE TYPE aal_level AS ENUM ('aal1', 'aal2', 'aal3');
CREATE TYPE code_challenge_method AS ENUM ('s256', 'plain');

CREATE TABLE medias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  ext TEXT,
  size NUMERIC,
  type TEXT,
  url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_medias_name ON medias (name);
CREATE INDEX idx_medias_type ON medias (type);
CREATE INDEX idx_medias_created_at ON medias (created_at);

INSERT INTO storage.buckets (id, name, public) VALUES ('default', 'default', false);