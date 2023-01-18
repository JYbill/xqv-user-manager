# xqv-user-manager

> 该项目作为自己所有项目SSO单点登录系统

## 技术选型 stack

- 框架
  - midwayjs
- 认证（别名：登陆）
  - passport
  - passport-jwt
  - ...
- 鉴权（别名：鉴定用户是否有该接口访问权限）
  - casbin
  - prisma-casbin-adaptor（持久化策略存储器）

## TODO

- 用户登陆退出，CRUD
- jwt认证 ✅
- casbin授权 ✅
- 前端管理界面（React）
