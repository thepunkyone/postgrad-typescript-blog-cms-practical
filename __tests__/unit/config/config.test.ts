import getConfig, { Config } from "../../../src/config";

describe("getConfig", () => {
  describe("PORT", () => {
    it("loads the port from process.env", () => {
      process.env = {
        PORT: "4040",
      };

      const config: Config = getConfig();

      expect(config.port).toBe(4040);
    });

    it("returns default port 5000 when process.env PORT is undefined", () => {
      process.env = {
        PORT: undefined,
      };

      const config: Config = getConfig();

      expect(config.port).toBe(5000);
    });

    it("returns default port 5000 when process.env PORT is not a number", () => {
      process.env = {
        PORT: "not a number",
      };

      const config: Config = getConfig();

      expect(config.port).toBe(5000);
    });
  });

  describe("NODE_ENV", () => {
    it("returns development env from process.env if NODE_ENV is set to development", () => {
      process.env = {
        NODE_ENV: "development",
      };

      const config: Config = getConfig();

      expect(config.env).toBe("development");
    });

    it("returns test env from process.env if NODE_ENV is set to test", () => {
      process.env = {
        NODE_ENV: "test",
      };

      const config: Config = getConfig();

      expect(config.env).toBe("test");
    });

    it("returns production env from process.env if NODE_ENV is undefined", () => {
      process.env = {
        NODE_ENV: undefined,
      };

      const config: Config = getConfig();

      expect(config.env).toBe("production");
    });

    it("returns production env from process.env if NODE_ENV is not a known environment", () => {
      process.env = {
        NODE_ENV: "holiday",
      };

      const config: Config = getConfig();

      expect(config.env).toBe("production");
    });
  });
});
