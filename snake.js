(function () {
  var Snake = window.Snake || {};

  var Snake = window.Snake = function (dim) {
    this.dim = dim;
    randomIndex = Math.floor(Math.random() * 4)
    this.dir = ["N", "S", "E", "W"][randomIndex];
    this.segments = [[Math.floor(Math.random() * dim), Math.floor(Math.random() * dim)]];
    this.eatenApple = false;
  }

  Snake.prototype.move = function () {
    if (this.segments[0][0] < 0 || this.segments[0][0] >= this.dim || this.segments[0][1] < 0 || this.segments[0][1] >= this.dim) {
      throw new Error;
    }
    var snake = this;
    this.segments.slice(1).forEach ( function (coord) {
      if (coord.join("-") === snake.segments[0].join("-")) {
        throw new Error;
      }
    });
    this.eatenApple = Coord.plus(this.segments, this.dir, this.eatenApple);
  }


  Snake.prototype.turn = function (dir) {
    if (!Coord.isOpposite(this.dir, dir)) {
      this.dir = dir;
    }
  }

  function Coord () {}

  Coord.plus = function (segments, dir, eatenApple) {
    var newHead = segments[0].slice(0);
    if (eatenApple === false) {
      segments.pop();
    } else {
      eatenApple = false;
    }
    switch(dir) {
      case "N":
        newHead[0] -= 1;
        break;
      case "S":
        newHead[0] += 1;
        break;
      case "E":
        newHead[1] += 1;
        break;
      case "W":
        newHead[1] -= 1;
        break;
    }
    // debugger;
    segments.unshift(newHead);
    return eatenApple;
  }

  Coord.equals = function (coord1, coord2) {
    return coord1.join() === coord2.join();
  }

  OPPOSITE = {
    "N": "S",
    "S": "N",
    "E": "W",
    "W": "E"
  }

  Coord.isOpposite = function (dir1, dir2) {
    return OPPOSITE[dir1] === dir2;
  }

})();
