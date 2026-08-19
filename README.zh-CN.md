[English](./README.md) | 简体中文

# Chinese Lunar Calendar Tool

一个基于 [`6tail/lunar-typescript`](https://github.com/6tail/lunar-typescript) 的英文农历日期查询页面，可作为纯静态网站部署到 Nginx、GitHub Pages 或其他静态文件服务器。

在线访问：[https://chinamaxxing.info/tools/lunar-calendar.html](https://chinamaxxing.info/tools/lunar-calendar.html)

![Chinese Lunar Calendar 测试页面](./docs/images/calendar-test-page.png)

## 项目来源

本项目从 [`6tail/lunar-typescript`](https://github.com/6tail/lunar-typescript) 克隆并进行二次开发。原项目由 6tail 开发并以 MIT License 发布。本仓库保留原项目的版权声明和 [`LICENSE`](./LICENSE)，感谢原作者提供完整的公历与中国农历转换能力。

本项目不是原项目的官方发行版本。有关底层日期算法和完整 API，请访问[原项目文档](https://6tail.cn/calendar/api.html)。

## 本项目的修改

- 新增可交互的英文测试页面 `test.html`。
- 支持通过日期选择器查询公历、农历、生肖、星期、传统农历节日和节气。
- 精简农历结果，不展示纳音、星宿、彭祖百忌、吉凶、神位方位和冲煞等信息。
- 将页面界面和查询结果转换为英文，并补充传统节日英文名称。
- 新增可直接运行的 Node.js 示例 `test.js`。
- 新增仅用于本地预览的零依赖静态服务器 `server.js`。
- 将浏览器版依赖整理为 `vendor/lunar-typescript.mjs`，生产部署无需上传 `node_modules` 或 `dist/lib`。
- 新增 Nginx/静态网站部署方式和页面截图。
- 新增「按农历查询个人生肖」功能（根据公历出生日期推算所属生肖），可在测试页面体验：[https://73hi.com/ai.html](https://73hi.com/ai.html)。

## 本地预览

需要 Node.js 18 或更高版本：

```bash
node server.js
```

打开：

```text
http://127.0.0.1:8765/test.html
```

`server.js` 只用于本地预览。生产环境使用 Nginx 时不需要安装或运行 Node.js。

## 命令行示例

安装依赖后运行：

```bash
npm install
node test.js
```

## Nginx 部署

将以下静态文件和目录发布到网站目录：

```text
test.html
vendor/lunar-typescript.mjs
```

Nginx 必须为 `.mjs` 返回 JavaScript MIME 类型：

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/lunar-calendar;
    index test.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.mjs$ {
        default_type application/javascript;
    }
}
```

检查并重新加载配置：

```bash
nginx -t
sudo systemctl reload nginx
```

## 项目结构

```text
.
├── docs/images/                 # README 截图
├── src/                         # 上游 TypeScript 源码
├── vendor/lunar-typescript.mjs  # 浏览器端单文件模块
├── test.html                    # 英文日期查询页面
├── test.js                      # Node.js 示例
└── server.js                    # 本地静态服务器
```

## 许可证

本项目沿用原项目的 [MIT License](./LICENSE)。分发或修改时请保留原版权及许可声明。
