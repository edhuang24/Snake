(function () {
  var View = window.View || {};

  KEYS = { 65: "W",
           83: "S",
           68: "E",
           87: "N",
       	   80: "P"}

  var View = window.View = function(board, $el){
    this.board = board;
    this.$el = $el;
    this.setupGrid();
    this.renderBoard();
    this.buttonDown = false;
    $(window).on("keydown", this.keyBinding.bind(this));

    this.timerID = 0;
    this.timerID = window.setInterval(this.step.bind(this), 200);

  };

  View.prototype.step = function (){
    try {
      $('.msg').remove();
      this.board.update();
      this.renderBoard();
      var $msg = $('<p>').text("Your current score is ");
      var $points = $('<strong></strong>').text(this.board.snake.segments.length);
      $msg.addClass("msg").append($points);
      $('body').append($msg);
    } catch (err) {
      window.clearInterval(this.timerID);
      var $loseMsg = $('<p>').text("Your snake has died! Your score was ");
      var $points = $('<strong></strong>').text(this.board.snake.segments.length);

      $loseMsg.append($points);
      $loseMsg.html($loseMsg.html() + ".");
      $('body').append($loseMsg);
      $('body').append('<p>You may press R to refresh the game.</p>');

      $(window).on("keyup", this.reloadGame.bind(this));
    }
  };

  View.prototype.setupGrid = function () {
    for (var i = 0; i < this.board.grid.length; i++) {
      var $ul = $("<ul>");
      for (var j = 0; j < this.board.grid[0].length; j++) {
        var $li = $("<li>").attr("x-pos", i).attr("y-pos", j);
        $ul.append($li);
      }

      this.$el.append($ul);
    }

  };

  View.prototype.renderBoard = function () {
    var boardRendering = this.board.render();
    $lis = this.$el.children().children();
    for (var i = 0; i < $lis.length; i++) {
      if (boardRendering[+$lis.eq(i).attr("x-pos")][+$lis.eq(i).attr("y-pos")] === "S") {
        $lis.eq(i).addClass("snake");
      } else if (boardRendering[+$lis.eq(i).attr("x-pos")][+$lis.eq(i).attr("y-pos")] === "A") {
        $lis.eq(i).addClass("apple");
      } else {
        $lis.eq(i).removeClass("snake");
        $lis.eq(i).removeClass("apple");
      }
    }
  };

  View.prototype.keyBinding = function (event) {
    if (this.buttonDown) {
      return;
    }
    this.buttonDown = true;
    var view = this;
    setTimeout( function () {
      if (KEYS[event.keyCode] === undefined) {
        view.buttonDown = false;
        return;
      } else if (KEYS[event.keyCode] === "P") {
        alert("You have paused the game. Click OK to return to the game!");
        view.buttonDown = false;
        return;
      } else {
        view.board.snake.turn(KEYS[event.keyCode]);
        view.buttonDown = false;
      }
    }, 150);
  };

  View.prototype.reloadGame = function (e) {
    if (e.keyCode === 82) {
      window.location.reload(true);
    }
  };
})();
