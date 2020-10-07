// Start Redis server and mongodb
// Run these commands to start the backend services
// 1. pm2 start .\process.config.js
// 2. pm2 monit

//To kill - pm2 kill

module.exports = {
    apps: [
      {
        name: "inventory",
        script: "./inventory.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "auth",
        script: "./auth.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "gateway",
        script: "./gateway.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "notification",
        script: "./notification.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "transaction",
        script: "./transaction.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
    //   {
    //     name: "receipt",
    //     script: "./receipt.js",
    //     watch: true,
    //     ignore_watch : ["node_modules"],
    //     watch: true,
    //   },
      // {
      //   name: "frontend",
      //   script: "./frontend.js",
      //   watch: true,
      //   ignore_watch : ["node_modules"],
      //   watch: true,
      // },
    ]
  }