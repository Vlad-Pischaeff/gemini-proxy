export const config = { runtime: "edge" };

export default async function handler(req) {
    const authHeader = req.headers.get("x-app-token");
    if (authHeader !== process.env.APP_SECRET_TOKEN) {
        return new Response("Unauthorized", { status: 401 });
    }

    // Можно просто отдать ключ, но лучше замаскировать его в JSON
    return new Response(
        JSON.stringify({
            k: process.env.GEMINI_API_KEY,
        }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" },
        },
    );
}
