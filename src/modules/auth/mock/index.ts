import { Role } from '../../user/schema/user.shema';
import { SigupInputDto } from '../dto/signup.dto';

export const loginData = {
  password: '123456',
  email: 'email@gmail.com',
};
export const mockLoginSuccess = {
  token: '$2a$10$sRp1eI5rZxHvOqJnc3FtWeOdl4p.MZev3oFsBxJ0ui9A4Fj2s5ZLe',
  message: 'Login success',
};

export const mockUserUnactive = {
  _id: '658a55eee688a8c31c70f958',
  role: 'boss',
  username: 'Mr Mai',
  email: 'gotrudukna@gufum.com',
  password: '$2a$10$sRp1eI5rZxHvOqJnc3FtWeOdl4p.MZev3oFsBxJ0ui9A4Fj2s5ZLe',
  active: false,
  createdAt: '2023-12-26T04:26:22.060+00:00',
  updatedAt: '2023-12-26T04:26:22.060+00:00',
};
export const mockSignupData: SigupInputDto = {
  password: '123456',
  role: Role.boss,
  username: 'Mr Mai',
  email: 'email@gmail.com',
};

export const mockUserActived = {
  _id: '658a55eee688a8c31c70f958',
  role: 'boss',
  username: 'Mr Mai',
  email: 'gotrudukna@gufum.com',
  password: '$2a$10$sRp1eI5rZxHvOqJnc3FtWeOdl4p.MZev3oFsBxJ0ui9A4Fj2s5ZLe',
  active: true,
  createdAt: '2023-12-26T04:26:22.060+00:00',
  updatedAt: '2023-12-26T04:26:22.060+00:00',
};
export const mockMessageSignupSuccess = {
  message:
    'Signup Success, please click the link on your email to active account',
};
