module.exports = {
  apps: [
    {
      name: "API",
      script: "app.js",
      //node_args: "--experimental-modules",
      env: {
        NODE_ENV: "development"
      },
      watch: ["app.js", "src"],
      env_production: {
        NODE_ENV: "production"
      },
      error_file: "logs/error.log",
      out_file: "logs/output.log"
    }
  ],

  deploy: {
    production: {
      user: "node",
      host: "212.83.163.1",
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/production",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};
