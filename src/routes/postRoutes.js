import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} from '../controllers/postController.js';

async function postRoutes(fastify, opts) {
  fastify.post('/posts', { preHandler: fastify.multipart }, createPost);
  fastify.get('/posts', getPosts);
  fastify.get('/posts/:id', getPost);
  fastify.put('/posts/:id', { preHandler: fastify.multipart }, updatePost);
  fastify.delete('/posts/:id', deletePost);
}

export default postRoutes;
