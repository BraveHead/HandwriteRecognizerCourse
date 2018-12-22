import web

class WebRoot:
    def GET(self):
        return "Hello World"

class GetServer:
    def handle_request(self, args):
        if "name" in args:
            return '<html>' \
                        '<head>' \
                            '<meta charset="UTF-8"/>'\
                        '</head>'\
                        '<body>Hello %s</body>'\
                   '</html>' % (args["name"])
        else:
            return "no args"
    def GET(self):
        args = web.input(_method="GET")
        return self.handle_request(args)

    def POST(self):
        args = web.input(_method="POST")
        return  self.handle_request(args)

urls = (
    "/",WebRoot,
    "/server",GetServer,
)

app = web.application(urls)

app.run()