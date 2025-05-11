import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/auth.controller';

const router = Router();

// 注册路由
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('请输入有效的邮箱地址'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('密码至少需要6个字符'),
    body('username')
      .notEmpty()
      .withMessage('用户名不能为空')
  ],
  register
);

// 登录路由
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('请输入有效的邮箱地址'),
    body('password').notEmpty().withMessage('请输入密码')
  ],
  login
);

export default router; 