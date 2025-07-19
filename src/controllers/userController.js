import User from '../models/User.js';
import path from 'path';
import fs from 'fs';

export async function createUser(request, reply) {
  let full_name, username, password, avatar = null;
  // Se multipart
  if (request.isMultipart()) {
    const data = await request.file();
    full_name = data.fields.full_name;
    username = data.fields.username;
    password = data.fields.password;
    if (data.file) {
      const avatarName = `${Date.now()}_${data.file.filename}`;
      const avatarPath = path.join('public/avatars', avatarName);
      const writeStream = fs.createWriteStream(avatarPath);
      await new Promise((resolve, reject) => {
        data.file.pipe(writeStream);
        data.file.on('end', resolve);
        data.file.on('error', reject);
      });
      avatar = avatarName;
    }
  } else {
    ({ full_name, username, password, avatar } = request.body);
  }
  const id = await User.create({ full_name, username, password, avatar });
  reply.code(201).send({ id });
}

export async function getUsers(request, reply) {
  const users = await User.findAll();
  reply.send(users);
}

export async function getUser(request, reply) {
  const user = await User.findById(request.params.id);
  if (!user) return reply.code(404).send({ error: 'User not found' });
  reply.send(user);
}

export async function updateUser(request, reply) {
  const id = request.params.id;
  const { full_name, username, password } = request.body;
  let avatar = null;

  if (request.file) {
    const data = await request.file();
    if (data.file) {
      const avatarName = `${Date.now()}_${data.file.filename}`;
      const avatarPath = path.join('public/avatars', avatarName);
      const writeStream = fs.createWriteStream(avatarPath);
      await new Promise((resolve, reject) => {
        data.file.pipe(writeStream);
        data.file.on('end', resolve);
        data.file.on('error', reject);
      });
      avatar = avatarName;
    }
  }

  await User.update(id, { full_name, username, password, avatar });
  reply.send({ success: true });
}

export async function deleteUser(request, reply) {
  await User.delete(request.params.id);
  reply.send({ success: true });
}
