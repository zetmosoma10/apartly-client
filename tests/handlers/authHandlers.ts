import { http, HttpResponse } from "msw";
import type {
  loginCredentials,
  registerCredentials,
} from "../../src/entities/User";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const authHandlers = [
  http.post(`${baseUrl}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as loginCredentials;

    if (body.email === "wrong@gmail.com" || body.password === "wrongPassword") {
      return HttpResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      {
        token: "token_123",
        success: true,
        results: {} as unknown,
      },
      { status: 200 },
    );
  }),
  http.post(`${baseUrl}/auth/register`, async ({ request }) => {
    const body = (await request.json()) as registerCredentials;

    if (body.email === "existingemail@gmail.com") {
      return HttpResponse.json(
        {
          success: false,
          message: "User already registered.",
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        success: true,
        token: "token_123",
        results: {} as unknown,
      },
      { status: 201 },
    );
  }),
];
