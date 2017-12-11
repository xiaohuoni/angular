# Oniangular

##需求说明
我们的服务端，要求我自己搭建一个中转服务器。因为app端的请求，我们都是依赖于token，而且这个token是不变的。
之前都是服务端保存session数据，进行用户身份认证的。
##使用方法
###开发
1、Run `cnpm i`.
2、确认`proxy.conf.json`文件中的端口号和`koa-proxy.js`中的端口号相同。
2、Run `npm start` for a angular proxy server.
3、Run `nodemon koa-proxy` for a proxy server.
从ng serve发起服务到proxy服务中转到koa-proxy服务，再中转到服务端。

###生产
1、Run `ng build` to build the project.
2、copy the `dist` directory and `koa-proxy.js` to a new directory.
3、?:Run `npm init`. 
4、`cnpm i --save fs koa koa-proxy2 koa-router koa-static koa2-cors `. 
5、`cnpm i -g nodemon`.(也可以使用pm2)
6、Run `nodemon koa-proxy` for a proxy server.


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
