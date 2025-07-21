import Post from '../models/Post.js';
import path from 'path';
import fs from 'fs';

export async function createPost(request, reply) {
  let titulo, subtitulo, categoria_id, usuario_id, conteudo, publicado, thumb = null;
  if (request.isMultipart()) {
    const parts = {};
    for await (const part of request.parts()) {
      if (part.type === 'file' && part.fieldname === 'thumb') {
        const thumbName = `${Date.now()}_${part.filename}`;
        const thumbPath = path.join('public/thumbs', thumbName);
        const writeStream = fs.createWriteStream(thumbPath);
        await new Promise((resolve, reject) => {
          part.file.pipe(writeStream);
          part.file.on('end', resolve);
          part.file.on('error', reject);
        });
        thumb = thumbName;
      } else if (part.type === 'field') {
        parts[part.fieldname] = part.value;
      }
    }
    titulo = parts.titulo || '';
    subtitulo = parts.subtitulo || '';
    categoria_id = parts.categoria_id || null;
    usuario_id = parts.usuario_id || null;
    conteudo = parts.conteudo || '';
    publicado = parts.publicado || false;
  } else {
    ({ titulo, subtitulo, categoria_id, usuario_id, thumb, conteudo, publicado } = request.body);
  }

  const id = await Post.create({ titulo, subtitulo, categoria_id, usuario_id, thumb, conteudo, publicado });
  reply.code(201).send({ id });
}

export async function getPosts(request, reply) {
  const posts = await Post.findAll();
  reply.send(posts);
}

export async function getPost(request, reply) {
  const post = await Post.findById(request.params.id);
  if (!post) return reply.code(404).send({ error: 'Post não encontrado' });
  reply.send(post);
}

export async function updatePost(request, reply) {
  const id = request.params.id;
  const { titulo, subtitulo, categoria_id, usuario_id, conteudo, publicado } = request.body;
  let thumb = null;

  if (request.file) {
    const data = await request.file();
    if (data.file) {
      const thumbName = `${Date.now()}_${data.file.filename}`;
      const thumbPath = path.join('public/thumbs', thumbName);
      await fs.promises.writeFile(thumbPath, await data.file.toBuffer());
      thumb = thumbName;
    }
  }

  await Post.update(id, { titulo, subtitulo, categoria_id, usuario_id, thumb, conteudo, publicado });
  reply.send({ success: true });
}

export async function deletePost(request, reply) {
  await Post.delete(request.params.id);
  reply.send({ success: true });
}
