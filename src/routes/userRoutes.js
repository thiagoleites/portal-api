import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

async function userRoutes(fastify, opts) {
  fastify.post('/users', createUser);
  fastify.get('/users', getUsers);
  fastify.get('/users/:id', getUser);
  fastify.put('/users/:id', { preHandler: fastify.multipart }, updateUser);
  fastify.delete('/users/:id', deleteUser);
}

export default userRoutes;
