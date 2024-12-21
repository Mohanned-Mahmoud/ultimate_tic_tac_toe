var versionCode = "TicTacToeAI"
  , player1Wins = null !== localStorage.getItem("up1w") && void 0 !== localStorage.getItem("up1w") ? localStorage.getItem("up1w") : 0;
let player1WinsVSComp = null !== localStorage.getItem("up1wc") && void 0 !== localStorage.getItem("up1wc") ? localStorage.getItem("up1wc") : 0;
var player2Wins = null !== localStorage.getItem("up2w") && void 0 !== localStorage.getItem("up2w") ? localStorage.getItem("up2w") : 0
  , computerWins = null !== localStorage.getItem("ucw") && void 0 !== localStorage.getItem("ucw") ? localStorage.getItem("ucw") : 0
  , currentBlock = [12, 12]
  , lastAIMove = [12, 12]
  , initialMode = 3
  , limitMoves1 = 5
  , limitMoves2 = 6
  , limitMoves3 = 7;
let whoTurnString = "X";
gtag("event", "ultimate_page_view");
var colorRed = "red"
  , colorGrey = "#cabbbb"
  , pauseForAnimate = 1200
  , pauseForFinishWin = 2e3
  , pauseForFinishTie = 1500
  , easyMilSeconds = 1e-15
  , mediumMilSeconds = 1700
  , hardMilSeconds = 11e3
  , blinking = 0
  , correctMove = !0
  , unCorrectMoveCounter = 0
  , combo = []
  , limitTimer1 = null !== localStorage.getItem("lt1") && void 0 !== localStorage.getItem("lt1") ? localStorage.getItem("lt1") : easyMilSeconds
  , timer1 = 1e9
  , mobileOffset = 0
  , mobileOffsetString = 0
  , hoverColor = "#eeeeee4f"
  , lastMoveColor = "#e1eeee4f";
null !== localStorage.getItem("p1n") && void 0 !== localStorage.getItem("p1n") && "" !== localStorage.getItem("p1n") && (playerNames[0] = localStorage.getItem("p1n")),
null !== localStorage.getItem("p2n") && void 0 !== localStorage.getItem("p2n") && "" !== localStorage.getItem("p2n") && (playerNames[1] = localStorage.getItem("p2n"));
var WIDTH, HEIGHT, bigSize, smallSize, revertPlayers = !1;
smallSize = window.screen.width < 900 ? (WIDTH = window.screen.width,
HEIGHT = window.screen.width,
bigSize = "370px",
"100px") : (HEIGHT = WIDTH = 590,
bigSize = "270px",
"70px"),
window.screen.width < 800 && (bigSize = "330px",
smallSize = "87px"),
window.screen.width < 700 && (bigSize = "291px",
smallSize = "81px"),
window.screen.width < 600 && (bigSize = "261px",
smallSize = "67px"),
window.screen.width < 500 && (bigSize = "233px",
smallSize = "60px"),
window.screen.width < 450 && (bigSize = "212px",
smallSize = "50px",
mobileOffset = 20,
mobileOffsetString = 10),
window.screen.width < 400 && (bigSize = "195px",
smallSize = "45px",
mobileOffset = 17,
mobileOffsetString = 9),
window.screen.width < 350 && (bigSize = "173px",
smallSize = "44px",
mobileOffsetString = mobileOffset = 14);
var COLORS = {
    grey: "#1a1a1a",
    white: "#fff",
    blue: "#fff",
    red: "#fff"
}
  , boards = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]
  , mainBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  , mousePosX = 0
  , mousePosY = 0
  , clicked = !1
  , canvas = document.getElementById("tictac")
  , ctx = canvas.getContext("2d");
canvas.width = WIDTH,
canvas.height = HEIGHT;
let ratio = Math.ceil(window.devicePixelRatio);
canvas.width = canvas.width * ratio,
canvas.height = canvas.height * ratio,
ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
var currentTurn = 1
  , player = 1
  , ai = -1
  , currentBoard = 4
  , gameRunning = !1
  , RUNS = 0
  , MOVES = 0
  , ALL_MOVES = 0
  , CORRECT_MOVES = 0
  , switchAroo = 1
  , AIACTIVE = !0
  , confettiMode = 1
  , confettiCount = 1
  , stagingConfetti = 1;
