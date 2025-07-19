import Fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import postRoutes from './routes/postRoutes.js';
import path from 'path';

const fastify = Fastify({ logger: true });

fastify.register(fastifyMultipart, {
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});
fastify.register(import('@fastify/static'), {
  root: path.join(process.cwd(), 'public/avatars'),
  prefix: '/avatars/',
});

fastify.register(userRoutes);
fastify.register(categoryRoutes);
fastify.register(postRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
