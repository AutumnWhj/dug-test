# DUG
## 开发
```
// 先安装node和npm, 跟进自己的系统找教程

// 安装包管理工具
npm i -g pnpm

// 本地调试
pnpm run dev
```
## 部署
```
// 打包
pnpm run build:pro

// docker 部署
sudo docker build -t images_dug .
sudo docker run --name images_dug -p 50080:80 -d images_dug 

```