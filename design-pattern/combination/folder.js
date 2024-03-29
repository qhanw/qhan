// 组合模式 扫描文件夹 Folder
const Folder = function (name) {
  this.name = name;
  this.parent = null;
  this.files = [];
};
Folder.prototype.add = function (file) {
  file.parent = this;
  this.files.push(file);
};

Folder.prototype.scan = function () {
  console.log(this.files)
  console.log('开始扫描文件夹：' + this.name);
  for (let i = 0, file, files = this.files; file = files[i++];) {
    file.scan();
  }
}
Folder.prototype.remove = function () {
  if (!this.parent) return; //根节点或者树外的游离节点
  for (let files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    let file = files[l];
    if (file === this) {
      files.splice(l, 1);
    }
  }
};

// File
const File = function (name) {
  this.name = name;
  this.parent = null;
}

File.prototype.add = function () {
  throw new Error('文件下面不能再添加文件');
}

File.prototype.scan = function () {
  console.log('开始扫描文件：' + this.name)
}

File.prototype.remove = function () {
  if (!this.parent) return;
  for (let files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    const file = files[l];
    if (file === this) files.splice(l, 1);
  }
}

// 创建文件夹与文件

// const folder = new Folder('学习资料');
// const folder1 = new Folder('Javascript');
// const folder2 = new Folder('jQuery');

// const file1 = new File('JavaScript设计模式与开发实践');
// const file2 = new File('精通jQuery');
// const file3 = new File('重构与模式');

// folder1.add(file1);
// folder2.add(file2);

// folder.add(folder1);
// folder.add(folder2);
// folder.add(file3);

// const folder3 = new Folder('Nodejs');
// const file4 = new File('深入浅出Node.js');
// folder3.add(file4);

// const file5 = new File('Javascript 语言精髓与编程实践');

// folder.add(folder3);
// folder.add(file5)

// folder.scan();


const folder = new Folder('学习资料');
const folder1 = new Folder('JavaScript');
const file1 = new Folder('深入浅出Node.js');
folder1.add(new File('JavaScript 设计模式与开发实践'));
folder.add(folder1);
folder.add(file1);
folder1.remove(); //移除文件夹
folder.scan();
