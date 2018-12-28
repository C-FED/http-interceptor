## http-interceptor
> XMLHttpRequest 拦截器，基于[Ajax-Hook](https://github.com/wendux/Ajax-hook)

### Import
放到所有js之前
```html
<script src="./content/http-interceptor.js"></script>
<script>
    /** 拦截后的回调
     * {string} msg
     */
    function httpErrorFallBack(msg) {
        // 这里写提示登录失效的逻辑
        alert(msg);
        // 这里写重定向的逻辑
        location.href="http://xxx.xxx.xxx/login";
    }
</script>

```

### Example
执行如下命令
```bash
$ yarn install
$ yarn run serve
```
然后浏览器打开如下网址
http://locahost:8965

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### ISC license
Copyright (c) 2018 



---
built upon love by [docor](https://github.com/turingou/docor.git) v0.3.0
