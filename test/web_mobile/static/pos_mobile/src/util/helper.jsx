var helper = {
  request: function(model, method, data){
    var self = this;
    var dtd = $.Deferred();
    $.ajax({
      type: "POST",
      url: "/nt_pos/web_mobile/api?object=" + model + "&method=" + method,
      data: JSON.stringify(data || {}),
      dataType: "json",
      contentType: "application/json"
    })
    .done(function(d){
      dtd.resolve(d);
    })
    .fail(function(ex){
      dtd.reject(ex);
    });
    return dtd.promise();
  },
  getParameterByName: function (name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },
  //将日期转为 2015-08-01的格式
  convertDateToYYYYMMDD: function(date){
    var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = (date.getDate()).toString();

    return [date.getFullYear(), '-', mm[1] ? '' : '0', mm, '-', dd[1] ? '' : '0', dd].join('');
  }
};

module.exports = helper;