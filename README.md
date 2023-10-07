# minapp-taro

基于taroV3.x框架的小程序组件库与工具库

## 发布npm包

```javascript
// 打包
pnpm build
// 生成发布记录
pnpm changesets
// 更新版本
pnpm version-packages
// 发布
pnpm release
```

## pnpm使用

```javascript
// 全局安装 -w: --workspace-root
pnpm add typescript -D -w

// 局部安装
pnpm add typescript -D --filter pkg-a

// 互相安装
pnpm add pkg-a -D --workspace --filter pkg-b
```
