// 权限问题后期增加
import { get, post } from '/@/utils/http/axios';
import { UserState } from '/@/store/modules/user/types';
// import axios from 'axios';
enum URL {
  login = 'api/user/login',
  logout = '/user/logout',
  profile = '/user/profile',
  register = '/api/user/register',
}
interface LoginRes {
  token: string;
}

export interface LoginData {
  username: string;
  password: string;
}
export interface RegisterData {
  email: string;
  username: string;
  password: string;
  phone_number: string;
}

const getUserProfile = async () => get<UserState>({ url: URL.profile });
const login = async (data: LoginData) => post<any>({ url: URL.login, data });
const logout = async () => post<LoginRes>({ url: URL.logout });
const register = async (data: RegisterData) => post<any>({ url: URL.register, data });
export { getUserProfile, logout, login, register };
