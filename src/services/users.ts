import { api } from '../../lib/axios';
import {
  usersListDto,
  createUserPayload,
  userDto,
  type CreateUserPayload,
  type UserDto,
} from '@/shared/dto/user.dto';

// GET /api/users
export async function fetchUsers(): Promise<UserDto[]> {
  const res = await api.get('/users');
  // Validacija odgovora
  return usersListDto.parse(res.data).users;
}

// POST /api/users
export async function createUser(payload: CreateUserPayload): Promise<UserDto> {
  // Lokalna validacija pre slanja
  createUserPayload.parse(payload);

  const res = await api.post('/users', payload);
  // Validacija odgovora (jedan user)
  return userDto.parse(res.data.user);
}
