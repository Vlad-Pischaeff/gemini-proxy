export const config = {
    runtime: "edge",
};

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const APP_SECRET_TOKEN = process.env.APP_SECRET_TOKEN; // Твой секрет
// const GEMINI_URL =
//     "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_URL =
    "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

export default async function handler(req) {
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
        });
    }

    // Проверка авторизации
    const authHeader = req.headers.get("x-app-token");
    if (!authHeader || authHeader !== APP_SECRET_TOKEN) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    if (!GEMINI_API_KEY) {
        return new Response(JSON.stringify({ error: "Server configuration error" }), {
            status: 500,
        });
    }

    try {
        const body = await req.json();

        const geminiResponse = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await geminiResponse.json();

        return new Response(JSON.stringify(data), {
            status: geminiResponse.status,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Internal Error", details: error.message }),
            {
                status: 500,
            },
        );
    }
}
