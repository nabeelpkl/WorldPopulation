const configs = {
  SERVER_URL: "http://api.population.io/1.0",
};

const get = key => configs[key];

export default {
  get,
};
