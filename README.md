# MCP服务端部署指南（GitHub + Render）

这个仓库包含MCP服务端的前端页面和后端代码，可通过以下步骤部署到线上，实现公开访问。


## 一、准备工作
1. 注册GitHub账号：[https://github.com/](https://github.com/)
2. 注册Render账号：[https://render.com/](https://render.com/)（用于部署后端服务，免费版足够）


## 二、部署静态前端页面（GitHub Pages）
### 步骤1：创建GitHub仓库
1. 登录GitHub，点击右上角「+」→「New repository」。
2. 仓库名填写：`mcp-javascript-deploy`（或自定义）。
3. 勾选「Public」和「Add a README file」，点击「Create repository」。

### 步骤2：上传前端文件
1. 进入仓库，点击「Add file」→「Upload files」。
2. 上传本仓库的`frontend/public_promo.html`文件。

### 步骤3：启用GitHub Pages
1. 仓库页面点击「Settings」→ 左侧「Pages」。
2. 在「Source」处选择「main」分支，「/ (root)」，点击「Save」。
3. 等待1分钟，刷新页面，会显示你的前端页面地址（如：`https://用户名.github.io/mcp-javascript-deploy/public_promo.html`）。


## 三、部署后端服务（Render）
### 步骤1：上传后端代码到GitHub
1. 在你的GitHub仓库中，点击「Add file」→「Create new file」。
2. 依次创建以下文件（复制仓库中的代码）：
   - `backend/app.js`
   - `backend/db.js`
   - `backend/package.json`

### 步骤2：在Render上部署后端
1. 登录Render，点击「New」→「Web Service」。
2. 点击「Connect to GitHub」，授权访问你的仓库，选择`mcp-javascript-deploy`。
3. 配置部署信息：
   - Name：自定义（如`mcp-js-server`）
   - Root Directory：填写`backend`（指定后端代码目录）
   - Build Command：`npm install`（安装依赖）
   - Start Command：`node app.js`（启动服务）
4. 点击「Create Web Service」，等待部署完成（约1分钟）。
5. 部署成功后，会生成一个后端域名（如：`https://mcp-js-server.onrender.com`）。


## 四、关联前端和后端
1. 打开GitHub仓库中的`frontend/public_promo.html`，点击「Edit」。
2. 找到代码中的`const BACKEND_URL = "https://你的后端服务域名.onrender.com"`，替换为你的Render后端域名。
3. 点击「Commit changes」保存。


## 五、测试访问
1. 前端页面：访问GitHub Pages生成的地址，能看到优惠列表卡片。
2. 后端接口：访问`https://你的后端域名.onrender.com/api/mcp/jutuike/public_promo_list`，能看到JSON格式的优惠数据。


## 常见问题
- 前端页面加载失败：检查`BACKEND_URL`是否正确，Render后端是否部署成功。
- 后端接口返回404：检查代码中的接口路径是否正确，Render部署时「Root Directory」是否填了`backend`。
- 免费版Render服务会休眠：30分钟无访问会暂停，下次访问需等待几秒唤醒（不影响功能）。