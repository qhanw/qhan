const router = require("koa-router")();
const jwt = require("jsonwebtoken");
//const fs = require("fs");
const { user } = require("../mock/data");

//const cert = fs.readFileSync("/private.key");
const { secret } = require("../../constant");

const routers = router
  .get("/in", async ctx => {
    //     let html = `
    //     <h1>koa2 request post demo</h1>
    //     <form method="POST" action="/sign/in">
    //       <p>userName</p>
    //       <input name="name" /><br/>
    //       <p>pwd</p>
    //       <input name="pwd" /><br/>
    //       <button type="submit">submit</button>
    //     </form>
    //   `;
    //     ctx.body = html;
    await ctx.render("sign", {title: 'Sign in'});
  })
  .post("/in", async ctx => {
    const { name, pwd } = ctx.request.body;
    const isHas = user.userList.find(item => item.name === name);
    if (isHas && isHas.pwd === pwd) {
      const token = jwt.sign({ name }, secret, { expiresIn: "1h" });
      ctx.body = {
        status: 200,
        ret: 1,
        data: { token, name, pwd },
        msg: "request success!"
      };
    } else {
      ctx.body = { status: 200, ret: 0, data: null, msg: "帐户名密码错误！" };
    }
  })
  .post("/up", async ctx => {
    ctx.body = "post";
  })
  .post("/out", async ctx => {
    ctx.body = "out";
  });

module.exports = routers;
