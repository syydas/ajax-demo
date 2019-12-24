window.ajax = function (url, options) {
  options = options || {};
  options.data = options.data || {};
json
  // 判断是 ajax 请求还是 jsonp 请求
  var json = options.jsonp ? jsonp(options) : json(options);

  function json(options) {
    options.type = (options.type || 'GET').toUpperCase();
    options.data = formatParams(options.data);
    var xhr = null;


    // 实例化XMLHttpRequest对象 
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      // IE7以下版本 
      xhr = new ActiveXObjcet('Microsoft.XMLHTTP');
    };


    // 监听事件，只要 readyState 的值变化，就会调用 readystatechange 事件
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        var status = xhr.status;

        if (status >= 200 && status < 300) {
          // 作业思考题？处理返回值
          var response = '';
          response = JSON.parse(xhr.responseText); //JSON响应

          options.success && options.success(response);
        } else {
          options.error && options.error(`${status}：${xhr.statusText}`);
        }
      };
    };

    // 连接和传输数据 
    if (options.type == 'GET') {
      xhr.open(options.type, url + '?' + options.data, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      xhr.send(null);
    } else {
      xhr.open(options.type, options.url, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      xhr.send(options.data);
    }
  }

  function jsonp(options) {
    //创建script标签并加入到页面中 
    var callbackName = options.jsonp;
    var head = document.getElementsByTagName('head')[0];
    // 设置传递给后台的回调参数名 
    options.data['callback'] = callbackName;
    var data = formatParams(options.data);
    var time = options.time || 5000;
    var script = document.createElement('script');
    head.appendChild(script);

    //创建jsonp回调函数 
    window[callbackName] = function (json) {
      head.removeChild(script);
      clearTimeout(script.timer);
      window[callbackName] = null;
      options.success && options.success(json);
    };

    script.src = url + '?' + data;

    //为了得知此次请求是否成功，设置超时处理 
    if (time) {
      script.timer = setTimeout(function () {
        window[callbackName] = null;
        head.removeChild(script);
        options.error && options.error({
          message: '超时'
        });
      }, time);
    }
  };

  //格式化参数 
  function formatParams(data) {
    var arr = [];
    for (var name in data) {
      arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    };

    // arr.push('v=' + random());
    return arr.join('&');
  }



  // 获取随机数 
  // function random() {
  //   return Math.floor(Math.random() * 10000 + 500);
  // }
}