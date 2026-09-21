/** @jest-environment node */
import { createBrowserClient, createServerClient, type CookieMethodsServer } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { createClient as browserClient } from "@/lib/supabase/client";
import { createClient as serverClient } from "@/lib/supabase/server";
import { updateSession } from "@/lib/supabase/proxy";

jest.mock("@supabase/ssr", () => ({ createBrowserClient: jest.fn(), createServerClient: jest.fn() }));
jest.mock("next/headers", () => ({ cookies: jest.fn() }));

const originalEnv = { ...process.env };
let adapter: CookieMethodsServer;
const getClaims = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_test";
  jest.mocked(createServerClient).mockImplementation((_url, _key, options) => {
    adapter = options.cookies as CookieMethodsServer;
    return { auth: { getClaims } } as unknown as ReturnType<typeof createServerClient>;
  });
  getClaims.mockResolvedValue({ data: null, error: null });
});
afterAll(() => { process.env = originalEnv; });

test("browser client uses the project's public connection settings", () => {
  browserClient();
  expect(createBrowserClient).toHaveBeenCalledWith("https://example.supabase.co", "sb_publishable_test");
});

test.each(["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"])("missing %s produces an actionable error", (name) => {
  delete process.env[name];
  expect(() => browserClient()).toThrow(name);
});

test("server client reads and writes request cookies", async () => {
  const jar = { getAll: jest.fn(() => [{ name: "session", value: "old" }]), set: jest.fn() };
  jest.mocked(cookies).mockResolvedValue(jar as unknown as Awaited<ReturnType<typeof cookies>>);
  await serverClient();
  expect(await adapter.getAll!()).toEqual([{ name: "session", value: "old" }]);
  adapter.setAll!([{ name: "session", value: "new", options: { path: "/" } }], {});
  expect(jar.set).toHaveBeenCalledWith("session", "new", { path: "/" });
  jar.set.mockImplementation(() => { throw new Error("Read-only Server Component cookies"); });
  expect(() => adapter.setAll!([{ name: "session", value: "new", options: {} }], {})).not.toThrow();
});

test("proxy forwards refreshed cookies and cache headers to the browser and downstream request", async () => {
  const request = new NextRequest("https://app.example.com/", { headers: { cookie: "session=old" } });
  getClaims.mockImplementation(async () => {
    expect(await adapter.getAll!()).toEqual([{ name: "session", value: "old" }]);
    adapter.setAll!([{ name: "session", value: "new", options: { path: "/", httpOnly: true } }], { "Cache-Control": "private, no-store", Pragma: "no-cache", Expires: "0" });
    return { data: null, error: null };
  });
  const response = await updateSession(request);
  expect(getClaims).toHaveBeenCalledTimes(1);
  expect(request.cookies.get("session")?.value).toBe("new");
  expect(response.cookies.get("session")).toMatchObject({ value: "new", httpOnly: true });
  expect(response.headers.get("x-middleware-request-cookie")).toContain("session=new");
  expect(response.headers.get("cache-control")).toBe("private, no-store");
  expect(response.headers.get("pragma")).toBe("no-cache");
  expect(response.headers.get("expires")).toBe("0");
});

test("proxy allows visitors without a session", async () => {
  const response = await updateSession(new NextRequest("https://app.example.com/"));
  expect(response.status).toBe(200);
  expect(response.headers.get("location")).toBeNull();
  expect(response.cookies.getAll()).toEqual([]);
});
