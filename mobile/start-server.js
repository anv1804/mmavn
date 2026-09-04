const { spawn } = require('child_process');
const path = require('path');

const cliPath = path.join(__dirname, 'node_modules', '@expo', 'cli', 'build', 'bin', 'cli');
const env = { ...process.env };
delete env.CI;
env.EXPO_NO_TELEMETRY = '1';
env.PATH = 'C:\\Users\\Admin\\Downloads\\dex-v2\\bin\\win32;' + (process.env.PATH || '');

const child = spawn(process.execPath, [cliPath, 'start', '--port', '8081', '--clear'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: env
});

child.on('exit', (code) => {
  console.log('Expo server exited with code:', code);
});