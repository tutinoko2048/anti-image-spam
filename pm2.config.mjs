export const apps = [
  {
    name: process.env.PM2_APP_NAME || 'anti-image-spam',
    interpreter: 'bun',
    interpreter_args: '--bun',
    script: 'pm2-wrapper.js',
    env: {
      NODE_ENV: "production",
      PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`, // Add "~/.bun/bin/bun" to PATH
    },
  },
];
