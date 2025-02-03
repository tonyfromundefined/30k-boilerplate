import { describe, expect, test } from "vitest";
import { makeApp } from "./makeApp";

describe("makeApp()", () => {
  test("헬스체크 엔드포인트가 적절히 동작합니다", async () => {
    const app = await makeApp();

    const response = await app.inject({
      method: "GET",
      url: "/healthz",
    });

    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toStrictEqual({
      ok: true,
    });
  });
});
