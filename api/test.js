export const config = {
    runtime: "edge",
};

export default async function handler() {
    return new Response("Hello from Edge!", {
        headers: { "Content-Type": "text/plain" },
    });
}
