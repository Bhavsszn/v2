/*
  # Insert sample data

  1. Sample Data
    - Create sample users (clients and DJs)
    - Create sample DJ profiles
    - Create sample reviews
    - Create sample bookings

  Note: This is for development/testing purposes
*/

-- Insert sample users
INSERT INTO users (id, email, password_hash, role, name, phone, avatar_url) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'djair@example.com', '$2b$10$dummy.hash.for.demo', 'dj', 'DJ Air', '402.555.1001', 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
  ('550e8400-e29b-41d4-a716-446655440002', 'djtaylorg@example.com', '$2b$10$dummy.hash.for.demo', 'dj', 'DJ Taylor G', '402.555.1002', 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
  ('550e8400-e29b-41d4-a716-446655440003', 'djhenny@example.com', '$2b$10$dummy.hash.for.demo', 'dj', 'DJ Henny', '402.555.1003', 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
  ('550e8400-e29b-41d4-a716-446655440004', 'client1@example.com', '$2b$10$dummy.hash.for.demo', 'client', 'The Loft - Kearney, NE', '308.555.2001', null),
  ('550e8400-e29b-41d4-a716-446655440005', 'client2@example.com', '$2b$10$dummy.hash.for.demo', 'client', 'Bar 30 - Omaha, NE', '402.555.2002', null),
  ('550e8400-e29b-41d4-a716-446655440006', 'client3@example.com', '$2b$10$dummy.hash.for.demo', 'client', 'The Copper Cup - Des Moines, IA', '515.555.2003', null)
ON CONFLICT (id) DO NOTHING;

-- Insert sample DJ profiles
INSERT INTO djs (id, user_id, bio, location, event_types, price_range, availability_status, facebook_url) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Professional DJ with 10+ years of experience specializing in weddings and corporate events.', 'Des Moines, IA', ARRAY['WEDDINGS', 'CLUBS', 'PARTIES', 'PROMS', 'OTHER'], '$500-1000', 'available', 'https://www.facebook.com/djair'),
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'High-energy DJ specializing in club nights and private parties.', 'Des Moines, IA', ARRAY['WEDDINGS', 'CLUBS', 'PARTIES', 'PROMS', 'OTHER'], '$400-800', 'available', null),
  ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Versatile DJ with experience in all types of events and music genres.', 'Des Moines, IA', ARRAY['WEDDINGS', 'CLUBS', 'PARTIES', 'PROMS', 'OTHER'], '$600-1200', 'available', null)
ON CONFLICT (id) DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (dj_id, client_id, rating, comment, verified, created_at) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', 5, 'Incredible Energy! First time having him here & cant wait to have him back!', true, now() - interval '3 months'),
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440005', 5, 'Our Regular House DJ was NEVER disappoints. We have regulars who only come when he plays!', true, now() - interval '3 months'),
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440006', 5, 'First time booking him so didnt know what to expect but would QUICKLY book again.', true, now() - interval '2 months')
ON CONFLICT DO NOTHING;