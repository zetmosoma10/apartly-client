import { setupServer } from "msw/node";
import { authHandlers } from "./mocks/handlers/authHandlers";

export const server = setupServer(...authHandlers);
