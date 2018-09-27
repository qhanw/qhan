const router = require("koa-router")();
const { user } = require("../mock/data");

const routers = router
  .get("/single/:id", async ctx => {
    console.log(ctx.params);
    ctx.body = {
      status: 200,
      data: user.userList.find(item => +item.id === +ctx.params.id),
      msg: 'request success!'
    };
  })
  .get("/list", async ctx => {
    ctx.body = { status: 200, data: user.userList };
  });

module.exports = routers;
