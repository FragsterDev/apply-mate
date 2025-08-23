//fields that the user will receive in the data as response

//this will be fed to prisma select in the orm usage in repository

export const UserResponseDto = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
  //no password field for security
} as const;
