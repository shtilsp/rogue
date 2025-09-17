function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isInBounds(x, y) {
    return x >= 0 && x < 40 && y >= 0 && y < 24;
}

function isEmpty(x, y, map, player, enemies, items) {

    if (!isInBounds(x, y)) {
        return false;
    }

    if (map[y][x] != 'E') {
        return false;
    }

    if (player.x == x && player.y == y) {
        return false;
    }

    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].x == x && enemies[i].y == y) {
            return false;
        }
    }

    for (var i = 0; i < items.length; i++) {
        if (items[i].x == x && items[i].y == y) {
            return false;
        }
    }

    return true;
}