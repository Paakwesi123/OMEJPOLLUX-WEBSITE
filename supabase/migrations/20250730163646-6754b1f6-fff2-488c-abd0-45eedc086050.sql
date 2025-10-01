-- First, enable RLS on all tables that have policies but RLS is disabled
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Add new columns to projects table for full detail entry
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS objectives jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS methodologies jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS deliverables jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS expected_impact jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS milestones jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS team_members jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS budget text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS client text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS start_date text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS end_date text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS media_urls jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS deleted_at timestamp with time zone;

-- Add new columns to services table for full detail entry
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS features jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS pricing jsonb DEFAULT '{}'::jsonb;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS duration text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS requirements jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS outcomes jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS deleted_at timestamp with time zone;

-- Add new columns to events table for full detail entry
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS agenda jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS speakers jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS prerequisites jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS price numeric DEFAULT 0;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS contact_info jsonb DEFAULT '{}'::jsonb;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS deleted_at timestamp with time zone;

-- Add new columns to products table for full detail entry
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS specifications jsonb DEFAULT '{}'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS features jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS images jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS vendor text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS warranty_info text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS deleted_at timestamp with time zone;

-- Enhance form_submissions table with better categorization
ALTER TABLE public.form_submissions ADD COLUMN IF NOT EXISTS submission_category text;
ALTER TABLE public.form_submissions ADD COLUMN IF NOT EXISTS related_item_id uuid;
ALTER TABLE public.form_submissions ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';
ALTER TABLE public.form_submissions ADD COLUMN IF NOT EXISTS admin_notes text;

-- Create function to auto-delete trashed items after 30 days
CREATE OR REPLACE FUNCTION auto_delete_trashed_items()
RETURNS void AS $$
BEGIN
    DELETE FROM public.projects WHERE deleted_at IS NOT NULL AND deleted_at < (now() - interval '30 days');
    DELETE FROM public.services WHERE deleted_at IS NOT NULL AND deleted_at < (now() - interval '30 days');
    DELETE FROM public.events WHERE deleted_at IS NOT NULL AND deleted_at < (now() - interval '30 days');
    DELETE FROM public.products WHERE deleted_at IS NOT NULL AND deleted_at < (now() - interval '30 days');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies to respect published and deleted status
DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects" ON public.projects
FOR SELECT USING (is_published = true AND deleted_at IS NULL);

DROP POLICY IF EXISTS "Public can view services" ON public.services;
CREATE POLICY "Public can view services" ON public.services
FOR SELECT USING (is_published = true AND deleted_at IS NULL);

DROP POLICY IF EXISTS "Public can view events" ON public.events;
CREATE POLICY "Public can view events" ON public.events
FOR SELECT USING (is_published = true AND deleted_at IS NULL);

DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products" ON public.products
FOR SELECT USING (is_published = true AND deleted_at IS NULL);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_published_deleted ON public.projects(is_published, deleted_at);
CREATE INDEX IF NOT EXISTS idx_services_published_deleted ON public.services(is_published, deleted_at);
CREATE INDEX IF NOT EXISTS idx_events_published_deleted ON public.events(is_published, deleted_at);
CREATE INDEX IF NOT EXISTS idx_products_published_deleted ON public.products(is_published, deleted_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_category ON public.form_submissions(submission_category);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON public.form_submissions(status);