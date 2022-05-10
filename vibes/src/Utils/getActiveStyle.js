export const getActiveStyle = ({ isActive }) => 
        isActive ? {
            backgroundColor: "var(--primary)",
            borderRadius: "50%",
            color: "var(--white)"
        } : {};