-- Fix function search path warning by setting proper search path for the update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Create security definer function to check user role to prevent infinite recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
    SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$;

-- Update RLS policies to use the security definer function
DROP POLICY IF EXISTS "Admins can view form submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage events" ON public.events;

-- Recreate admin policies using the security definer function
CREATE POLICY "Admins can view form submissions" ON public.form_submissions 
FOR SELECT USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can manage projects" ON public.projects 
FOR ALL USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can manage services" ON public.services 
FOR ALL USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can manage products" ON public.products 
FOR ALL USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can manage events" ON public.events 
FOR ALL USING (public.get_current_user_role() = 'admin');

-- Update storage policies to use the security definer function
DROP POLICY IF EXISTS "Admins can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload project videos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload service images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload event images" ON storage.objects;

CREATE POLICY "Admins can upload project images" ON storage.objects 
FOR INSERT WITH CHECK (
    bucket_id = 'project-images' AND 
    public.get_current_user_role() = 'admin'
);

CREATE POLICY "Admins can upload project videos" ON storage.objects 
FOR INSERT WITH CHECK (
    bucket_id = 'project-videos' AND 
    public.get_current_user_role() = 'admin'
);

CREATE POLICY "Admins can upload service images" ON storage.objects 
FOR INSERT WITH CHECK (
    bucket_id = 'service-images' AND 
    public.get_current_user_role() = 'admin'
);

CREATE POLICY "Admins can upload product images" ON storage.objects 
FOR INSERT WITH CHECK (
    bucket_id = 'product-images' AND 
    public.get_current_user_role() = 'admin'
);

CREATE POLICY "Admins can upload event images" ON storage.objects 
FOR INSERT WITH CHECK (
    bucket_id = 'event-images' AND 
    public.get_current_user_role() = 'admin'
);

-- Create trigger to auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    'user'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();