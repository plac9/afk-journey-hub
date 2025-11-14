-- ============================================================================
-- AFK Journey Hub - Supabase Bootstrap SQL
-- ============================================================================
-- This script initializes the database schema for telemetry and analytics.
-- Run this in the Supabase SQL Editor after creating your project.
--
-- Usage:
--   1. Log into Supabase dashboard (https://supabase.com/dashboard)
--   2. Select your afk-journey-hub project
--   3. Go to SQL Editor > New Query
--   4. Paste this entire file
--   5. Click "Run"
--   6. Verify tables created in Table Editor
--
-- Last Updated: 2025-11-14
-- Version: 1.0.0
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- Calculator Usage Telemetry
-- ============================================================================
-- Tracks usage of calculator tools (AFK Timer, Dream Realm, Pity, ARC)
-- Used for analytics and understanding user behavior

CREATE TABLE IF NOT EXISTS calculator_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

  -- Calculator identification
  tool_name TEXT NOT NULL,                -- e.g., "afk", "dream-realm", "pity", "arc"

  -- Input parameters (stored as JSONB for flexibility)
  params JSONB NOT NULL,                  -- e.g., {"idleHours": 8, "stage": 12}

  -- Output results (stored as JSONB)
  result JSONB,                           -- e.g., {"gold": 1000, "diamonds": 50}

  -- Session metadata
  user_agent TEXT,                        -- Browser/client user agent
  ip_address INET,                        -- User IP (anonymized recommended)
  referrer TEXT,                          -- HTTP referrer

  -- Performance metrics
  execution_time_ms INTEGER,              -- Time taken to calculate (milliseconds)

  -- Feature flags / metadata
  metadata JSONB DEFAULT '{}'::JSONB      -- Additional flexible metadata
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_calculator_usage_tool_name
  ON calculator_usage(tool_name);

CREATE INDEX IF NOT EXISTS idx_calculator_usage_created_at
  ON calculator_usage(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_calculator_usage_tool_and_date
  ON calculator_usage(tool_name, created_at DESC);

-- GIN index for JSONB queries
CREATE INDEX IF NOT EXISTS idx_calculator_usage_params
  ON calculator_usage USING GIN(params);

CREATE INDEX IF NOT EXISTS idx_calculator_usage_metadata
  ON calculator_usage USING GIN(metadata);

-- Enable Row Level Security (RLS)
ALTER TABLE calculator_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow service_role (backend) to insert/select
CREATE POLICY "Service role can manage calculator_usage"
  ON calculator_usage
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policy: Anonymous users cannot access (backend-only table)
CREATE POLICY "Anonymous users cannot access calculator_usage"
  ON calculator_usage
  FOR SELECT
  TO anon
  USING (false);

-- ============================================================================
-- Analytics Views
-- ============================================================================
-- Convenient views for analyzing calculator usage

-- View: Calculator usage summary by tool
CREATE OR REPLACE VIEW calculator_usage_summary AS
SELECT
  tool_name,
  COUNT(*) as total_uses,
  COUNT(DISTINCT DATE(created_at)) as active_days,
  MIN(created_at) as first_use,
  MAX(created_at) as last_use,
  AVG(execution_time_ms) as avg_execution_time_ms
FROM calculator_usage
GROUP BY tool_name
ORDER BY total_uses DESC;

-- View: Daily usage statistics
CREATE OR REPLACE VIEW calculator_daily_stats AS
SELECT
  DATE(created_at) as usage_date,
  tool_name,
  COUNT(*) as usage_count,
  AVG(execution_time_ms) as avg_execution_time_ms
FROM calculator_usage
GROUP BY DATE(created_at), tool_name
ORDER BY usage_date DESC, usage_count DESC;

-- View: Recent calculator usage (last 100 entries)
CREATE OR REPLACE VIEW calculator_recent_usage AS
SELECT
  id,
  created_at,
  tool_name,
  params,
  result,
  execution_time_ms
FROM calculator_usage
ORDER BY created_at DESC
LIMIT 100;

-- ============================================================================
-- Functions for Common Operations
-- ============================================================================

-- Function: Get calculator statistics for a date range
CREATE OR REPLACE FUNCTION get_calculator_stats(
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE
)
RETURNS TABLE (
  tool_name TEXT,
  usage_count BIGINT,
  avg_execution_time NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    cu.tool_name,
    COUNT(*)::BIGINT as usage_count,
    ROUND(AVG(cu.execution_time_ms), 2) as avg_execution_time
  FROM calculator_usage cu
  WHERE cu.created_at BETWEEN start_date AND end_date
  GROUP BY cu.tool_name
  ORDER BY usage_count DESC;
END;
$$ LANGUAGE plpgsql;

-- Function: Get popular calculator parameters
CREATE OR REPLACE FUNCTION get_popular_calculator_params(
  p_tool_name TEXT,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  params JSONB,
  usage_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    cu.params,
    COUNT(*)::BIGINT as usage_count
  FROM calculator_usage cu
  WHERE cu.tool_name = p_tool_name
  GROUP BY cu.params
  ORDER BY usage_count DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Data Retention Policy (Optional)
-- ============================================================================
-- Automatically delete records older than 1 year to manage storage
-- Uncomment to enable:

-- CREATE EXTENSION IF NOT EXISTS pg_cron;
--
-- SELECT cron.schedule(
--   'delete-old-calculator-usage',
--   '0 2 * * 0',  -- Every Sunday at 2 AM
--   $$
--   DELETE FROM calculator_usage
--   WHERE created_at < NOW() - INTERVAL '1 year';
--   $$
-- );

-- ============================================================================
-- Test Data (Optional - for development/testing)
-- ============================================================================
-- Uncomment to insert sample data for testing:

-- INSERT INTO calculator_usage (tool_name, params, result, execution_time_ms) VALUES
--   ('afk', '{"idleHours": 8, "stage": 12}'::JSONB, '{"gold": 50000, "diamonds": 100}'::JSONB, 15),
--   ('dream-realm', '{"boss": "Brutus", "damage": 5000000}'::JSONB, '{"rank": "Diamond", "rewards": 5000}'::JSONB, 22),
--   ('pity', '{"currentPulls": 45, "targetRarity": "Mythic+"}'::JSONB, '{"pullsUntilPity": 5}'::JSONB, 8),
--   ('arc', '{"currentTier": 3, "targetTier": 5}'::JSONB, '{"cardsNeeded": 150, "goldCost": 2000000}'::JSONB, 12);

-- ============================================================================
-- Verification Queries
-- ============================================================================
-- Run these after bootstrap to verify everything is set up correctly:

-- Check table exists and structure
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'calculator_usage'
-- ORDER BY ordinal_position;

-- Check indexes
-- SELECT indexname, indexdef
-- FROM pg_indexes
-- WHERE tablename = 'calculator_usage';

-- Check RLS policies
-- SELECT policyname, permissive, roles, cmd, qual
-- FROM pg_policies
-- WHERE tablename = 'calculator_usage';

-- Check views
-- SELECT viewname FROM pg_views WHERE schemaname = 'public';

-- Check functions
-- SELECT routine_name, routine_type
-- FROM information_schema.routines
-- WHERE routine_schema = 'public'
-- AND routine_name LIKE '%calculator%';

-- ============================================================================
-- Post-Installation Steps
-- ============================================================================
-- After running this script:
--
-- 1. Verify tables created:
--    - Go to Table Editor in Supabase dashboard
--    - Confirm 'calculator_usage' table exists with correct columns
--
-- 2. Test insert:
--    curl -X POST https://your-site.com/api/tools/afk \
--      -H "Content-Type: application/json" \
--      -d '{"idleHours": 8, "stage": 12}'
--    - Check calculator_usage table for new row
--
-- 3. Test views:
--    SELECT * FROM calculator_usage_summary;
--    SELECT * FROM calculator_daily_stats LIMIT 10;
--
-- 4. Copy API credentials:
--    - Go to Project Settings > API
--    - Copy Project URL → SUPABASE_URL
--    - Copy anon key → NEXT_PUBLIC_SUPABASE_ANON_KEY
--    - Copy service_role key → SUPABASE_SERVICE_ROLE_KEY
--
-- 5. Add credentials to .env.local and Vercel:
--    See docs/GITHUB_SETUP.md Step 5 for details
--
-- ============================================================================

-- Success message
DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'AFK Journey Hub database initialized!';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Tables created: calculator_usage';
  RAISE NOTICE 'Views created: calculator_usage_summary, calculator_daily_stats, calculator_recent_usage';
  RAISE NOTICE 'Functions created: get_calculator_stats, get_popular_calculator_params';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Verify in Table Editor';
  RAISE NOTICE '2. Copy API credentials from Project Settings > API';
  RAISE NOTICE '3. Add to .env.local and Vercel environment variables';
  RAISE NOTICE '4. Test telemetry with a calculator API call';
  RAISE NOTICE '========================================';
END $$;
