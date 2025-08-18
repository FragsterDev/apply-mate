export const isValidName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
  return nameRegex.test(name);
};
