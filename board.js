(function () {
  var Board = window.Board || {};

  var Board = window.Board = function (dim) {
    this.dim = dim;
    this.snake = new Snake(dim);
    this.grid = Board.setupGrid(dim);
    this.apple = this.generateApple(dim);
  }

  Board.setupGrid = function(dim){
    var grid = new Array(dim);
    for (var i = 0; i < grid.length; i++) {
      grid[i] = new Array(dim);
    }

    return grid;
  }

  Board.prototype.update = function (){
    this.snake.move();
    if (this.snake.segments[0].join() === this.apple.join()) {
      this.snake.eatenApple = true;
      this.apple = this.generateApple(this.dim);
    }
  }

  Board.prototype.render = function(){
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j] = ".";
      }
    }

    var board = this;

    this.snake.segments.forEach( function (coord) {
      var coordX = coord[0];
      var coordY = coord[1];
      board.grid[coordX][coordY] = "S";
    });

    board.grid[this.apple[0]][this.apple[1]] = "A";

    return this.grid;
  };

  Board.prototype.generateApple = function (dim) {
    var applePos = [Math.floor(Math.random() * dim), Math.floor(Math.random() * dim)]
    while (this.snake.segments.includes(applePos)) {
      applePos = [Math.floor(Math.random() * dim), Math.floor(Math.random() * dim)];
    }
    return applePos
  }

  Array.prototype.includes = function (obj) {
    var status = false;
    this.forEach( function (el) {
      if (JSON.stringify(el) === JSON.stringify(obj)) {
        status = true;
      }
    });
    return status;
  }
})();
