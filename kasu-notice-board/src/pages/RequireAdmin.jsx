import { useState } from "react";
import { Navigate } from "react-router";

export function RequireAdmin({children}) {
    const [status, setStatus] = useState("checking");

    if (status === 'checking') return null;
    if (status === 'denied') return <Navigate to="/admin-sign-in" replace />

    return children;
}