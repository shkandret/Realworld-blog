import instanceAxios from './instanceAxios';

export const signUp = async (userData) => {
  const res = await instanceAxios.post('users', userData);
  return res;
};

export const signIn = async (userData) => {
  const res = await instanceAxios.post('users/login', userData);
  return res;
};

export const updateUser = async (userData) => {
  const res = await instanceAxios.put('user', userData);
  return res;
};

export const getCurrentUser = async () => {
  const res = await instanceAxios.get('user');
  return res;
};
