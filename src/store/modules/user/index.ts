import { defineStore } from 'pinia';
import { login as userLogin, logout as userLogout, getUserProfile, LoginData } from '/@/api/user/index';
import { setToken, clearToken } from '/@/utils/auth';
import { UserState } from './types';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user_id: 0,
  }),
  getters: {
    userProfile(state: UserState): UserState {
      return { ...state };
    },
  },
  actions: {
    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    // 重置用户信息
    resetInfo() {
      this.$reset();
      clearToken();
    },
    // 获取用户信息
    async info() {
      const result = await getUserProfile();
      this.setInfo(result);
    },
    // 异步登录并存储token
    async login(loginForm: LoginData) {
      const { token, user_id } = await userLogin(loginForm);
      if (token) {
        setToken(token);
        this.setInfo({ user_id });
      }
      return token;
    },
    // Logout
    async logout() {
      await userLogout();
      this.resetInfo();
      clearToken();
      // 路由表重置
      // location.reload();
    },
  },
  persist: {
    storage: localStorage,
    paths: ['user_id'],
  },
});
