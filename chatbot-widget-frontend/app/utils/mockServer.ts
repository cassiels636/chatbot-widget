import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const server = setupServer(
  http.get("http://127.0.0.1:8000/messages/", () => {
    return HttpResponse.json([
      {
        id: "1",
        content: "Hello. Ask me a question.",
        from_chatbot: true,
      },
      {
        id: "2",
        content: "What's the weather today?",
        from_chatbot: false,
      },
    ]);
  })
);
