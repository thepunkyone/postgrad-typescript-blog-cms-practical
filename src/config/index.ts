export interface Config {
  port: number;
  // we will add the environment property later
}

export default (): Config => {
  const port = process.env.PORT;
  const defaultPort = 5000;

  if (typeof port !== "string" || isNaN(Number(port)))
    return {
      port: defaultPort,
    };

  return {
    port: Number(port),
  };
};
