// Utility placeholder — currently disabled (no sample data added)
import { supabase } from "@/integrations/supabase/client";

export const addSampleData = async () => {
  try {
    console.log("⏩ Sample data seeding is disabled. Nothing to insert.");
    // If you need to add test data in the future,
    // you can re-enable inserts here.
  } catch (error) {
    console.error("❌ Error in addSampleData:", error);
  }
};
