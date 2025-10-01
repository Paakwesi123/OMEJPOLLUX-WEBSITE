-- Fix RLS issues on storage.objects by enabling RLS (this was the main issue)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;