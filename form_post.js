var http = require('http');
var qs = require('querystring');
var fs = require('fs');

http.createServer(function (req, res) {

	if (req.url === "/login/" && req.method === "GET") {
		//tampilan form login
		fs.readFile("login_form.html",(err, data)=>{
			if (err) {//kirim balas error
				res.writeHead(404, {'Content-Type': 'text/html'});
				return res.end("404 not Found");
			}
			//kirim login_form.html
			res.writeHead(200, {'Content-Type': 'type/html'});
			res.write(data);
			return res.end();
		});
	}

	if (req.url === "/login/" && req.method === "POST") {
		//ambil data dari form dan proses
		var requestBody = '';
		req.on('data', function (data) {
			//tangpap data dari form
			requestBody += data;

			//kirim balasan jika datanya terlalu besar
			if (requestBody.length > 1e7) {
				res.writeHead(413, 'Request Entity to Large', {'Content-Type': 'text/html'});
				res.end('<!doctype html> <html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
			}
		});

		//kita sudah dapat datanya
		//langkah berikutnya tinggal di-parse
		req.on('end',function() {
			var formData = qs.parse(requestBody);

			//cek login
			if (formData.username ==="admin" && formData.password === "admin") {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write('<h2>Selamat Datang Bos!</h2>');
				res.write('<p>username: '+formData.username+'</p>');
				res.write('<p>password: '+formData.password+'</p>');
				res.write("<a href='/login/'>Kembali</a>");
				res.end();
			}else{
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write('<h2>Login Gagal Bos!</h2>');
				res.write("<a href='/login/'>Coba Lagi</a>");
				res.end();
			}

		});
	}

}).listen(8000);

console.log('server is runningon http://localhost:8000');
