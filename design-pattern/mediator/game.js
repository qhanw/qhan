// 中介者模式
function Player(name, teamColor) {
  this.name = name;
  this.teamColor = teamColor;
  this.state = 'alive';
};

Player.prototype.win = function () {
  console.log(`${this.name} won`);
};
Player.prototype.lose = function () {
  console.log(`${this.name} lost`);
};

Player.prototype.die = function () {
  this.state = 'dead';
  playerDirector.reciveMessage('playerDead', this);
};

Player.prototype.remove = function () {
  playerDirector.reciveMessage('removePlayer', this);
};

Player.prototype.changeTeam = function (color) {
  playerDirector.reciveMessage('changeTeam', this, color);
};


const playerFactory = function (name, teamColor) {
  const newPlayer = new Player(name, teamColor);
  playerDirector.reciveMessage('addPlayer', newPlayer);
  return newPlayer;
};

const playerDirector = (function () {
  const players = {}, // 保存所用玩家
    operations = {}; // 中介者可执行的操作

  // 新增一个玩家
  operations.addPlayer = function (player) {
    const teamColor = player.teamColor;
    players[teamColor] = players[teamColor] || [];

    players[teamColor].push(player);
  };

  // 移除一个玩家
  operations.removePlayer = function (player) {
    const teamColor = player.teamColor,
      teamPlayers = players[teamColor] || [];
    for (let i = teamPlayers.length - 1; i >= 0; i--) {
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1);
      }
    }
  };

  // 玩家切换队伍
  operations.changeTeam = function (player, newTeamColor) {
    operations.removePlayer(player);
    player.teamColor = newTeamColor;
    operations.addPlayer(player);
  };

  operations.playerDead = function (player) {
    const teamColor = player.teamColor,
      teamPlayers = players[teamColor];

    let all_dead = true;

    for (let i = 0, player; player = teamPlayers[i++];) {
      if (player.state !== 'dead') {
        all_dead = false;
        break;
      }
    }

    if (all_dead) {
      for (let i = 0, player; player = teamPlayers[i++];) {
        player.lose();
      }

      for (let color in players) {
        if (color !== teamColor) {
          const teamPlayers = players[color];
          for (let i = 0, player; player = teamPlayers[i++];) {
            player.win();
          }
        }
      }
    }
  };

  const reciveMessage = function () {
    const message = Array.prototype.shift.call(arguments);
    operations[message].apply(this, arguments);
  };

  return {
    reciveMessage
  }
})();


// 红队：
const player1 = playerFactory('皮蛋', 'red'),
  player2 = playerFactory('小乖', 'red'),
  player3 = playerFactory('宝宝', 'red'),
  player4 = playerFactory('小强', 'red');
// 蓝队：
const player5 = playerFactory('黑妞', 'blue'),
  player6 = playerFactory('葱头', 'blue'),
  player7 = playerFactory('胖墩', 'blue'),
  player8 = playerFactory('海盗', 'blue');
player1.changeTeam('blue');
player2.die();
player3.die();
player4.die();
