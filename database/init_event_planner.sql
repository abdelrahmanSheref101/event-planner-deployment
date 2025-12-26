-- Connect to the new database
\c event_planner;


DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'event_user') THEN
    CREATE USER event_user WITH PASSWORD 'backend_pass';
  END IF;
END $$;

--3️⃣Grant privileges to the backend user
GRANT CONNECT ON DATABASE "event_planner" TO event_user;
\c event_planner;

GRANT USAGE ON SCHEMA public TO event_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO event_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO event_user;
