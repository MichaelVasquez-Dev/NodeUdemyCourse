const isAdminRole = (req, res, next) => {
    if (!req.user) return res.status(500).json({ msg: "Token not validated" });

    const { role } = req.user;

    if (role !== "ADMIN_ROLE") return res.status(403).json({ msg: "Unauthorized." });
    next();
}

const isPermittedRole = ( roles ) => {

    return (req, res, next) => {
        if (!req.user) return res.status(500).json({ msg: "Token not validated" });

        const { role } = req.user;

        if (!roles.includes("PUBLIC") && !roles.includes(role)) return res.status(403).json({ msg: `Unauthorized. Role: ${role}` });
        next();
    }
}

module.exports = {
    isAdminRole,
    isPermittedRole
}