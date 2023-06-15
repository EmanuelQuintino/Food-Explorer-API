module.exports = {
  apps: [{
    name: "food-explorer-api",
    script: "dist/server.js",
    instances: 1,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
  }],
};
