const Koa = require("koa");
const fs = require("fs");
const path = require("path");
const views = require("koa-views");
const logger = require("koa-logger");
const jwt = require("koa-jwt");
const bodyParser = require("koa-bodyparser");
const staticRouter = require("koa-static-router");
const static = require("koa-static");
const routers = require("./src/routers");

//const secret = fs.readFileSync("../../private.key");
const { secret } = require("./constant");
const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(views(path.join(__dirname, "./src/views"), { extension: "pug" }));
// Custom 401 handling (first middleware)
app.use(function(ctx, next) {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message,
        status: 401
      };
    } else {
      throw err;
    }
  });
});
//app.use(jwt({ secret }).unless({ path: [ /\/page/, /\/sign/] }));

app.use(
  staticRouter({
    dir: "/public/swagger/dist/",
    router: "/v1/api/"
  })
);
app.use(static());
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(8000);
console.log("[demo] start-quick is starting at port 8000");
