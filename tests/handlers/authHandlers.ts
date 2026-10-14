import { http, HttpResponse } from "msw";

const baseUrl = import.meta.env.BASE_URL;

export const authHandlers = [
  http.post(`${baseUrl}/auth/login`, () => {
    return HttpResponse.json({
      token: "token_123",
      success: true,
      results: {} as unknown,
    });
  }),
];
