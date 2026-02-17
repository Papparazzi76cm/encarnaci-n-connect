
-- Fix 1: Replace permissive "Anyone can insert leads" with validated policy
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

CREATE POLICY "Validated lead insertion"
ON public.leads
FOR INSERT
WITH CHECK (
  char_length(name) > 0 AND char_length(name) <= 100
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND char_length(email) <= 255
  AND (phone IS NULL OR char_length(phone) <= 20)
  AND (message IS NULL OR char_length(message) <= 1000)
  AND source IN ('contact', 'lead_magnet', 'property')
);

-- Fix 2: Add restrictive policies for user_roles (admin-only management)
CREATE POLICY "Only admins can insert user roles"
ON public.user_roles
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update user roles"
ON public.user_roles
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete user roles"
ON public.user_roles
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));
