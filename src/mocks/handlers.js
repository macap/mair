import { http, HttpResponse } from "msw";
import data from "./data.json";

export const handlers = [
  http.get("/data", ({ request, params, cookies }) => {
    return HttpResponse.json(data);
  }),
];
