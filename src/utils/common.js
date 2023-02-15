
//格式化时间
export let formatDate = function (date) {
  if (date != '' && date != undefined && date != null) {
    date = new Date(date)
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var hh = date.getHours();
    hh = hh < 10 ? ('0' + hh) : hh;
    var mm = date.getMinutes();
    mm = mm < 10 ? ('0' + mm) : mm;
    var ss = date.getMinutes();
    ss = ss < 10 ? ('0' + ss) : ss;
    return y + '.' + m + '.' + d;
  } else {
    return ''
  }
}
