import type { User } from "@/types/auth";

// Mock user data for authentication
export const mockUser: User = {
  id: 'user-1',
  username: 'admin',
  email: 'admin@inventory.com',
  role: 'admin',
  createdAt: new Date('2023-01-01'),
};
