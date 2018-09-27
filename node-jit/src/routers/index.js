const router = require("koa-router")();

const home = require("./home");
const user = require("./user");
const page = require("./page");
const sign = require("./sign");

const config = {
  "/": home,
  "/user": user,
  "/page": page,
  "/sign": sign
};

Object.entries(config).forEach(([path, mod]) =>
  router.use(path, mod.routes(), mod.allowedMethods())
);

// router.use("/", home.routes(), home.allowedMethods());
// router.use("/user", user.routes(), user.allowedMethods());
// router.use("/page", page.routes(), page.allowedMethods());
// router.use("/sign", sign.routes(), sign.allowedMethods());

module.exports = router;
