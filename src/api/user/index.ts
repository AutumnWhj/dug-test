// 权限问题后期增加
import { get, post } from '/@/utils/http/axios';
import { UserState } from '/@/store/modules/user/types';
// import axios from 'axios';
enum URL {
  login = '/api/user/login',
  logout = '/user/logout',
  profile = '/user/profile',
  register = '/api/user/register',
  restaurant = '/api/user/restaurant',
  restaurantReport = '/api/user/restaurant/report',
  createRestaurant = '/api/user/restaurant/submit',
  updateRestaurant = '/api/user/restaurant/update',
  restaurantDetail = '/api/user/restaurant/detail',
  leaveMessage = '/api/user/message',
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

const getRestaurants = async (data: any) => post<any>({ url: URL.restaurant, data });

const getRestaurantReport = async (data: any) => post<any>({ url: URL.restaurantReport, data });

const createRestaurant = async (data: any) => post<any>({ url: URL.createRestaurant, data });

const updateRestaurant = async (data: any) => post<any>({ url: URL.updateRestaurant, data });

const getRestaurantDetail = async (data: any) => post<any>({ url: URL.restaurantDetail, data });

const leaveMessage = async (data: any) => post<any>({ url: URL.leaveMessage, data });

export {
  getUserProfile,
  logout,
  login,
  register,
  getRestaurants,
  getRestaurantReport,
  createRestaurant,
  updateRestaurant,
  getRestaurantDetail,
  leaveMessage,
};
