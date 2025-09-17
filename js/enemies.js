function placeEnemies(map, player, enemies, items) {
    var count = randomInt(5, 10);

    for (var i = 0; i < count; i++) {
        var attempts = 0;
        var maxAttempts = 100;

        while (attempts < maxAttempts) {
            var x = randomInt(0, 39);
            var y = randomInt(0, 23);

            if (isEmpty(x, y, map, player, enemies, items)) {
                enemies.push({x: x, y: y, health: 50, attack: 10, lastAttackTime: 0});
                map[y][x] = 'EN';
                break;
            }
            attempts++;
        }

    }
}

function moveEnemies(field, map, player, enemies, items) {
    var currentTime = Date.now();
    var attackCoolDown = 500;
    var moved = false;

    for (var i = 0; i < enemies.length; i++) {
        var ex = enemies[i].x;
        var ey = enemies[i].y;

        if (Math.abs(ex - player.x) + Math.abs(ey - player.y) == 1) {
            if (currentTime - enemies[i].lastAttackTime >= attackCoolDown) {
                player.health = Math.max(0, player.health - enemies[i].attack);
                enemies[i].lastAttackTime = currentTime;
            }
            continue;
        }
        var directions = [
            {dx: 0, dy: -1},
            {dx: 0, dy: 1},
            {dx: -1, dy: 0},
            {dx: 1, dy: 0}
        ];
        var dir = directions[randomInt(0, 3)];
        var nx = enemies[i].x + dir.dx;
        var ny = enemies[i].y + dir.dy;

        if (nx < 0 || nx >= 40 || ny < 0 ||ny >= 24) {
            continue;
        }
        if (map[ny][nx] == 'W' || map[ny][nx] == 'EN' || map[ny][nx] == 'P' || map[ny][nx] == 'HP' || map[ny][nx] == 'SW') {
            continue;
        }
        if (map[ny][nx] == 'P') {
            player.health = Math.max(0, player.health - enemies[i].health);
        }

        map[enemies[i].y][enemies[i].x] = 'E';
        enemies[i].x = nx;
        enemies[i].y = ny;
        map[ny][nx] = 'EN';
        moved = true
    }
    if (moved) {
        render(field, map, enemies, items);
    }

}