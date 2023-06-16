module.exports = {
  apps: [{
    name: "food-explorer-api",
    script: "dist/server.js",
    instances: "max",
    watch: true,
    ignore_watch: ["node_modules", "tmp", "uploads"],
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
  }],
};
