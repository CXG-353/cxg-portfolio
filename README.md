# CXG / Personal Site

一个零依赖的静态个人网站，设计参考 MotionSites 的 `Viktor Portfolio` 方向：全屏视觉、参数化信息布局、项目详情弹窗和移动端菜单。

## 本地预览

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

打开 <http://127.0.0.1:4173/>。

## 上线

站点通过 GitHub Pages 发布，根目录下的 `CNAME` 将自定义域名绑定到
<https://cxg.bot.cd>。推送到 `main` 分支后，Pages 会自动更新线上内容。

页面里的个人资料、项目简介和 `hello@cxg.bot.cd` 邮箱都是可替换内容，集中在 `index.html`；项目弹窗数据在 `script.js` 的 `projects` 对象中。

服务器回退配置位于本地的 `deploy/`（不提交到公开仓库）：

- `cxg-portfolio.service` 将站点仅绑定到 `127.0.0.1:4173`
- `Caddyfile` 将 `https://cxg.bot.cd` 反代到本地站点并自动管理 TLS

视觉素材来自 Pexels 免费图片：

- `assets/hero-portrait.jpg`：橙色光影人像
- `assets/project-code.jpg`：代码屏幕
- `assets/project-architecture.jpg`：橙色建筑结构
