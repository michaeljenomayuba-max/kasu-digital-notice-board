import { useState, useEffect } from "react";
import { supabase } from "../assets/lib/supabaseClient";

export function useRole() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRole = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.session.user.id)
        .single();

      setRole(profile?.role ?? null);
      setLoading(false);
    };

    getRole();
  }, []);

  return { role, loading };
}
