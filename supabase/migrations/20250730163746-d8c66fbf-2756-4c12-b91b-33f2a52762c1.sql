-- Fix the search path security warning
CREATE OR REPLACE FUNCTION auto_delete_trashed_items()
RETURNS void 
SECURITY DEFINER
SET search_path = 'public'
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM public.projects WHERE deleted_at IS NOT NULL AND deleted_at < (now() - interval '30 days');
    DELETE FROM public.services WHERE deleted_at IS NOT NULL AND deleted_at < (now() - interval '30 days');
    DELETE FROM public.events WHERE deleted_at IS NOT NULL AND deleted_at < (now() - interval '30 days');
    DELETE FROM public.products WHERE deleted_at IS NOT NULL AND deleted_at < (now() - interval '30 days');
END;
$$;