var http = require('http');
var url = require('url');
const port = process.env.PORT || 8080;
function handleStudentScoreRequest(reqQuery){
    data=[
        {
            id: 11111,
            name: "Bruce Lee",
            score: 84
          },
          {
            id: 22222,
            name: "Jackie Chen",
            score: 93
          },
          {
            id: 33333,
            name: "Jet Li",
            score: 88
          }
            
    ]
    dLength=data.length
    for(i=0; i<dLength; i++){
        if(Number(reqQuery.student_id)==data[i].id) return data[i]
    }
};

function getCurrentTime () {
  var dt = new Date();
  return {
    year: dt.getFullYear(),
    month: dt.getMonth(),
    date: dt.getDate(),
    hour: dt.getHours(),
    minute: dt.getMinutes()
  };
};
// {"year":2021,"month":09,"date":24,"hour":16,"minute":09}

http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true)
  
    var result
    
    // match req.url with the string /api/score
    if (/^\/api\/score/.test(req.url))
      result = handleStudentScoreRequest(parsedUrl.query)
    // match req.url with the string /api/currenttime
    else if (/^\/api\/currenttime/.test(req.url))
      result = getCurrentTime()
  
    if (result) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(result))
    } else {
      res.writeHead(404)
      res.end()
    }
  }).listen(port);