export const STATUS = {
    error: 500,
    badReq: 400,
    notAllow: 405,
    ok: 200,
};

export const RES = {
    error: JSON.stringify({ error: "Internal server error" }),
    notAllow: JSON.stringify({ error: "Method not allowed" }),
    noKey: JSON.stringify({ error: "OpenAI API key not set" }),
    badPrompt: JSON.stringify({ error: "Missing or invalid prompt" }),
    intError: JSON.stringify({ error: "Internal server error" }),
};
