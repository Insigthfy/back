export function extractToken(headers: { authorization?: string }): string | null {
    const authHeader = headers.authorization;

    if (!authHeader) {
        return null;
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer") {
        console.warn("Invalid authorization type:", type);
        return null;
    }

    return token ?? null;
}
