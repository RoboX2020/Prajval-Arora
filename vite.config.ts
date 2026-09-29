import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function aureliumDevApi(env: Record<string, string>): Plugin {
  return {
    name: 'aurelium-dev-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url !== '/api/aurelium') return next();
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('POST only');
          return;
        }
        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
        req.on('end', () => {
          if (env.GEMINI_API_KEY) process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
          const raw = Buffer.concat(chunks).toString('utf8');
          server
            .ssrLoadModule('/api/aurelium.ts')
            .then((mod: { default: (request: { method?: string; body?: unknown }, response: typeof res) => Promise<void> }) =>
              mod.default({ method: 'POST', body: raw }, res),
            )
            .catch((error: unknown) => {
              const message = error instanceof Error ? error.message : 'The model request failed.';
              if (!res.headersSent) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
              }
              res.end(`data: ${JSON.stringify({ type: 'error', message })}\n\n`);
            });
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [aureliumDevApi(env), react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
