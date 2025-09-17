function placeItems(type, count, map, player, enemies, items) {
    for (var i = 0; i < count; i++) {
        var attempt = 0;
        var maxAttempts = 50;

        while (attempt <= maxAttempts) {
            var x = randomInt(0, 39);
            var y = randomInt(0, 23);

            if (isEmpty(x, y, map, player, enemies, items)) {
                items.push({type: type, x: x, y: y});
                map[y][x] = (type == 'sword' ? 'SW' : 'HP');
                break;
            } else {
                attempt ++;
            }
        }
    }
}

function collectItems(x, y, player, items, map) {
    for (var i =0; i < items.length; i++) {
        if (items[i].type == 'potion') {
            player.health = Math.min(player.health + 20, 100);
        } else if (items[i].type == 'sword') {
            player.attack += 5;
        }
        items.splice(i, 1);
        map[y][x] = 'E';
        return;
    }
}