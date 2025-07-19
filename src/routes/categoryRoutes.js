import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';

async function categoryRoutes(fastify, opts) {
  fastify.post('/categories', createCategory);
  fastify.get('/categories', getCategories);
  fastify.get('/categories/:id', getCategory);
  fastify.put('/categories/:id', updateCategory);
  fastify.delete('/categories/:id', deleteCategory);
}

export default categoryRoutes;
