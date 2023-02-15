
// 享元模式

// const Model = function (sex, underwear) {
//   this.sex = sex;
//   this.underwear = underwear;
// };

// Model.prototype.takePhoto = function () {
//   console.log(`sex=${this.sex} underwear=${this.underwear}`);
// };

// for (let i = 1; i <= 50; i++) {
//   const maleModel = new Model('male', `underwear${i}`);
//   maleModel.takePhoto();
// };

// for (let i = 1; i <= 50; i++) {
//   const femaleModel = new Model('female', `underwear${i}`);
//   femaleModel.takePhoto();
// };


// --
const Model = function (sex) {
  this.sex = sex;
};

Model.prototype.takePhoto = function () {
  console.log(`sex=${this.sex} underwear=${this.underwear}`);
};

// 创建男模特
const maleModel = new Model('male');
//创建女模特
const femaleModel = new Model('female');

for (let i = 1; i <= 50; i++) {
  maleModel.underwear = 'underwear' + i;
  maleModel.takePhoto();
}

for (let i = 1; i <= 50; i++) {
  femaleModel.underwear = 'underwear' + i;
  femaleModel.takePhoto();
}
