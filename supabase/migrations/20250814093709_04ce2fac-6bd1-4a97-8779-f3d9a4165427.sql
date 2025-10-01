-- Create jobs table for career opportunities
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  requirements JSONB DEFAULT '[]'::jsonb,
  application_deadline DATE,
  application_instructions TEXT,
  location TEXT,
  employment_type TEXT DEFAULT 'full-time',
  salary_range TEXT,
  is_published BOOLEAN DEFAULT true,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for jobs
CREATE POLICY "Public can view published jobs" 
ON public.jobs 
FOR SELECT 
USING (is_published = true AND deleted_at IS NULL);

CREATE POLICY "Admins can manage jobs" 
ON public.jobs 
FOR ALL 
USING (get_current_user_role() = 'admin'::user_role);

-- Create job_applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  cv_url TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for job applications
CREATE POLICY "Anyone can submit job applications" 
ON public.job_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view job applications" 
ON public.job_applications 
FOR SELECT 
USING (get_current_user_role() = 'admin'::user_role);

CREATE POLICY "Admins can update job applications" 
ON public.job_applications 
FOR UPDATE 
USING (get_current_user_role() = 'admin'::user_role);

-- Create trigger for automatic timestamp updates on jobs
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for automatic timestamp updates on job_applications
CREATE TRIGGER update_job_applications_updated_at
BEFORE UPDATE ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for CV uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('cvs', 'cvs', false);

-- Create policies for CV uploads
CREATE POLICY "Anyone can upload CVs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'cvs');

CREATE POLICY "Admins can view CVs" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'cvs' AND get_current_user_role() = 'admin'::user_role);