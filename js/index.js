;(function() {
  var $phone = document.querySelector('.phone');
  var $submit = document.querySelector('.submit');
  var $result = document.querySelector('.result');

  $submit.addEventListener('click', function() {
    var phone = $phone.value;

    if (verifyPhone(phone)) {
      requestAddrFromPhone(phone);
    } else {
      $result.innerHTML = '手机号码输入错误！！！';
    }
  }, false);

  function requestSuccess(res) {
    var result = res.result || { province: '', city: '', zip: '' };

    $result.innerHTML = `<p>运营公司：${result.company}</p>
                         <p>地址：${result.province}省 ${result.city}市</p>
                         <p>邮编：${result.zip}</p>`;
  }

  function verifyPhone(phone) {
    return (/^1[3456789]\d{9}$/.test(phone));
  }

  function requestAddrFromPhone(phone) {
    ajax(
      'http://localhost:3000', {
        type: 'get',
        data: {
          phone: phone,
          key: '69743c781d77ba97dd2c6524aa15e9ed'
        },
        // jsonp: 'jsonpCallback',
        success: requestSuccess,
        error: function (error) {
          console.log(error);
        }
      }
    );
  }
})();