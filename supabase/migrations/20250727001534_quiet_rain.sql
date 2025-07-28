/*
  # Create DJs table

  1. New Tables
    - `djs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `bio` (text, optional)
      - `location` (text)
      - `event_types` (text array)
      - `price_range` (text, optional)
      - `availability_status` (text, default 'available')
      - `facebook_url` (text, optional)
      - `instagram_url` (text, optional)
      - `website_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `djs` table
    - Add policy for public read access
    - Add policy for DJs to update their own profiles
*/

CREATE TABLE IF NOT EXISTS djs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  bio text,
  location text NOT NULL,
  event_types text[] NOT NULL DEFAULT '{}',
  price_range text,
  availability_status text DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'unavailable')),
  facebook_url text,
  instagram_url text,
  website_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE djs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read DJ profiles"
  ON djs
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "DJs can update own profile"
  ON djs
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());