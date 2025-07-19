import Category from '../models/Category.js';

export async function createCategory(request, reply) {
  const { nome, descricao, parent_id } = request.body;
  if (!nome) return reply.code(400).send({ error: 'Nome é obrigatório' });
  const id = await Category.create({ nome, descricao, parent_id });
  reply.code(201).send({ id });
}

export async function getCategories(request, reply) {
  const categories = await Category.findAll();
  reply.send(categories);
}

export async function getCategory(request, reply) {
  const category = await Category.findById(request.params.id);
  if (!category) return reply.code(404).send({ error: 'Categoria não encontrada' });
  reply.send(category);
}

export async function updateCategory(request, reply) {
  const id = request.params.id;
  const { nome, descricao, parent_id } = request.body;
  if (!nome) return reply.code(400).send({ error: 'Nome é obrigatório' });
  await Category.update(id, { nome, descricao, parent_id });
  reply.send({ success: true });
}

export async function deleteCategory(request, reply) {
  await Category.delete(request.params.id);
  reply.send({ success: true });
}
