-- Radar de Pisos - Database Schema (Supabase)

-- 1. Profiles Table (Extends Auth Users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone_number TEXT,
  is_subscribed BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Search Preferences Table
CREATE TABLE search_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  city TEXT NOT NULL,
  max_price INTEGER,
  min_rooms INTEGER,
  min_size INTEGER, -- m2
  property_types TEXT[], -- ['piso', 'casa', 'estudio']
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Detected Listings Table (Global Registry)
CREATE TABLE detected_listings (
  id TEXT PRIMARY KEY, -- Portal ID (e.g., 'id-1234')
  url TEXT NOT NULL,
  title TEXT,
  price INTEGER,
  city TEXT,
  thumbnail_url TEXT,
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Sent Alerts Table
CREATE TABLE sent_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  listing_id TEXT REFERENCES detected_listings(id) NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE detected_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sent_alerts ENABLE ROW LEVEL SECURITY;

-- Policies

-- Profiles: Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Search Preferences: Users can see and edit their own preferences
CREATE POLICY "Users can view own preferences" ON search_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON search_preferences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own preferences" ON search_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own preferences" ON search_preferences FOR DELETE USING (auth.uid() = user_id);

-- Detected Listings: Everyone can view (public)
CREATE POLICY "Anyone can view listings" ON detected_listings FOR SELECT USING (true);

-- Sent Alerts: Users can only see their own alerts
CREATE POLICY "Users can view own alerts" ON sent_alerts FOR SELECT USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER set_updated_at_preferences BEFORE UPDATE ON search_preferences FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
