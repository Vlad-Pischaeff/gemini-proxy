export default async (req, context) => {
    console.log("..1.req", req);
    // Netlify processes only POST requests for this function
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { "Content-Type": "application/json" },
        });
    }

    const GEMINI_API_KEY = Netlify.env.get("GEMINI_API_KEY");
    const APP_SECRET_TOKEN = Netlify.env.get("APP_SECRET_TOKEN");
    const GEMINI_URL = "https://generativelanguage.googleapis.com";

    // Authorization check
    const authHeader = req.headers.get("x-app-token");
    if (!authHeader || authHeader !== APP_SECRET_TOKEN) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        const contentType = req.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            throw new Error(`Expected JSON, but got ${contentType}`);
        }

        const rawText = await req.text();
        console.log("Raw body received:", rawText);
    } catch (e) {
        return new Response(
            JSON.stringify({
                error: "Invalid JSON in request",
                details: e.message,
            }),
            { status: 400 },
        );
    }

    let body;

    try {
        // const body = await req.json();
        body = JSON.parse(text); // Пытаемся превратить в объект
        console.log("Raw body received оыщт:", body);
        const geminiResponse = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await geminiResponse.json();

        console.log("..1.data", data);

        return new Response(JSON.stringify(data), {
            status: geminiResponse.status,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Internal Error", details: error.message }),
            { status: 500 },
        );
    }
};

// Path configuration for Netlify
export const config = { path: "/api/proxy" };
