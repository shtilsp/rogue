function placePlayer(map, player, enemies, items) {
    var attempts = 0;
    var maxAttempt = 100;

    while (attempts <= maxAttempt) {
        var x = randomInt(0, 39);
        var y =randomInt(0, 23);

        if (isEmpty(x, y, map, player, enemies, items)) {
            player.x = x;
            player.y = y;
            map[y][x] = 'P';
            return true;
        }
        attempts ++;
    }

}

function movePlayer(dx, dy, field, map, player, enemies, items) {

    var nx = player.x + dx;
    var ny = player.y + dy;

    if (nx < 0 || nx >= 40 || ny < 0 || ny >= 24) {
        return;
    }

    if (map[ny][nx] === 'W' || map[ny][nx] === 'EN') {
        return;
    }

    if (map[ny][nx] === 'SW' || map[ny][nx] === 'HP') {
        collectItems(nx, ny, player, items, map);
    }

    map[player.y][player.x] = 'E';
    player.x = nx;
    player.y = ny;
    map[ny][nx] = 'P';

    render(field, map, player, enemies, items);
}

function attackEnemies(field, map, player, enemies, items) {
    var attacked = false;
    for (var i = enemies.length - 1; i >= 0; i--) {
        var ex = enemies[i].x;
        var ey = enemies[i].y;
        if (Math.abs(ex - player.x) + Math.abs(ey - player.y) == 1) {
            enemies[i].health = Math.max(0, enemies[i].health - player.attack)
            if (enemies[i].health <= 0) {
                map[ey][ex] = 'E';
                enemies.splice(i, 1);
            }
            attacked = true;
        }
        if (attacked) {
            render(field, map, player, enemies, items);
        }
    }
}