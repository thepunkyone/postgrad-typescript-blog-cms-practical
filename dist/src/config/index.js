"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environments = ["development", "test", "production"];
const isEnvironment = (env) => environments.includes(env);
exports.default = () => {
    const defaultPort = 4000;
    const defaultEnv = "production";
    const port = typeof process.env.PORT === "string" && !isNaN(Number(process.env.PORT))
        ? Number(process.env.PORT)
        : defaultPort;
    const env = isEnvironment(process.env.NODE_ENV)
        ? process.env.NODE_ENV
        : defaultEnv;
    return {
        port,
        env,
    };
};
//# sourceMappingURL=index.js.map