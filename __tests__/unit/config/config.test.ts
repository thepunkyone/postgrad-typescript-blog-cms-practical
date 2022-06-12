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
  });
});
