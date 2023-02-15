// 组合模式

const leafAdd = () => {
  throw new Error("叶对象不能添加子节点");
};

const MacroCommand = function () {
  return {
    commandsList: [],
    add: function (command) {
      this.commandsList.push(command);
    },
    execute: function () {
      for (let i = 0, command; (command = this.commandsList[i++]);) {
        command.execute();
      }
    },
  };
};

const openAcCommand = {
  execute: function () {
    console.log("打开空调");
  },
  add: leafAdd,
};
// ----------------------------------------
const openTvCommand = {
  execute: function () {
    console.log("打开电视");
  },
  add: leafAdd,
};

const openSoundCommand = {
  execute: function () {
    console.log("打开音响");
  },
  add: leafAdd,
};

const macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);

const closeDoorCommand = {
  execute: function () {
    console.log("关门");
  },
  add: leafAdd,
};

const openPcCommand = {
  execute: function () {
    console.log("开电脑");
  },
  add: leafAdd,
};

const openQQCommand = {
  execute: function () {
    console.log("登录QQ");
  },
  add: leafAdd,
};

const macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand);

const macroCommand = MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);

// -----------------------------------------------------
// 执行测试
const command = macroCommand;
command.execute();


