## http-intercepetor 
> XMLHttpRequest 拦截器，基于[Ajax-Hook](https://github.com/wendux/Ajax-hook)  


This is a http interceptor for XMLHttpRequest


### Usage
放到所有js之前
```html
<script src="${path}/src/http-interceptor.js"></script>
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

### MIT license
Copyright (c) 2019 yangfan2016 &lt;15234408101@163.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
built upon love by [docor](https://github.com/turingou/docor.git) v0.3.0
