function render(field, map, player, enemies, items) {
    field.innerHTML = '';
    for (var y = 0; y < 24; y++) {
        for (var x = 0; x < 40; x++) {
            var cell = document.createElement('div');
            cell.className = 'tile';
            cell.style.left = (x * 35) + 'px';
            cell.style.top = (y * 35) + 'px';
            if (map[y][x] === 'P') {
                cell.className += ' tileP';
                var healthBar = document.createElement('div');
                healthBar.className = 'health';
                healthBar.style.width = (player.health * 0.5) + 'px';
                cell.appendChild(healthBar);
            } else if (map[y][x] == 'W') {
                cell.className += ' tileW';
            } else if (map[y][x] == 'E') {
                cell.className += ' tileE';
            } else if (map[y][x] == 'SW') {
                cell.className += ' tileSW';
            } else if (map[y][x] == 'HP') {
                cell.className += ' tileHP';
            } else if (map[y][x] == 'EN') {
                cell.className += ' tileEN';
                for (var i = 0; i < enemies.length; i++) {
                    if (x == enemies[i].x && y == enemies[i].y) {
                        var healthBar = document.createElement('div');
                        healthBar.className = 'health';
                        healthBar.style.width = (enemies[i].health * 0.5) + 'px';
                        cell.appendChild(healthBar);
                        break;
                    }
                }
            }
            field.appendChild(cell);
        }
    }
}
