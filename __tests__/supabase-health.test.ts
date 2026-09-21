/** @jest-environment node */
import { GET } from "@/app/api/supabase/health/route";

const fetchMock = jest.fn();
const originalFetch = global.fetch;
const originalEnv = { ...process.env };

beforeEach(() => {
  fetchMock.mockReset();
  global.fetch = fetchMock;
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_test";
});

afterAll(() => {
  global.fetch = originalFetch;
  process.env = originalEnv;
});

test("checks Supabase without a login or table and returns an uncached success", async () => {
  fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
  const response = await GET();
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ ok: true });
  expect(response.headers.get("cache-control")).toBe("no-store");
  expect(fetchMock).toHaveBeenCalledWith("https://example.supabase.co/auth/v1/settings", expect.objectContaining({
    headers: { apikey: "sb_publishable_test" },
    cache: "no-store",
    signal: expect.any(AbortSignal),
  }));
});

test.each([401, 403, 500])("reports upstream HTTP %s without exposing upstream details", async (status) => {
  fetchMock.mockResolvedValue(new Response("private upstream details", { status }));
  const response = await GET();
  expect(response.status).toBe(503);
  expect(await response.json()).toEqual({ ok: false, error: "Supabase connection check failed" });
  expect(response.headers.get("cache-control")).toBe("no-store");
});

test.each([new TypeError("private network details"), new DOMException("Timed out", "TimeoutError")])("handles network failures and timeouts", async (error) => {
  fetchMock.mockRejectedValue(error);
  const response = await GET();
  expect(response.status).toBe(503);
  expect(await response.json()).toEqual({ ok: false, error: "Supabase connection check failed" });
});

test("reports missing configuration without making an upstream request", async () => {
  delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const response = await GET();
  expect(response.status).toBe(503);
  expect(await response.json()).toEqual({ ok: false, error: "Supabase connection check failed" });
  expect(fetchMock).not.toHaveBeenCalled();
});
