const formatDateTime = (dateString) => {
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  var date = new Date(dateString).toLocaleString(undefined, options);
  var hr = new Date(dateString).getUTCHours();
  var min = new Date(dateString).getUTCMinutes();
  var sec = new Date(dateString).getUTCSeconds();
  var time = `${hr}:${min}:${sec}`;
  return { date: date, time: time };
};

exports.formatDateTime = formatDateTime;
exports.todayDateTime = {
  date: new Date().toLocaleDateString(),
  time: new Date().toLocaleTimeString(),
};
