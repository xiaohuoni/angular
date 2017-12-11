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
    if (ctx.request.headers['x-auth-token']) {
        var token = uncompileStr(ctx.request.headers['x-auth-token']);
        ctx.request.headers['x-auth-token'] = token;
    }
    await next();
    try {
        var resData = JSON.parse(ctx.response.body);
        // console.log(resData);
        if (resData.object && resData.object.token) {
            var userData = resData;
            userData.object.token = compileStr(userData.object.token);
            // userData.object.token = userData.object.token;
            ctx.response.body = JSON.stringify(userData);
        }
    } catch (error) {
        console.log(error)
    }
});
// proxy_pass: 'http://114.55.234.254:25080/findplus-scene-apiserver/api/',
// proxy_pass: 'http://192.168.1.3:18080/findplus-scene-apiserver/api/',
app.use(proxy({
    proxy_rules: [{
        proxy_location: /^\/api/,
        proxy_pass: 'http://114.55.234.254:25080/findplus-scene-apiserver/api/',
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

function compileStr(code) { //对字符串进行加密         
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
}
//字符串进行解密   
function uncompileStr(code) {
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
}