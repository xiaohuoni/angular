var path = require('path');
var koa = require('koa');
var fs = require('fs');
var serve = require('koa-static');
var proxy = require('koa-proxy2');
var cors = require('koa2-cors');
var app = new koa();
app.use(cors());
app.use(async(ctx, next) => {
    console.log(`Process ${JSON.stringify(ctx.request.method)} ${ctx.request.url}...`);
    //这里可以处理请求中转到服务器之前，操作一下token和参数之类的。
    await next();
    // console.log(JSON.stringify(ctx.response.body));
    //可以在这里处理从服务端返回的数据
});
//裁剪/api后面的路径，如http://127.0.0.1:4200/api/login会被代理到http://watekang.com/login
app.use(proxy({
    proxy_rules: [{
        proxy_location: /^\/api/,
        proxy_pass: 'http://watekang.com/',
        proxy_micro_service: true,
        proxy_merge_mode: true
    }]
}));

app.use(serve(path.join(__dirname, 'dist')));
app.use(function*() {
    this.type = 'html';
    this.body = fs.readFileSync(path.join(__dirname, 'dist/index.html'), { encoding: 'utf-8' });
});
app.listen(1336);