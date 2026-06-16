module.exports = {
  apps: [
    {
      name: process.env.PM2_APP_NAME || "anti-image-spam",
      interpreter: "bun",
      script: "run",
      args: "src/main.ts",
      env: {
        PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`, // Add "~/.bun/bin/bun" to PATH
      }
    }
  ]
}
