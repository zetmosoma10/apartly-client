import { http, HttpResponse } from "msw";
import type {
  loginCredentials,
  registerCredentials,
} from "../../../src/entities/User";
import { mockAdminUser, mockApartment, mockLandlordUser } from "../data";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const authHandlers = [
  http.get(`${baseUrl}/apartments`, async () => {
    return HttpResponse.json(null, { status: 200 });
  }),
  http.get(`${baseUrl}/apartments/:id`, async () => {
    return HttpResponse.json(
      {
        success: true,
        results: mockApartment,
      },
      { status: 200 },
    );
  }),
  http.get(`${baseUrl}/apartments/features`, async () => {
    return HttpResponse.json(
      {
        success: true,
        results: [mockApartment],
      },
      { status: 200 },
    );
  }),
  http.get(`${baseUrl}/apartments/:user_id/admin`, async () => {
    return HttpResponse.json(
      {
        success: true,
        results: [mockApartment],
      },
      { status: 200 },
    );
  }),
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
  http.post(`${baseUrl}/auth/forgot-password`, async ({ request }) => {
    const body = (await request.json()) as { email: string };

    if (body.email === "notfound@gmail.com") {
      return HttpResponse.json(
        {
          success: false,
          message: "Invalid email",
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  }),
  http.patch(`${baseUrl}/auth/reset-password?token=1234&id=1234`, async () => {
    return HttpResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  }),
  http.get(`${baseUrl}/users/me`, async () => {
    return HttpResponse.json(
      {
        success: true,
        results: mockLandlordUser,
      },
      { status: 200 },
    );
  }),
  http.get(`${baseUrl}/users/admin`, async () => {
    return HttpResponse.json(
      {
        success: true,
        results: mockAdminUser,
      },
      { status: 200 },
    );
  }),
];