function randomInRangeFull(e, t) {
    return Math.floor(e + Math.random() * (t + 1 - e))
}
function checkWinCondition(e) {
    var t = 1;
    return e[0] + e[1] + e[2] === 3 * t || e[3] + e[4] + e[5] === 3 * t || e[6] + e[7] + e[8] === 3 * t || e[0] + e[3] + e[6] === 3 * t || e[1] + e[4] + e[7] === 3 * t || e[2] + e[5] + e[8] === 3 * t || e[0] + e[4] + e[8] === 3 * t || e[2] + e[4] + e[6] === 3 * t ? t : (t = -1,
    e[0] + e[1] + e[2] === 3 * t || e[3] + e[4] + e[5] === 3 * t || e[6] + e[7] + e[8] === 3 * t || e[0] + e[3] + e[6] === 3 * t || e[1] + e[4] + e[7] === 3 * t || e[2] + e[5] + e[8] === 3 * t || e[0] + e[4] + e[8] === 3 * t || e[2] + e[4] + e[6] === 3 * t ? t : 0)
}
function evaluateGame(e, t) {
    for (var o = 0, l = [], r = [1.4, 1, 1.4, 1, 1.75, 1, 1.4, 1, 1.4], i = 0; i < 9; i++) {
        o += 1.5 * realEvaluateSquare(e[i]) * r[i],
        i === t && (o += realEvaluateSquare(e[i]) * r[i]);
        var a = checkWinCondition(e[i]);
        o -= a * r[i],
        l.push(a)
    }
    return o -= 5e3 * checkWinCondition(l),
    o += 150 * realEvaluateSquare(l)
}
function miniMax(e, t, o, l, r, i, a) {
    RUNS++;
    Date.now();
    var n = -1
      , c = evaluateGame(e, t);
    if (o <= 0 || 5e3 < Math.abs(c) || a < Date.now())
        return {
            mE: c,
            tP: n
        };
    if (-1 !== t && 0 !== checkWinCondition(e[t]) && (t = -1),
    -1 === t || e[t].includes(0) || (t = -1),
    i) {
        for (var m = -1 / 0, s = 0; s < 9; s++) {
            var d = -1 / 0;
            if (-1 === t) {
                for (var u = 0; u < 9; u++)
                    0 === checkWinCondition(e[s]) && (0 === e[s][u] && (e[s][u] = ai,
                    d = miniMax(e, u, o - 1, l, r, !1, a).mE,
                    e[s][u] = 0),
                    m < d && (m = d,
                    n = s),
                    l = Math.max(l, d));
                if (r <= l)
                    break
            } else {
                0 === e[t][s] && (e[t][s] = ai,
                d = miniMax(e, s, o - 1, l, r, !1, a),
                e[t][s] = 0);
                var I = d.mE;
                if (m < I && (m = I,
                n = d.tP),
                r <= (l = Math.max(l, I)))
                    break
            }
        }
        return {
            mE: m,
            tP: n
        }
    }
    for (var g = 1 / 0, s = 0; s < 9; s++) {
        var T = 1 / 0;
        if (-1 === t) {
            for (u = 0; u < 9; u++)
                0 === checkWinCondition(e[s]) && (0 === e[s][u] && (e[s][u] = player,
                T = miniMax(e, u, o - 1, l, r, !0, a).mE,
                e[s][u] = 0),
                T < g && (g = T,
                n = s),
                r = Math.min(r, T));
            if (r <= l)
                break
        } else {
            0 === e[t][s] && (e[t][s] = player,
            T = miniMax(e, s, o - 1, l, r, !0, a),
            e[t][s] = 0);
            var f = T.mE;
            if (f < g && (g = f,
            n = T.tP),
            (r = Math.min(r, f)) <= l)
                break
        }
    }
    return {
        mE: g,
        tP: n
    }
}
function oneBoardMinMax(e, t, o, l, r) {
    if (RUNS++,
    0 !== checkWinCondition(e))
        return 0 < t ? 10 * -checkWinCondition(e) - sign(-checkWinCondition(e)) * t * .5 : 10 * -checkWinCondition(e) - sign(-checkWinCondition(e)) * t * .1;
    for (var i = 0, a = 0; a < 9; a++)
        0 !== e[a] && i++;
    if (9 === i || 1e3 === t)
        return 0;
    if (r) {
        var n = -1 / 0;
        for (m in e)
            if (0 === e[m]) {
                e[m] = ai;
                var c = oneBoardMinMax(e, t + 1, o, l, !1);
                if (e[m] = 0,
                n = Math.max(n, c),
                l <= (o = Math.max(o, c)))
                    break
            }
        return n
    }
    var m, s = 1 / 0;
    for (m in e)
        if (0 === e[m]) {
            e[m] = player;
            c = oneBoardMinMax(e, t + 1, o, l, !0);
            if (e[m] = 0,
            s = Math.min(s, c),
            (l = Math.min(l, c)) <= o)
                break
        }
    return s
}
function evaluatePos(e, t) {
    e[t] = ai;
    var o = 0
      , l = 2;
    return o += [.2, .17, .2, .17, .22, .17, .2, .17, .2][t],
    l = -2,
    e[0] + e[1] + e[2] !== l && e[3] + e[4] + e[5] !== l && e[6] + e[7] + e[8] !== l && e[0] + e[3] + e[6] !== l && e[1] + e[4] + e[7] !== l && e[2] + e[5] + e[8] !== l && e[0] + e[4] + e[8] !== l && e[2] + e[4] + e[6] !== l || (o += 1),
    l = -3,
    e[0] + e[1] + e[2] !== l && e[3] + e[4] + e[5] !== l && e[6] + e[7] + e[8] !== l && e[0] + e[3] + e[6] !== l && e[1] + e[4] + e[7] !== l && e[2] + e[5] + e[8] !== l && e[0] + e[4] + e[8] !== l && e[2] + e[4] + e[6] !== l || (o += 5),
    e[t] = player,
    l = 3,
    e[0] + e[1] + e[2] !== l && e[3] + e[4] + e[5] !== l && e[6] + e[7] + e[8] !== l && e[0] + e[3] + e[6] !== l && e[1] + e[4] + e[7] !== l && e[2] + e[5] + e[8] !== l && e[0] + e[4] + e[8] !== l && e[2] + e[4] + e[6] !== l || (o += 2),
    e[t] = ai,
    o -= 15 * checkWinCondition(e),
    e[t] = 0,
    o
}
function realEvaluateSquare(e) {
    var t, o = 0, l = [.2, .17, .2, .17, .22, .17, .2, .17, .2];
    for (t in e)
        o -= e[t] * l[t];
    var r = 2;
    return e[0] + e[1] + e[2] !== r && e[3] + e[4] + e[5] !== r && e[6] + e[7] + e[8] !== r || (o -= 6),
    e[0] + e[3] + e[6] !== r && e[1] + e[4] + e[7] !== r && e[2] + e[5] + e[8] !== r || (o -= 6),
    e[0] + e[4] + e[8] !== r && e[2] + e[4] + e[6] !== r || (o -= 7),
    r = -1,
    (e[0] + e[1] === 2 * r && e[2] === -r || e[1] + e[2] === 2 * r && e[0] === -r || e[0] + e[2] === 2 * r && e[1] === -r || e[3] + e[4] === 2 * r && e[5] === -r || e[3] + e[5] === 2 * r && e[4] === -r || e[5] + e[4] === 2 * r && e[3] === -r || e[6] + e[7] === 2 * r && e[8] === -r || e[6] + e[8] === 2 * r && e[7] === -r || e[7] + e[8] === 2 * r && e[6] === -r || e[0] + e[3] === 2 * r && e[6] === -r || e[0] + e[6] === 2 * r && e[3] === -r || e[3] + e[6] === 2 * r && e[0] === -r || e[1] + e[4] === 2 * r && e[7] === -r || e[1] + e[7] === 2 * r && e[4] === -r || e[4] + e[7] === 2 * r && e[1] === -r || e[2] + e[5] === 2 * r && e[8] === -r || e[2] + e[8] === 2 * r && e[5] === -r || e[5] + e[8] === 2 * r && e[2] === -r || e[0] + e[4] === 2 * r && e[8] === -r || e[0] + e[8] === 2 * r && e[4] === -r || e[4] + e[8] === 2 * r && e[0] === -r || e[2] + e[4] === 2 * r && e[6] === -r || e[2] + e[6] === 2 * r && e[4] === -r || e[4] + e[6] === 2 * r && e[2] === -r) && (o -= 9),
    r = -2,
    e[0] + e[1] + e[2] !== r && e[3] + e[4] + e[5] !== r && e[6] + e[7] + e[8] !== r || (o += 6),
    e[0] + e[3] + e[6] !== r && e[1] + e[4] + e[7] !== r && e[2] + e[5] + e[8] !== r || (o += 6),
    e[0] + e[4] + e[8] !== r && e[2] + e[4] + e[6] !== r || (o += 7),
    r = 1,
    (e[0] + e[1] === 2 * r && e[2] === -r || e[1] + e[2] === 2 * r && e[0] === -r || e[0] + e[2] === 2 * r && e[1] === -r || e[3] + e[4] === 2 * r && e[5] === -r || e[3] + e[5] === 2 * r && e[4] === -r || e[5] + e[4] === 2 * r && e[3] === -r || e[6] + e[7] === 2 * r && e[8] === -r || e[6] + e[8] === 2 * r && e[7] === -r || e[7] + e[8] === 2 * r && e[6] === -r || e[0] + e[3] === 2 * r && e[6] === -r || e[0] + e[6] === 2 * r && e[3] === -r || e[3] + e[6] === 2 * r && e[0] === -r || e[1] + e[4] === 2 * r && e[7] === -r || e[1] + e[7] === 2 * r && e[4] === -r || e[4] + e[7] === 2 * r && e[1] === -r || e[2] + e[5] === 2 * r && e[8] === -r || e[2] + e[8] === 2 * r && e[5] === -r || e[5] + e[8] === 2 * r && e[2] === -r || e[0] + e[4] === 2 * r && e[8] === -r || e[0] + e[8] === 2 * r && e[4] === -r || e[4] + e[8] === 2 * r && e[0] === -r || e[2] + e[4] === 2 * r && e[6] === -r || e[2] + e[6] === 2 * r && e[4] === -r || e[4] + e[6] === 2 * r && e[2] === -r) && (o += 9),
    o -= 12 * checkWinCondition(e)
}
function pickBoard(e, t) {
    var o = -1 / 0;
    t || (o = 1 / 0);
    for (var l = 0, r = 0; r < 9; r++)
        if (0 === checkWinCondition(e[r]))
            for (var i, a = 0; a < 9; a++)
                0 === e[r][a] && (e[r][a] = t ? ai : player,
                i = 50 * evaluateGame(e, a),
                e[r][a] = 0,
                (o < (i += 12 * realEvaluateSquare(e[a])) && t || i < o && !t) && (o = i,
                l = r));
    return l
}
function sign(e) {
    return 0 < e ? 1 : e < 0 ? -1 : 0
}
var timer, keys, bestMove = -1, bestScore = [-1 / 0, -1 / 0, -1 / 0, -1 / 0, -1 / 0, -1 / 0, -1 / 0, -1 / 0, -1 / 0];
function game() {
    ctx.fillStyle = COLORS.grey,
    ctx.fillRect(0, 0, WIDTH, HEIGHT),
    ctx.lineWidth = 3;
    var t = WIDTH / 4 + mobileOffset;
    if (AIACTIVE && (playerNames[1] = lang_AI),
    -1 === currentTurn && gameRunning && AIACTIVE) {
        bestScore = [(bestMove = -1) / 0, -1 / 0, -1 / 0, -1 / 0, -1 / 0, -1 / 0, -1 / 0, -1 / 0, -1 / 0];
        for (var o = RUNS = 0, e = 0; e < boards.length; e++)
            0 === checkWinCondition(boards[e]) && boards[e].forEach(e => 0 === e && o++);
        -1 !== currentBoard && 0 === checkWinCondition(boards[currentBoard]) || (timer = Date.now(),
        timer1 = Number(timer) + Number(limitTimer1),
        a = 0 == MOVES ? miniMax(boards, -1, Math.min(limitMoves1, o), -1 / 0, 1 / 0, !0, Number(timer) + Number(easyMilSeconds)) : miniMax(boards, -1, MOVES < 10 ? Math.min(limitMoves1, o) : MOVES < 18 ? Math.min(limitMoves2, o) : Math.min(limitMoves3, o), -1 / 0, 1 / 0, !0, timer1),
        currentBoard = a.tP);
        for (var l = 0; l < 9; l++)
            if (-1 != currentBoard && 0 === boards[currentBoard][l]) {
                bestMove = l;
                break
            }
        if (-1 !== bestMove) {
            timer = Date.now(),
            timer1 = Number(timer) + Number(limitTimer1);
            for (var r, i = 0; i < 9; i++)
                0 === boards[currentBoard][i] && (r = 45 * evaluatePos(boards[currentBoard], i, currentTurn),
                bestScore[i] = r);
            for (var a, n, c = 0; c < 9; c++)
                0 === checkWinCondition(boards[currentBoard]) && 0 === boards[currentBoard][c] && (boards[currentBoard][c] = ai,
                n = (a = 0 == MOVES ? miniMax(boards, c, Math.min(limitMoves1, o), -1 / 0, 1 / 0, !1, Number(timer) + Number(easyMilSeconds)) : miniMax(boards, c, MOVES < 20 ? Math.min(limitMoves1, o) : MOVES < 32 ? Math.min(limitMoves2, o) : Math.min(limitMoves3, o), -1 / 0, 1 / 0, !1, timer1)).mE,
                boards[currentBoard][c] = 0,
                bestScore[c] += n);
            for (l in bestScore)
                bestScore[l] > bestScore[bestMove] && (bestMove = l);
            0 === boards[currentBoard][bestMove] && (0 == MOVES || limitTimer1 != mediumMilSeconds && limitTimer1 != easyMilSeconds || sleep(pauseForAnimate),
            boards[currentBoard][bestMove] = ai,
            lastAIMove = [currentBoard, bestMove],
            document.getElementById("music-o").play(),
            currentBoard = bestMove)
        }
        currentTurn = -currentTurn,
        $("#helper").html(playerNames[0] + lang_move)
    }
    for (l in d = t / 6,
    currentBlock = [12, 12],
    boards)
        if (-1 === currentBoard || 0 === mainBoard[l = currentBoard])
            for (var m in boards[l])
                if (0 === boards[l][m] && (WIDTH / 3 - t) / 2 + t / 6 - d + m % 3 * t / 3 + l % 3 * WIDTH / 3 < mousePosX && mousePosX < (WIDTH / 3 - t) / 2 + t / 6 + d + m % 3 * t / 3 + l % 3 * WIDTH / 3 && mousePosY > (WIDTH / 3 - t) / 2 + t / 6 - d + Math.floor(m / 3) * t / 3 + Math.floor(l / 3) * WIDTH / 3 && mousePosY < (WIDTH / 3 - t) / 2 + t / 6 + d + Math.floor(m / 3) * t / 3 + Math.floor(l / 3) * WIDTH / 3) {
                    currentBlock = [l, m];
                    break
                }
    if (!0 === clicked && gameRunning)
        for (var l in boards)
            if (-1 === currentBoard || 0 === mainBoard[l = currentBoard])
                for (var m in boards[l])
                    if (0 === boards[l][m] && (WIDTH / 3 - t) / 2 + t / 6 - d + m % 3 * t / 3 + l % 3 * WIDTH / 3 < mousePosX && mousePosX < (WIDTH / 3 - t) / 2 + t / 6 + d + m % 3 * t / 3 + l % 3 * WIDTH / 3 && mousePosY > (WIDTH / 3 - t) / 2 + t / 6 - d + Math.floor(m / 3) * t / 3 + Math.floor(l / 3) * WIDTH / 3 && mousePosY < (WIDTH / 3 - t) / 2 + t / 6 + d + Math.floor(m / 3) * t / 3 + Math.floor(l / 3) * WIDTH / 3 && 0 == checkWinCondition(boards[l])) {
                        currentTurn = -(boards[l][m] = currentTurn),
                        MOVES++,
                        correctMove = !0,
                        lastAIMove = [l, currentBoard = m],
                        0 != ++CORRECT_MOVES && CORRECT_MOVES % 10 == 0 && gtag("event", "ultimate_10_correct_moves"),
                        17 == MOVES && gtag("event", "ultimate_almost_finish"),
                        (-1 == currentTurn ? document.getElementById("music-x") : document.getElementById("music-o")).play();
                        var s = -1 == currentTurn ? playerNames[1] : playerNames[0];
                        $("#helper").html(s + lang_move),
                        AIACTIVE && $("#helper").html(lang_AI + lang_move + "<div class='loadme'><div class='loader-wrapper'><div class='loader-disc'></div><div class='loader-disc'></div><div class='loader-disc'></div></div></div>");
                        break
                    }
    t = WIDTH / 4 + mobileOffset;
    var d = WIDTH / 36;
    whoTurnString = 1 == currentTurn ? "X" : "O",
    ctx.strokeStyle = COLORS.white,
    ctx.lineWidth = 3,
    ctx.beginPath(),
    ctx.moveTo(WIDTH / 3, 0),
    ctx.lineTo(WIDTH / 3, WIDTH),
    ctx.stroke(),
    ctx.beginPath(),
    ctx.moveTo(WIDTH / 3 * 2, 0),
    ctx.lineTo(WIDTH / 3 * 2, WIDTH),
    ctx.stroke(),
    ctx.beginPath(),
    ctx.moveTo(0, WIDTH / 3),
    ctx.lineTo(WIDTH, WIDTH / 3),
    ctx.stroke(),
    ctx.beginPath(),
    ctx.moveTo(0, WIDTH / 3 * 2),
    ctx.lineTo(WIDTH, WIDTH / 3 * 2),
    ctx.stroke(),
    ctx.lineWidth = 1;
    for (var u = 0, l = 0; l < 3; l++)
        for (m = 0; m < 3; m++) {
            if (12 != lastAIMove[0] && 12 != lastAIMove[0] && lastAIMove[0] == u && (ctx.fillStyle = lastMoveColor,
            0 == lastAIMove[1] && (ctx.fillStyle = lastMoveColor,
            ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 0 * t / 3, l * WIDTH / 3 + (WIDTH / 3 - t) / 2, t / 3, t / 3)),
            1 == lastAIMove[1] && (ctx.fillStyle = lastMoveColor,
            ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3, l * WIDTH / 3 + (WIDTH / 3 - t) / 2, t / 3, t / 3)),
            2 == lastAIMove[1] && (ctx.fillStyle = lastMoveColor,
            ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3, l * WIDTH / 3 + (WIDTH / 3 - t) / 2, t / 3, t / 3)),
            3 == lastAIMove[1] && (ctx.fillStyle = lastMoveColor,
            ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3, t / 3, t / 3)),
            4 == lastAIMove[1] && (ctx.fillStyle = lastMoveColor,
            ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3, t / 3, t / 3)),
            5 == lastAIMove[1] && (ctx.fillStyle = lastMoveColor,
            ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3, t / 3, t / 3)),
            6 == lastAIMove[1] && (ctx.fillStyle = lastMoveColor,
            ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3, t / 3, t / 3)),
            7 == lastAIMove[1] && (ctx.fillStyle = lastMoveColor,
            ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3, t / 3, t / 3)),
            8 == lastAIMove[1] && (ctx.fillStyle = lastMoveColor,
            ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3, t / 3, t / 3))),
            ctx.beginPath(),
            ctx.moveTo(l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3, m * WIDTH / 3 + (WIDTH / 3 - t) / 2),
            ctx.lineTo(l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3, m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t),
            ctx.stroke(),
            ctx.beginPath(),
            ctx.moveTo(l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3, m * WIDTH / 3 + (WIDTH / 3 - t) / 2),
            ctx.lineTo(l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3, m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t),
            ctx.stroke(),
            ctx.beginPath(),
            ctx.moveTo(l * WIDTH / 3 + (WIDTH / 3 - t) / 2, m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3),
            ctx.lineTo(l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t, m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3),
            ctx.stroke(),
            ctx.beginPath(),
            ctx.moveTo(l * WIDTH / 3 + (WIDTH / 3 - t) / 2, m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3),
            ctx.lineTo(l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t, m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3),
            ctx.stroke(),
            currentBlock[0] == u && gameRunning) {
                if (0 == currentBlock[1]) {
                    ctx.fillStyle = hoverColor,
                    ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 0 * t / 3, l * WIDTH / 3 + (WIDTH / 3 - t) / 2, t / 3, t / 3),
                    ctx.font = smallSize + " Indie Flower";
                    let e = 0;
                    "O" == whoTurnString && (e = 5),
                    clicked || ctx.fillText(whoTurnString, (WIDTH / 3 - t) / 2 + m * WIDTH / 3 + 0 * t / 3 + t / 6 - d - e, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 6 + d + Math.floor(m / 3) * t / 3),
                    0 == checkWinCondition(boards[currentBlock[1]]) && (ctx.fillStyle = colorGrey,
                    ctx.globalAlpha = .2,
                    ctx.fillRect(WIDTH / 3 * (currentBlock[1] % 3), WIDTH / 3 * Math.floor(currentBlock[1] / 3), WIDTH / 3, WIDTH / 3))
                }
                if (1 == currentBlock[1]) {
                    ctx.fillStyle = hoverColor,
                    ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3, l * WIDTH / 3 + (WIDTH / 3 - t) / 2, t / 3, t / 3),
                    ctx.font = smallSize + " Indie Flower";
                    let e = 0;
                    "O" == whoTurnString && (e = 5),
                    clicked || ctx.fillText(whoTurnString, (WIDTH / 3 - t) / 2 + m * WIDTH / 3 + t / 3 + t / 6 - d - e, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 6 + d + Math.floor(m / 3) * t / 3),
                    0 == checkWinCondition(boards[currentBlock[1]]) && (ctx.fillStyle = colorGrey,
                    ctx.globalAlpha = .2,
                    ctx.fillRect(WIDTH / 3 * (currentBlock[1] % 3), WIDTH / 3 * Math.floor(currentBlock[1] / 3), WIDTH / 3, WIDTH / 3))
                }
                if (2 == currentBlock[1]) {
                    ctx.fillStyle = hoverColor,
                    ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3, l * WIDTH / 3 + (WIDTH / 3 - t) / 2, t / 3, t / 3),
                    ctx.font = smallSize + " Indie Flower";
                    let e = 0;
                    "O" == whoTurnString && (e = 5),
                    clicked || ctx.fillText(whoTurnString, (WIDTH / 3 - t) / 2 + m * WIDTH / 3 + 2 * t / 3 + t / 6 - d - e, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 6 + d + Math.floor(m / 3) * t / 3),
                    0 == checkWinCondition(boards[currentBlock[1]]) && (ctx.fillStyle = colorGrey,
                    ctx.globalAlpha = .2,
                    ctx.fillRect(WIDTH / 3 * (currentBlock[1] % 3), WIDTH / 3 * Math.floor(currentBlock[1] / 3), WIDTH / 3, WIDTH / 3))
                }
                if (3 == currentBlock[1]) {
                    ctx.fillStyle = hoverColor,
                    ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3, t / 3, t / 3),
                    ctx.font = smallSize + " Indie Flower";
                    let e = 0;
                    "O" == whoTurnString && (e = 5),
                    clicked || ctx.fillText(whoTurnString, (WIDTH / 3 - t) / 2 + m * WIDTH / 3 + 0 * t / 3 + t / 6 - d - e, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 6 + d + Math.floor(m / 3) * t / 3 + t / 3),
                    0 == checkWinCondition(boards[currentBlock[1]]) && (ctx.fillStyle = colorGrey,
                    ctx.globalAlpha = .2,
                    ctx.fillRect(WIDTH / 3 * (currentBlock[1] % 3), WIDTH / 3 * Math.floor(currentBlock[1] / 3), WIDTH / 3, WIDTH / 3))
                }
                if (4 == currentBlock[1]) {
                    ctx.fillStyle = hoverColor,
                    ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3, t / 3, t / 3),
                    ctx.font = smallSize + " Indie Flower";
                    let e = 0;
                    "O" == whoTurnString && (e = 5),
                    clicked || ctx.fillText(whoTurnString, (WIDTH / 3 - t) / 2 + m * WIDTH / 3 + +t / 3 + t / 6 - d - e, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 6 + d + Math.floor(m / 3) * t / 3 + t / 3),
                    0 == checkWinCondition(boards[currentBlock[1]]) && (ctx.fillStyle = colorGrey,
                    ctx.globalAlpha = .2,
                    ctx.fillRect(WIDTH / 3 * (currentBlock[1] % 3), WIDTH / 3 * Math.floor(currentBlock[1] / 3), WIDTH / 3, WIDTH / 3))
                }
                if (5 == currentBlock[1]) {
                    ctx.fillStyle = hoverColor,
                    ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3, t / 3, t / 3),
                    ctx.font = smallSize + " Indie Flower";
                    let e = 0;
                    "O" == whoTurnString && (e = 5),
                    clicked || ctx.fillText(whoTurnString, (WIDTH / 3 - t) / 2 + m * WIDTH / 3 + 2 * t / 3 + t / 6 - d - e, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 6 + d + Math.floor(m / 3) * t / 3 + t / 3),
                    0 == checkWinCondition(boards[currentBlock[1]]) && (ctx.fillStyle = colorGrey,
                    ctx.globalAlpha = .2,
                    ctx.fillRect(WIDTH / 3 * (currentBlock[1] % 3), WIDTH / 3 * Math.floor(currentBlock[1] / 3), WIDTH / 3, WIDTH / 3))
                }
                if (6 == currentBlock[1]) {
                    ctx.fillStyle = hoverColor,
                    ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3, t / 3, t / 3),
                    ctx.font = smallSize + " Indie Flower";
                    let e = 0;
                    "O" == whoTurnString && (e = 5),
                    clicked || ctx.fillText(whoTurnString, (WIDTH / 3 - t) / 2 + m * WIDTH / 3 + 0 * t / 3 + t / 6 - d - e, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 6 + d + Math.floor(m / 3) * t / 3 + 2 * t / 3),
                    0 == checkWinCondition(boards[currentBlock[1]]) && (ctx.fillStyle = colorGrey,
                    ctx.globalAlpha = .2,
                    ctx.fillRect(WIDTH / 3 * (currentBlock[1] % 3), WIDTH / 3 * Math.floor(currentBlock[1] / 3), WIDTH / 3, WIDTH / 3))
                }
                if (7 == currentBlock[1]) {
                    ctx.fillStyle = hoverColor,
                    ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 3, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3, t / 3, t / 3),
                    ctx.font = smallSize + " Indie Flower";
                    let e = 0;
                    "O" == whoTurnString && (e = 5),
                    clicked || ctx.fillText(whoTurnString, (WIDTH / 3 - t) / 2 + m * WIDTH / 3 + +t / 3 + t / 6 - d - e, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 6 + d + Math.floor(m / 3) * t / 3 + 2 * t / 3),
                    0 == checkWinCondition(boards[currentBlock[1]]) && (ctx.fillStyle = colorGrey,
                    ctx.globalAlpha = .2,
                    ctx.fillRect(WIDTH / 3 * (currentBlock[1] % 3), WIDTH / 3 * Math.floor(currentBlock[1] / 3), WIDTH / 3, WIDTH / 3))
                }
                if (8 == currentBlock[1]) {
                    ctx.fillStyle = hoverColor,
                    ctx.fillRect(m * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + 2 * t / 3, t / 3, t / 3),
                    ctx.font = smallSize + " Indie Flower";
                    let e = 0;
                    "O" == whoTurnString && (e = 5),
                    clicked || ctx.fillText(whoTurnString, (WIDTH / 3 - t) / 2 + m * WIDTH / 3 + 2 * t / 3 + t / 6 - d - e, l * WIDTH / 3 + (WIDTH / 3 - t) / 2 + t / 6 + d + Math.floor(m / 3) * t / 3 + 2 * t / 3),
                    0 == checkWinCondition(boards[currentBlock[1]]) && (ctx.fillStyle = colorGrey,
                    ctx.globalAlpha = .2,
                    ctx.fillRect(WIDTH / 3 * (currentBlock[1] % 3), WIDTH / 3 * Math.floor(currentBlock[1] / 3), WIDTH / 3, WIDTH / 3))
                }
                ctx.globalAlpha = 1
            }
            u++
        }
    for (l in ctx.lineWidth = 5,
    boards)
        for (var m in 0 === mainBoard[l] && 0 !== checkWinCondition(boards[l]) && (mainBoard[l] = checkWinCondition(boards[l])),
        boards[l])
            boards[l][m] === +switchAroo ? (ctx.strokeStyle = COLORS.red,
            ctx.beginPath(),
            ctx.moveTo((WIDTH / 3 - t) / 2 + t / 6 - d + m % 3 * t / 3 + l % 3 * WIDTH / 3, (WIDTH / 3 - t) / 2 + t / 6 - d + Math.floor(m / 3) * t / 3 + Math.floor(l / 3) * WIDTH / 3),
            ctx.lineTo((WIDTH / 3 - t) / 2 + t / 6 + d + m % 3 * t / 3 + l % 3 * WIDTH / 3, (WIDTH / 3 - t) / 2 + t / 6 + d + Math.floor(m / 3) * t / 3 + Math.floor(l / 3) * WIDTH / 3),
            ctx.beginPath(),
            ctx.moveTo((WIDTH / 3 - t) / 2 + t / 6 - d + m % 3 * t / 3 + l % 3 * WIDTH / 3, (WIDTH / 3 - t) / 2 + t / 6 + d + Math.floor(m / 3) * t / 3 + Math.floor(l / 3) * WIDTH / 3),
            ctx.lineTo((WIDTH / 3 - t) / 2 + t / 6 + d + m % 3 * t / 3 + l % 3 * WIDTH / 3, (WIDTH / 3 - t) / 2 + t / 6 - d + Math.floor(m / 3) * t / 3 + Math.floor(l / 3) * WIDTH / 3),
            ctx.fillStyle = "#FFF",
            ctx.font = smallSize + " Indie Flower",
            ctx.fillText("X", (WIDTH / 3 - t) / 2 + t / 6 - d + m % 3 * t / 3 + l % 3 * WIDTH / 3, (WIDTH / 3 - t) / 2 + t / 6 + d + Math.floor(m / 3) * t / 3 + Math.floor(l / 3) * WIDTH / 3)) : boards[l][m] === -1 * switchAroo && (ctx.strokeStyle = COLORS.blue,
            ctx.beginPath(),
            ctx.ellipse((WIDTH / 3 - t) / 2 + t / 6 + m % 3 * t / 3 + l % 3 * WIDTH / 3, (WIDTH / 3 - t) / 2 + t / 6 + Math.floor(m / 3) * t / 3 + Math.floor(l / 3) * WIDTH / 3, 1.1 * d, 1.1 * d, 0, 0, 2 * Math.PI),
            ctx.fillStyle = "#FFF",
            ctx.font = smallSize + " Indie Flower",
            ctx.fillText("O", (WIDTH / 3 - t) / 2 + t / 6 - d + m % 3 * t / 3 + l % 3 * WIDTH / 3 - 5, (WIDTH / 3 - t) / 2 + t / 6 + d + Math.floor(m / 3) * t / 3 + Math.floor(l / 3) * WIDTH / 3));
    if (gameRunning)
        if (0 !== checkWinCondition(mainBoard)) {
            gtag("event", "ultimate_finish_game");
            let e = gameRunning = !1;
            if (1 === checkWinCondition(mainBoard) ? (document.getElementById("result").innerHTML = playerNames[0] + lang_wins,
            AIACTIVE ? player1WinsVSComp++ : player1Wins++,
            e = !0) : (document.getElementById("result").innerHTML = playerNames[1] + lang_wins,
            AIACTIVE ? computerWins++ : (player2Wins++,
            e = !0)),
            $("#reset-button").addClass("pushme"),
            $("#helper").html(""),
            e) {
                const S = {
                    spread: 100,
                    ticks: 50,
                    gravity: 7.7,
                    decay: .94,
                    startVelocity: 130,
                    shapes: ["star"],
                    origin: {
                        y: .6
                    },
                    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"]
                };
                function I() {
                    confetti({
                        ...S,
                        angle: randomInRangeFull(40, 140),
                        particleCount: 30,
                        scalar: 1.2,
                        shapes: ["star"]
                    }),
                    confetti({
                        ...S,
                        angle: randomInRangeFull(40, 140),
                        particleCount: 30,
                        scalar: .75,
                        shapes: ["circle"]
                    })
                }
                function g() {
                    confetti({
                        gravity: 5.7,
                        angle: randomInRangeFull(40, 140),
                        spread: randomInRangeFull(50, 70),
                        scalar: 1.2,
                        particleCount: 30,
                        particleCount: randomInRangeFull(50, 100),
                        origin: {
                            y: .6
                        }
                    })
                }
                function T() {
                    var t = Date.now() + 250
                      , o = {
                        startVelocity: 30,
                        spread: 360,
                        ticks: 60,
                        zIndex: 0,
                        shapes: ["star"],
                        gravity: 9.7,
                        particleCount: 30
                    };
                    const l = setInterval(function() {
                        var e = t - Date.now();
                        if (e <= 0)
                            return clearInterval(l);
                        e = e / 250 * 40;
                        confetti(Object.assign({}, o, {
                            particleCount: e,
                            origin: {
                                x: randomInRangeFull(.1, .3),
                                y: Math.random() - .2
                            }
                        })),
                        confetti(Object.assign({}, o, {
                            particleCount: e,
                            origin: {
                                x: randomInRangeFull(.7, .9),
                                y: Math.random() - .2
                            }
                        }))
                    }, 100)
                }
                if (confettiShow = (Number(player1Wins) + Number(player2Wins) + Number(player1WinsVSComp)) % stagingConfetti,
                confettiMode = Math.floor((Number(player1Wins) + Number(player2Wins) + Number(player1WinsVSComp)) / stagingConfetti),
                0 == confettiShow || Number(player1Wins) + Number(player2Wins) + Number(player1WinsVSComp) == 1)
                    for (let e = 0; e < 4; e++)
                        switch (confettiMode % 3) {
                        case 0:
                            setTimeout(T, 150 * e);
                            break;
                        case 1:
                            setTimeout(I, 150 * e);
                            break;
                        case 2:
                            e % 2 == 0 && setTimeout(g, 150 * e);
                            break;
                        default:
                            setTimeout(I, 150 * e)
                        }
            }
            localStorage.setItem("up1w", player1Wins),
            localStorage.setItem("up1wc", player1WinsVSComp),
            localStorage.setItem("up2w", player2Wins),
            localStorage.setItem("ucw", computerWins),
            reloadCounters(),
            (e ? document.getElementById("music-win") : document.getElementById("music-lose")).play(),
            limitTimer1 != easyMilSeconds && limitTimer1 != mediumMilSeconds || 0 != initialMode || !e ? $("#winMenu p.harder").hide() : $("#winMenu p.harder").show(),
            setTimeout(showWinMenu, pauseForFinishWin)
        } else {
            for (var f = 0, e = 0; e < boards.length; e++)
                0 === checkWinCondition(boards[e]) && boards[e].forEach(e => 0 === e && f++);
            0 === f && (gameRunning = !1,
            limitTimer1 != easyMilSeconds && limitTimer1 != mediumMilSeconds || 0 != initialMode ? $("#winMenu p.harder").hide() : $("#winMenu p.harder").show(),
            document.getElementById("music-tie").play(),
            setTimeout(showWinMenu, pauseForFinishTie),
            $("#helper").html(""),
            document.getElementById("result").innerHTML = lang_tie,
            $("#reset-button").addClass("pushme"),
            gtag("event", "ultimate_finish_game"))
        }
    if (d = t / 3,
    ctx.lineWidth = 20,
    gameRunning)
        blinking = 0;
    else if (-1 == checkWinCondition(mainBoard) && (blinking = -1),
    1 == checkWinCondition(mainBoard) && (blinking = 1),
    -1 == blinking || 1 == blinking)
        for (var h = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]], l = 0; l < h.length; l++)
            mainBoard[h[l][0]] == blinking && mainBoard[h[l][1]] == blinking && mainBoard[h[l][2]] == blinking && (combo = [h[l][0], h[l][1], h[l][2]]);
    else
        blinking = 0;
    var W = 0;
    for (m in mainBoard)
        mainBoard[m] === +switchAroo ? (ctx.strokeStyle = COLORS.red,
        ctx.beginPath(),
        ctx.moveTo(WIDTH / 6 - d + m % 3 * WIDTH / 3, WIDTH / 6 - d + Math.floor(m / 3) * WIDTH / 3),
        ctx.lineTo(WIDTH / 6 + d + m % 3 * WIDTH / 3, WIDTH / 6 + d + Math.floor(m / 3) * WIDTH / 3),
        ctx.beginPath(),
        ctx.moveTo(WIDTH / 6 - d + m % 3 * WIDTH / 3, WIDTH / 6 + d + Math.floor(m / 3) * WIDTH / 3),
        ctx.lineTo(WIDTH / 6 + d + m % 3 * WIDTH / 3, WIDTH / 6 - d + Math.floor(m / 3) * WIDTH / 3),
        ctx.fillStyle = "#FFF",
        ctx.shadowBlur = 0,
        1 == blinking && combo.includes(W) && (ctx.fillStyle = "#9f1010",
        ctx.shadowOffsetX = 0,
        ctx.shadowOffsetY = 0,
        ctx.shadowBlur = 10,
        ctx.shadowColor = "white"),
        ctx.font = bigSize + " Indie Flower",
        ctx.fillText("X", WIDTH / 6 - d + m % 3 * WIDTH / 3 - 25 + mobileOffsetString, WIDTH / 6 + d + Math.floor(m / 3) * WIDTH / 3 + 10)) : mainBoard[m] === -1 * switchAroo && (ctx.strokeStyle = COLORS.blue,
        ctx.beginPath(),
        ctx.ellipse(WIDTH / 6 + m % 3 * WIDTH / 3, WIDTH / 6 + Math.floor(m / 3) * WIDTH / 3, 1.1 * d, 1.1 * d, 0, 0, 2 * Math.PI),
        ctx.fillStyle = "#FFF",
        ctx.shadowBlur = 0,
        -1 == blinking && combo.includes(W) && (ctx.fillStyle = "#9f1010",
        ctx.shadowOffsetX = 0,
        ctx.shadowOffsetY = 0,
        ctx.shadowBlur = 10,
        ctx.shadowColor = "white"),
        ctx.font = bigSize + " Indie Flower",
        ctx.fillText("O", WIDTH / 6 - d + m % 3 * WIDTH / 3 - 30 + mobileOffsetString, WIDTH / 6 + d + Math.floor(m / 3) * WIDTH / 3 + 15 - .55 * mobileOffsetString)),
        W++;
    0 === mainBoard[currentBoard] && boards[currentBoard].includes(0) || (currentBoard = -1),
    gameRunning && (ctx.fillStyle = colorRed,
    ctx.globalAlpha = .3,
    ctx.fillRect(WIDTH / 3 * (currentBoard % 3), WIDTH / 3 * Math.floor(currentBoard / 3), WIDTH / 3, WIDTH / 3),
    ctx.globalAlpha = 1),
    correctMove || (unCorrectMoveCounter = Date.now() + 1500),
    (unCorrectMoveCounter - Date.now() <= 300 || 600 <= unCorrectMoveCounter - Date.now() && unCorrectMoveCounter - Date.now() <= 900 || 1200 <= unCorrectMoveCounter - Date.now()) && 0 < unCorrectMoveCounter - Date.now() && (ctx.fillStyle = colorGrey,
    ctx.globalAlpha = .3,
    ctx.fillRect(WIDTH / 3 * (currentBoard % 3), WIDTH / 3 * Math.floor(currentBoard / 3), WIDTH / 3, WIDTH / 3),
    ctx.globalAlpha = 1,
    correctMove = !0),
    0 < unCorrectMoveCounter && (unCorrectMoveCounter -= 10),
    clicked = !1
}
function findScreenCoords(e) {
    var t = canvas.getBoundingClientRect();
    mousePosX = e.clientX - t.left,
    mousePosY = e.clientY - t.top
}
function click() {
    correctMove = !(clicked = !0),
    ++ALL_MOVES != CORRECT_MOVES && (ALL_MOVES - CORRECT_MOVES) % 10 == 0 && gtag("event", "ultimate_10_uncorrect_moves")
}
function Reload() {}
function startGame(e) {
    lastAIMove = [12, 12],
    gtag("event", "ultimate_start_game"),
    ctx.shadowBlur = 0,
    null != localStorage.getItem("lt1") && null != localStorage.getItem("lt1") && "" != localStorage.getItem("lt1") || localStorage.setItem("lt1", easyMilSeconds),
    limitTimer1 = localStorage.getItem("lt1"),
    mousePosY = -220,
    mousePosY = -100,
    initialMode = e,
    $(".game-mode").addClass("not_blur"),
    $("#reset-names").addClass("not_blur"),
    1 == initialMode && (t = '<img  height="35" width="35" src="/img/player.svg" title = "' + PVP + '"  alt="' + PVP + '">'),
    0 == initialMode && (t = '<img  height="35" width="35" src="/img/comp.svg" title = "' + PVC + '" alt="' + PVC + '">'),
    $("#handlerMode").html(t),
    $("#diff-mode option").attr("selected", !1),
    limitTimer1 == easyMilSeconds && $("#diff-mode").val(1).change(),
    limitTimer1 == mediumMilSeconds && $("#diff-mode").val(2).change(),
    limitTimer1 == hardMilSeconds && $("#diff-mode").val(3).change();
    var o = $("#diff-mode").val();
    switch ($("#handlerDiff").text($("#diff-mode option[value=" + o + "]").text()),
    o) {
    case "1":
        localStorage.setItem("lt1", easyMilSeconds),
        limitTimer1 = easyMilSeconds;
        break;
    case "2":
        localStorage.setItem("lt1", mediumMilSeconds),
        limitTimer1 = mediumMilSeconds;
        break;
    case "3":
        localStorage.setItem("lt1", hardMilSeconds),
        limitTimer1 = hardMilSeconds;
        break;
    default:
        localStorage.setItem("lt1", easyMilSeconds),
        limitTimer1 = easyMilSeconds
    }
    1 == initialMode ? $("#handlerDiff").hide() : $("#handlerDiff").show(),
    $("#mode").val(initialMode).trigger("change");
    o = new FontFace("Indie Flower","url(https://fonts.gstatic.com/s/indieflower/v21/m8JVjfNVeKWVnh3QMuKkFcZVaUuH.woff2)");
    document.fonts.add(o),
    boards = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]],
    mainBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0],
    revertPlayers = localStorage.getItem("whostart") ? (currentTurn = -1 == localStorage.getItem("whostart") ? 1 : -1,
    localStorage.setItem("whostart", currentTurn),
    -1 == localStorage.getItem("whostart")) : (localStorage.setItem("whostart", 1),
    !(currentTurn = 1)),
    (MOVES = 0) == initialMode ? $("#namePlayer2").hide() : $("#namePlayer2").show(),
    currentBoard = -1,
    document.getElementById("tictac").classList.remove("inactive"),
    0 === e ? (gameRunning = AIACTIVE = !0,
    playerNames[0] = lang_player1,
    playerNames[1] = lang_AI) : (gameRunning = !(AIACTIVE = !1),
    switchAroo = 1,
    playerNames[0] = lang_player1,
    playerNames[1] = lang_player2),
    null !== localStorage.getItem("p1n") && void 0 !== localStorage.getItem("p1n") && "" !== localStorage.getItem("p1n") && (playerNames[0] = localStorage.getItem("p1n")),
    null !== localStorage.getItem("p2n") && void 0 !== localStorage.getItem("p2n") && "" !== localStorage.getItem("p2n") && (playerNames[1] = localStorage.getItem("p2n")),
    document.getElementById("startMenu").setAttribute("hidden", "hidden"),
    document.getElementById("turnMenu").setAttribute("hidden", "hidden"),
    $("#helper").html(playerNames[0] + lang_move),
    revertPlayers && !AIACTIVE && $("#helper").html(playerNames[1] + lang_move),
    AIACTIVE && revertPlayers && (currentTurn = -1),
    $(".p1name").html(playerNames[0] + "<br/> (X)"),
    $(".p2name").html(playerNames[1] + "<br/> (O)"),
    $(".counters").show(),
    0 == e ? ($(".counters>div:nth-child(2)").hide(),
    $(".counters>div:nth-child(3)").show()) : ($(".counters>div:nth-child(2)").show(),
    $(".counters>div:nth-child(3)").hide()),
    reloadCounters()
}
function setGame(e) {
    switchAroo = currentTurn = 0 === e ? 1 : -1,
    startGame(0)
}
function menu() {
    document.getElementById("turnMenu").setAttribute("hidden", "hidden"),
    document.getElementById("winMenu").setAttribute("hidden", "hidden"),
    3 == initialMode ? document.getElementById("startMenu").removeAttribute("hidden") : startGame(initialMode),
    $("#reset-button").removeClass("pushme")
}
function pickTurns() {
    document.getElementById("startMenu").setAttribute("hidden", "hidden"),
    document.getElementById("turnMenu").removeAttribute("hidden")
}
function repeatOften() {
    game(),
    requestAnimationFrame(repeatOften)
}
function showModalStart() {
    document.getElementById("modal-start").style.display = "flex",
    $("input[name=namePlayer1]").val(null !== localStorage.getItem("p1n") && void 0 !== localStorage.getItem("p1n") && "" !== localStorage.getItem("pn") ? localStorage.getItem("p1n") : ""),
    $("input[name=namePlayer2]").val(null !== localStorage.getItem("p2n") && void 0 !== localStorage.getItem("p2n") && "" !== localStorage.getItem("p2n") ? localStorage.getItem("p2n") : "")
}
document.getElementById("tictac").onmousemove = findScreenCoords,
document.getElementById("tictac").onclick = click,
window.addEventListener("keydown", function(e) {
    (keys = keys || [])[e.keyCode] = "keydown" == e.type,
    -1 < [32, 37, 38, 39, 40].indexOf(e.keyCode) && e.preventDefault()
}, !1),
window.addEventListener("keyup", function(e) {
    keys[e.keyCode] = "keydown" == e.type
}, !1),
requestAnimationFrame(repeatOften);
var sendNames = document.getElementById("send-names");
sendNames.addEventListener("click", function() {
    "" === $("input[name=namePlayer1]").val() && "" === localStorage.getItem("p1n") || localStorage.setItem("p1n", $("input[name=namePlayer1]").val()),
    "" === $("input[name=namePlayer2]").val() && "" === localStorage.getItem("p2n") || localStorage.setItem("p2n", $("input[name=namePlayer2]").val()),
    document.getElementById("modal-start").style.display = "none",
    null !== localStorage.getItem("p1n") && void 0 !== localStorage.getItem("p1n") && "" !== localStorage.getItem("p1n") ? playerNames[0] = localStorage.getItem("p1n") : playerNames[0] = lang_player1,
    null !== localStorage.getItem("p2n") && void 0 !== localStorage.getItem("p2n") && "" !== localStorage.getItem("p2n") ? playerNames[1] = localStorage.getItem("p2n") : playerNames[1] = 0 === initialMode ? lang_AI : lang_player2,
    $(".p1name").html(playerNames[0] + "<br/> (X)"),
    $(".p2name").html(playerNames[1] + "<br/> (O)")
}),
$("#reset-names").click(function() {
    showModalStart()
});
var mute = document.getElementById("mute");
function resetCounters() {
    localStorage.setItem("up1w", 0),
    localStorage.setItem("up1wc", 0),
    localStorage.setItem("up2w", 0),
    localStorage.setItem("ucw", 0),
    player1Wins = 0,
    player1WinsVSComp = 0,
    computerWins = player2Wins = 0
}
function reloadCounters() {
    AIACTIVE ? $(".counters .p1w").html((null !== localStorage.getItem("up1wc") && void 0 !== localStorage.getItem("up1wc") ? localStorage.getItem("up1wc") : 0).toString()) : $(".counters .p1w").html((null !== localStorage.getItem("up1w") && void 0 !== localStorage.getItem("up1w") ? localStorage.getItem("up1w") : 0).toString()),
    $(".counters .p2w").html((null !== localStorage.getItem("up2w") && void 0 !== localStorage.getItem("up2w") ? localStorage.getItem("up2w") : 0).toString()),
    $(".counters .cw").html((null !== localStorage.getItem("ucw") && void 0 !== localStorage.getItem("ucw") ? localStorage.getItem("ucw") : 0).toString())
}
function sleep(e) {
    for (var t, o = Date.now(); t = Date.now(),
    t - o < e; )
        ;
}
function goHarder() {
    limitTimer1 != easyMilSeconds && limitTimer1 != mediumMilSeconds || ($("#handlerDiff").click(),
    gtag("event", "ultimate_new_diff_change"),
    menu())
}
function showWinMenu() {
    document.getElementById("winMenu").removeAttribute("hidden")
}
1 == localStorage.getItem("mute") && (document.getElementById("music-tie").volume = 0,
document.getElementById("music-win").volume = 0,
document.getElementById("music-lose").volume = 0,
document.getElementById("music-x").volume = 0,
document.getElementById("music-o").volume = 0,
$("#mute img").attr("src", "/img/muteoff.svg")),
mute.addEventListener("click", function() {
    1 == localStorage.getItem("mute") ? (localStorage.setItem("mute", 0),
    document.getElementById("music-tie").volume = 1,
    document.getElementById("music-win").volume = 1,
    document.getElementById("music-lose").volume = 1,
    document.getElementById("music-x").volume = 1,
    document.getElementById("music-o").volume = 1,
    $("#mute img").attr("src", "/img/mute.svg")) : (localStorage.setItem("mute", 1),
    document.getElementById("music-tie").volume = 0,
    document.getElementById("music-win").volume = 0,
    document.getElementById("music-lose").volume = 0,
    document.getElementById("music-x").volume = 0,
    document.getElementById("music-o").volume = 0,
    $("#mute img").attr("src", "/img/muteoff.svg"))
}),
$("#reset-counter").click(function() {
    resetCounters(),
    reloadCounters()
}),
$("#handlerDiff").click(function() {
    var e = $("#diff-mode option:selected").val();
    switch (3 == e ? e = 1 : e++,
    $("#handlerDiff").text($("#diff-mode option[value=" + e + "]").text()),
    gtag("event", "ultimate_diff_change"),
    e) {
    case 1:
        localStorage.setItem("lt1", easyMilSeconds),
        limitTimer1 = null !== localStorage.getItem("lt1") && void 0 !== localStorage.getItem("lt1") ? localStorage.getItem("lt1") : easyMilSeconds;
        break;
    case 2:
        localStorage.setItem("lt1", mediumMilSeconds),
        limitTimer1 = null !== localStorage.getItem("lt1") && void 0 !== localStorage.getItem("lt1") ? localStorage.getItem("lt1") : mediumMilSeconds;
        break;
    case 3:
        localStorage.setItem("lt1", hardMilSeconds),
        limitTimer1 = null !== localStorage.getItem("lt1") && void 0 !== localStorage.getItem("lt1") ? localStorage.getItem("lt1") : hardMilSeconds;
        break;
    default:
        localStorage.setItem("lt1", easyMilSeconds),
        limitTimer1 = null !== localStorage.getItem("lt1") && void 0 !== localStorage.getItem("lt1") ? localStorage.getItem("lt1") : easyMilSeconds
    }
    $("#diff-mode option").attr("selected", !1),
    limitTimer1 == easyMilSeconds && $("#diff-mode").val(1).change(),
    limitTimer1 == mediumMilSeconds && $("#diff-mode").val(2).change(),
    limitTimer1 == hardMilSeconds && $("#diff-mode").val(3).change()
}),
$("#reset-button").click(function() {
    menu()
}),
$("#handlerMode").click(function() {
    var e = $("#mode").val();
    1 == e ? e = 0 : e++,
    initialMode = e;
    var t = "";
    localStorage.setItem("whostart", -1),
    1 == e && (t = '<img  height="35" width="35" src="/img/player.svg" title = "' + PVP + '"  alt="' + PVP + '">'),
    0 == e && (t = '<img  height="35" width="35" src="/img/comp.svg" title = "' + PVC + '" alt="' + PVC + '">'),
    $("#handlerMode").html(t),
    0 == initialMode ? $("#handlerDiff").show() : $("#handlerDiff").hide(),
    menu(),
    $("#mode").val(e).trigger("change")
});
