/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `client_id` (uuid, foreign key to users)
      - `dj_id` (uuid, foreign key to djs)
      - `event_date` (date)
      - `event_time` (time)
      - `event_type` (text)
      - `venue` (text)
      - `guest_count` (integer, optional)
      - `budget_range` (text, optional)
      - `special_requests` (text, optional)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `bookings` table
    - Add policy for clients to read their own bookings
    - Add policy for DJs to read bookings for their services
    - Add policy for authenticated users to create bookings
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES users(id) ON DELETE CASCADE,
  dj_id uuid REFERENCES djs(id) ON DELETE CASCADE,
  event_date date NOT NULL,
  event_time time NOT NULL,
  event_type text NOT NULL,
  venue text NOT NULL,
  guest_count integer,
  budget_range text,
  special_requests text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "DJs can read bookings for their services"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (dj_id IN (SELECT id FROM djs WHERE user_id = auth.uid()));

CREATE POLICY "Authenticated users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());