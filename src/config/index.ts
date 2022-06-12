const environments = ["development", "test", "production"] as const;
type Environment = typeof environments[number];

export interface Config {
  port: number;
  env: Environment;
}

const isEnvironment = (env: string | undefined): env is Environment =>
  environments.includes(env as Environment);

export default (): Config => {
  const defaultPort = 5000;
  const defaultEnv = "production";

  const port: number =
    typeof process.env.PORT === "string" && !isNaN(Number(process.env.PORT))
      ? Number(process.env.PORT)
      : defaultPort;

  const env: Environment = isEnvironment(process.env.NODE_ENV)
    ? process.env.NODE_ENV
    : defaultEnv;

  return {
    port,
    env,
  };
};
