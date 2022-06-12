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
});
