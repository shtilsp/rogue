var globalGenerationAttempts = 0;
var maxGenerationAttempts = 5;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMap() {
    if (globalGenerationAttempts >= maxGenerationAttempts) {
        var map = new Array(24);
        for (var i = 0; i < 24; i++) {
            map[i] = new Array(40).fill('E');
        }
        return map;
    }
    globalGenerationAttempts++;

    var map = new Array(24);
    var rooms = [];

    // Инициализация карты стенами
    for (var i = 0; i < 24; i++) {
        map[i] = new Array(40).fill('W');
    }

    var roomsCount = randomInt(5, 10);
    var maxAttempts = 50;
    var roomAttempts = 0;

    // Проверка на непересекаемость комнат
    function isAllW(map, x, y, w, h) {
        for (var i = y; i < y + h; i++) {
            for (var j = x; j < x + w; j++) {
                if (i < 0 || i >= 24 || j < 0 || j >= 40 || map[i][j] !== 'W') {
                    return false;
                }
            }
        }
        return true;
    }

    // Создание комнат
    for (var i = 0; i < roomsCount; i++) {
        var w = randomInt(3, 8);
        var h = randomInt(3, 8);
        var x = randomInt(0, 40 - w);
        var y = randomInt(0, 24 - h);


        if (isAllW(map, x, y, w, h)) {
            for (var iRow = y; iRow < y + h; iRow++) {
                for (var iCol = x; iCol < x + w; iCol++) {
                    map[iRow][iCol] = 'E';
                }
            }
            rooms.push({ x: x, y: y, w: w, h: h });
        } else {
            roomAttempts++;
            if (roomAttempts < maxAttempts) {
                i--;
            }
        }
    }

    // Соединение всех комнат проходами
    function connectRooms(map, rooms) {

        // Функция для создания прохода между двумя комнатами
        function connectTwoRooms(room1, room2) {
            var x1 = Math.floor(room1.x + room1.w / 2);
            var y1 = Math.floor(room1.y + room1.h / 2);
            var x2 = Math.floor(room2.x + room2.w / 2);
            var y2 = Math.floor(room2.y + room2.h / 2);

            // L проход
            var x = x1;
            var y = y1;

            while (x !== x2) {
                if (x >= 0 && x < 40 && y >= 0 && y < 24) {
                    map[y][x] = 'E';
                }
                x += x < x2 ? 1 : -1;
            }
            while (y !== y2) {
                if (x >= 0 && x < 40 && y >= 0 && y < 24) {
                    map[y][x] = 'E';
                }
                y += y < y2 ? 1 : -1;
            }
        }

        // Соединение каждой комнаты со следующей
        for (var i = 0; i < rooms.length - 1; i++) {
            connectTwoRooms(rooms[i], rooms[i + 1]);
        }

        // Проверка связности
        var visited = new Array(24);
        for (var i = 0; i < 24; i++) {
            visited[i] = new Array(40).fill(false);
        }

        function floodFill(x, y) {
            if (x < 0 || x >= 40 || y < 0 || y >= 24 || visited[y][x] || map[y][x] !== 'E') {
                return;
            }
            visited[y][x] = true;
            floodFill(x + 1, y);
            floodFill(x - 1, y);
            floodFill(x, y + 1);
            floodFill(x, y - 1);
        }

        var startX, startY;
        if (rooms.length > 0) {
            startX = Math.floor(rooms[0].x + rooms[0].w / 2);
            startY = Math.floor(rooms[0].y + rooms[0].h / 2);
            if (map[startY][startX] !== 'E') {
                for (var y = rooms[0].y; y < rooms[0].y + rooms[0].h; y++) {
                    for (var x = rooms[0].x; x < rooms[0].x + rooms[0].w; x++) {
                        if (map[y][x] === 'E') {
                            startX = x;
                            startY = y;
                            break;
                        }
                    }
                    if (startX !== undefined && startY !== undefined) break;
                }
            }
        }

        if (startX === undefined || startY === undefined) {
            return false;
        }

        // Проверка на связность и добавление комнаты
        var maxConnectionAttempts = 10;
        var connectionAttempts = 0;
        var totalE = 0;
        var visitedE = 0;

        // общее количество пустых клеток
        for (var y = 0; y < 24; y++) {
            for (var x = 0; x < 40; x++) {
                if (map[y][x] === 'E') totalE++;
            }
        }

        while (visitedE < totalE && connectionAttempts < maxConnectionAttempts) {
            for (var i = 0; i < 24; i++) {
                visited[i].fill(false);
            }
            floodFill(startX, startY);

            // Посещенные пустые клетки
            visitedE = 0;
            for (var y = 0; y < 24; y++) {
                for (var x = 0; x < 40; x++) {
                    if (visited[y][x]) visitedE++;
                }
            }

            if (visitedE < totalE) {
                // Все посещённые и не посещённые комнаты
                var visitedRooms = [];
                var unvisitedRooms = [];
                for (var k = 0; k < rooms.length; k++) {
                    var room = rooms[k];
                    var centerX = Math.floor(room.x + room.w / 2);
                    var centerY = Math.floor(room.y + room.h / 2);
                    if (map[centerY][centerX] === 'E' && visited[centerY][centerX]) {
                        visitedRooms.push(room);
                    } else if (map[centerY][centerX] === 'E' && !visited[centerY][centerX]) {
                        unvisitedRooms.push(room);
                    }
                }

                if (visitedRooms.length === 0 || unvisitedRooms.length === 0) {
                    break;
                }

                var visitedRoom = visitedRooms[Math.floor(Math.random() * visitedRooms.length)];
                var unvisitedRoom = unvisitedRooms[Math.floor(Math.random() * unvisitedRooms.length)];
                connectTwoRooms(visitedRoom, unvisitedRoom);
                connectionAttempts++;
            }
        }

        if (visitedE < totalE) {
            return false;
        }
        return true;
    }

    if (rooms.length > 0 && !connectRooms(map, rooms)) {
        return generateMap();
    }

    globalGenerationAttempts = 0;
    return map;
}