import { supabase } from "@/integrations/supabase/client";

interface LeadNotification {
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  source: string;
  property_id?: string | null;
  interested_in?: string | null;
}

export const notifyNewLead = async (lead: LeadNotification) => {
  try {
    await supabase.functions.invoke("notify-lead", {
      body: lead,
    });
  } catch (error) {
    // Don't block form submission if notification fails
    console.error("Failed to send lead notification:", error);
  }
};
