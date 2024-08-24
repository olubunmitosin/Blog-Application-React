// Get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};
// Remove current user
export const removeCredentials = () => {
  localStorage.removeItem("user");
  return true;
}