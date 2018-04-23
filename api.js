var app = require('express')();
const request = require('request');
app.set("view engine", "ejs");//View engine ejs olarak set ettik
var fs = require('fs');

app.use((req, res, next)=> {
    var zaman = new Date().toString();
    var log = zaman + " " + req.url;
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err)=> {
        if (err) {
            console.log(err);
        }
    });
    next();
})

// app.use((req, res, next)=>{
//     res.render("calisma");
// })

app.get("/", (req, res)=> {
    res.render('arama');
})

app.get("/sonuc", (req, res)=> {

    var sorgu = req.query.sorgu;
    var url ="https://swapi.co/api/people/?search=" + sorgu;
    request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        var veri = JSON.parse(body);
        //res.send(veri);
        res.render('sonuc', {Ejs_Veri: veri});//ara ejs sini kullanarak render et
    }
})
});



app.listen(process.env.PORT);//PROCESS in çalıştığı yerin atadığı port numarasını dinle
