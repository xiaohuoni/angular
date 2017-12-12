# Oniangular

## 需求说明
我们的项目要求搭建一个中转服务器。
因为在app端的请求，我们都是依赖于token，而且这个token是不变的。
之前都是服务端保存session数据，进行用户身份认证的。现在希望web和app端使用一样的方式。
所以需要前段自己搭建一个中转服务器，用于处理跨域访问和tokon的问题。
此项目脚手架使用的[Angular CLI](https://github.com/angular/angular-cli) version 1.5.3.创建。
在koa中对token这些数据做处理，再进行代理，将所有的http请求中转到实际的服务器api。
### 特别说明
1、在开发环境使用`ng serve`启用了ng开发服务，监听的是4200端口。
然后我们使用koa2搭建一个node服务器，监听1336端口。
使用[koa-proxy2](https://github.com/bornkiller/koa-proxy2)将请求中转到真实业务的服务端。
在
    app.use(async(ctx, next) => {
    console.log(`Process ${JSON.stringify(ctx.request.method)} ${ctx.request.url}...`);
    //这里可以处理请求中转到服务器之前，操作一下token和参数之类的。
    await next();
    //可以在这里处理从服务端返回的数据
    });
因为开发时请求从4200访问1336所以也存在跨域访问问题。
所以在koa2中加入[koa2-cors](https://github.com/zadzbw/koa2-cors)处理了跨域访问。
2、在生产环境或者称为正式上线时。修改`src\app\config\td-config.ts`中的`this.serveUrl = ''`。
使用`ng build`将前端页面编译成静态文件。
将`src\dist`目录和koa-proxy.js（如果有修改的话）复制到build中。
拷贝build中的文件到远程服务器上，安装node环境和nodemon，
执行`npm install`再执行`nodemon koa-proxy`。

## 使用方法
### 开发
0、gitclone 本项目
1、执行 `npm i`.
2、确认`src\app\config\td-config.ts`文件中的端口号和`koa-proxy.js`中的端口号相同。
2、执行 `ng serve` 启动一个angular开发服务。
3、执行 `nodemon koa-proxy` 开启中转服务器。

### 生产
0、修改`src\app\config\td-config.ts`中的`this.serveUrl = ''`。
1、执行 `ng build` 编译项目。
2、拷贝`src\dist`文件夹和 `koa-proxy.js`文件到`src\build`目录下。
3、拷贝build中的文件到远程服务器上，安装node环境和nodemon。
4、执行`npm install`再执行`nodemon koa-proxy`. 

### 说明
UI框架使用[NG-ZORRO](https://ng.ant.design/#/docs/angular/introduce)
NG-ZORRO是Ant Design 的 Angular^5.0.0 实现，开发和服务于企业级后台产品。

### BUG和建议
请提交到ISS:https://github.com/xiaohuoni/angular/issues

以下是angular的README

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
