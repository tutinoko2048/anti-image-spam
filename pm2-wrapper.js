#!/usr/bin/env bun

import('./src/main.ts').catch(error => {
  console.error('Failed to start app:', error);
  process.exit(1);
});
