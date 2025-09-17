function Game() {
    this.field = document.getElementById('field');
    this.map = [];
    this.player = {
        x: 0,
        y: 0,
        health: 100,
        attack: 10
    };
    this.enemies = [];
    this.items = [];
    this.keys = {};
    this.spacePressed = false;
    this.isGameOver = false;
}

Game.prototype.init = function () {

    this.map = generateMap();
    placeItems('sword', 2, this.map, this.player, this.enemies, this.items);
    placeItems('potion', 10, this.map, this.player, this.enemies, this.items);
    if (!placePlayer(this.map, this.player, this.enemies, this.items)) {
        return;
    }
    placeEnemies(this.map, this.player, this.enemies, this.items);
    render(this.field, this.map, this.player, this.enemies, this.items);


    var self = this;

    document.addEventListener('keydown', function(e){
        self.keys[e.keyCode] = true;
        if (e.keyCode == 32) {
            self.spacePressed = true;
        }
    });

    document.addEventListener('keyup', function(e){
        self.keys[e.keyCode] = false;
        if (e.keyCode == 32) {
            self.spacePressed = false;
        }
    })

    var restartButtonGameOver = document.getElementById('restart-button-game-over');
    var restartButtonVictory = document.getElementById('restart-button-victory');
    if (restartButtonGameOver) {
        restartButtonGameOver.addEventListener('click', function(e){
            location.reload();
        })
    }
    if (restartButtonVictory) {
        restartButtonVictory.addEventListener('click', function(e){
            location.reload();
        })
    }


    setInterval(function () {
        if (self.isGameOver) return;


        //Движение
        var dx = 0, dy = 0;
        if (self.keys[87]) {dy = -1;} //W
        if (self.keys[83]) {dy = 1;}  //S
        if (self.keys[65]) {dx = -1;} //A
        if (self.keys[68]) {dx = 1;}  //D
        if (dx != 0 || dy != 0) {
            movePlayer(dx, dy, self.field, self.map, self.player, self.enemies, self.items);
        }
        //Атака
        if (self.spacePressed) {
            attackEnemies(self.field, self.map, self.player, self.enemies, self.items);
        }

        moveEnemies(self.field, self.map, self.player, self.enemies, self.items);

        if (self.player.health <= 0) {
            self.isGameOver = true;
            var gameOverModal = document.getElementById('game-over-modal');
            if (gameOverModal) {
                gameOverModal.style.display = 'flex';
            }
            return;
        }

        if (self.enemies.length === 0) {
            self.isGameOver = true;
            var victoryModal = document.getElementById('victory-modal');
            if (victoryModal) {
                victoryModal.style.display = 'flex';
            }
            return;
        }

        render(self.field, self.map, self.player, self.enemies, self.items);
    }, 100)

}