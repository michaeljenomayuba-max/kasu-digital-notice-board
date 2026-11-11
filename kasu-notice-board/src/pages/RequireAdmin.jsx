import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { supabase } from "../assets/lib/supabaseClient";

export function RequireAdmin({children}) {
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        const checkAccess = async () => {
            const {data} = await supabase.auth.getSession();

            if (!data.session) {
                setStatus("denied");
                return;
            }

            const {data: profile} = await supabase
                .from("profiles")
                .select()
                .eq('id', data.session.user.id)
                .single();
            
            if (profile?.role === "admin") {
                setStatus("allowed");
            }
            else {
                setStatus("denied");
            }
        };

        checkAccess();
    }, []);

    if (status === 'checking') return null;
    if (status === 'denied') return <Navigate to="/admin-sign-in" replace />

    return children;
}