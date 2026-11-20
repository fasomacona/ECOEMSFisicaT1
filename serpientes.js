/* ============================================
   SERPIENTES Y ESCALERAS 2.0 · Física Edition
   Prof. Fabián Soberanes Martín
   Con retos + cronómetro de 30s
   ============================================ */

/* ==================== BANCO DE PREGUNTAS ==================== */
const QUESTION_BANK = [
  { cat: "Distancia", q: "Un atleta da una vuelta completa a una pista de 400 m. ¿Cuánto vale su desplazamiento?", answers: ["400 m", "0 m", "200 m", "800 m"], correct: 1 },
  { cat: "Distancia", q: "Caminas 30 m al este y luego 40 m al norte. ¿Magnitud del desplazamiento?", answers: ["70 m", "50 m", "10 m", "35 m"], correct: 1 },
  { cat: "Distancia", q: "¿Cuál de estas magnitudes es ESCALAR?", answers: ["Desplazamiento", "Velocidad", "Distancia", "Aceleración"], correct: 2 },
  { cat: "Distancia", q: "40 m norte, 30 m este, 40 m sur, 10 m oeste. ¿Distancia total?", answers: ["120 m", "20 m", "100 m", "40 m"], correct: 0 },
  { cat: "Distancia", q: "En el mismo recorrido, ¿magnitud del desplazamiento?", answers: ["20 m", "120 m", "40 m", "10 m"], correct: 0 },
  { cat: "Distancia", q: "Auto viaja 5 km al este y 12 km al norte. ¿Magnitud del desplazamiento?", answers: ["13 km", "17 km", "7 km", "60 km"], correct: 0 },
  { cat: "Distancia", q: "¿Cuál NO es una magnitud vectorial?", answers: ["Velocidad", "Desplazamiento", "Fuerza", "Tiempo"], correct: 3 },
  { cat: "Rapidez", q: "Un auto recorre 150 km en 2.5 h. ¿Rapidez media?", answers: ["60 km/h", "75 km/h", "50 km/h", "100 km/h"], correct: 0 },
  { cat: "Rapidez", q: "Un ciclista recorre 2.4 km en 8 min. ¿Rapidez en m/s?", answers: ["5 m/s", "0.3 m/s", "18 m/s", "12 m/s"], correct: 0 },
  { cat: "Rapidez", q: "Un auto va a 90 km/h. ¿Rapidez en m/s?", answers: ["25 m/s", "90 m/s", "324 m/s", "9 m/s"], correct: 0 },
  { cat: "Rapidez", q: "¿Diferencia entre rapidez y velocidad?", answers: ["Son iguales", "Velocidad es vectorial, rapidez escalar", "Rapidez tiene dirección", "Velocidad siempre mayor"], correct: 1 },
  { cat: "Rapidez", q: "María recorre 4.2 km en 25 min. ¿Rapidez media?", answers: ["10.08 km/h", "6.72 km/h", "4.2 km/h", "25 km/h"], correct: 0 },
  { cat: "Rapidez", q: "72 km/h equivale a...", answers: ["20 m/s", "72 m/s", "200 m/s", "7.2 m/s"], correct: 0 },
  { cat: "Gráficas", q: "En una gráfica x-t, ¿qué representa la PENDIENTE?", answers: ["Aceleración", "Velocidad", "Distancia", "Tiempo"], correct: 1 },
  { cat: "Gráficas", q: "En una gráfica x-t, un tramo horizontal significa...", answers: ["Acelera", "Va rápido", "Reposo", "Regresa"], correct: 2 },
  { cat: "Gráficas", q: "Tramo recto por (2 s, 6 m) y (5 s, 18 m). ¿Velocidad?", answers: ["4 m/s", "12 m/s", "3 m/s", "6 m/s"], correct: 0 },
  { cat: "Gráficas", q: "Gráfica x-t baja de (0 s, 20 m) a (4 s, 0 m). ¿Qué describe?", answers: ["Reposo", "Se aleja a 5 m/s", "Se acerca al origen a 5 m/s", "Acelera"], correct: 2 },
  { cat: "Aceleración", q: "Motociclista parte del reposo y alcanza 20 m/s en 4 s. ¿Aceleración?", answers: ["5 m/s²", "80 m/s²", "0.2 m/s²", "16 m/s²"], correct: 0 },
  { cat: "Aceleración", q: "Autobús parte del reposo, a=1.5 m/s², t=12 s. ¿Velocidad final?", answers: ["18 m/s", "12 m/s", "1.5 m/s", "108 m/s"], correct: 0 },
  { cat: "Aceleración", q: "Auto va a 20 m/s, frena a −4 m/s². ¿Tiempo en detenerse?", answers: ["5 s", "4 s", "80 s", "0.2 s"], correct: 0 },
  { cat: "Aceleración", q: "¿Qué significa aceleración negativa?", answers: ["Siempre se detiene", "Velocidad disminuye en sentido positivo", "Va al revés", "No se mueve"], correct: 1 },
  { cat: "Caída libre", q: "Piedra cae desde 78.4 m. ¿Tiempo? (g=9.8)", answers: ["4 s", "2 s", "8 s", "16 s"], correct: 0 },
  { cat: "Caída libre", q: "En la caída anterior, ¿velocidad de impacto?", answers: ["39.2 m/s", "9.8 m/s", "78.4 m/s", "19.6 m/s"], correct: 0 },
  { cat: "Caída libre", q: "¿Valor de gravedad en la Tierra?", answers: ["9.8 m/s²", "5 m/s²", "20 m/s²", "1 m/s²"], correct: 0 },
  { cat: "Caída libre", q: "Dos objetos desde la misma altura: uno se suelta, otro se lanza hacia abajo. ¿Cuál llega primero?", answers: ["El soltado", "El lanzado hacia abajo", "Igual", "Depende del peso"], correct: 1 }
];

/* ==================== CONFIGURACIÓN DEL TABLERO ==================== */
const BOARD_SIZE = 30;
const BOARD_COLS = 6;
const BOARD_ROWS = 5;
const QUESTION_TIME = 30; // segundos

const SNAKES = { 17: 7, 24: 4, 27: 12, 29: 22 };
const LADDERS = { 3: 11, 8: 15, 14: 20, 19: 26 };

/* ==================== CASILLAS ESPECIALES CON RETOS ==================== */
const CHALLENGE_CELLS = {
  5: {
    type: 'roll_again',
    icon: '🔄',
    title: '¡Tira otra vez!',
    description: 'Vuelve a tirar el dado',
    effect: 'roll_again'
  },
  9: {
    type: 'skip_turn',
    icon: '💀',
    title: '¡Pierdes turno!',
    description: 'El rival juega de nuevo',
    effect: 'skip_turn'
  },
  11: {
    type: 'advance_3',
    icon: '⏭',
    title: '¡Avanza 3!',
    description: 'Te mueves 3 casillas extra',
    effect: 'advance',
    amount: 3
  },
  16: {
    type: 'back_2',
    icon: '⏪',
    title: '¡Retrocede 2!',
    description: 'Vuelves 2 casillas atrás',
    effect: 'back',
    amount: 2
  },
  21: {
    type: 'bonus_5',
    icon: '🎁',
    title: '¡Bonus +5!',
    description: 'Avanzas 5 casillas de regalo',
    effect: 'advance',
    amount: 5
  },
  25: {
    type: 'double_roll',
    icon: '⭐',
    title: '¡Doble tiro!',
    description: 'Tiras 2 dados y sumas los resultados',
    effect: 'double_roll'
  },
  28: {
    type: 'teleport',
    icon: '🌀',
    title: '¡Teletransporte!',
    description: 'Te mueves a una casilla aleatoria',
    effect: 'teleport'
  },
  13: {
    type: 'choice',
    icon: '🎯',
    title: '¡Tú eliges!',
    description: '¿Avanzas 2 o retrocedes 1?',
    effect: 'choice',
    choices: [
      { label: '➕ Avanzar 2 casillas', value: 2 },
      { label: '➖ Retroceder 1 casilla', value: -1 }
    ]
  }
};

/* ==================== ESTADO ==================== */
let game = {
  p1: { name: 'Jugador 1', position: 0, correct: 0 },
  p2: { name: 'Jugador 2', position: 0, correct: 0 },
  currentPlayer: 'p1',
  currentQuestion: null,
  answered: false,
  waitingDice: false,
  paused: false,
  usedQuestions: [],
  totalTurns: 0,
  snakesHit: 0,
  laddersHit: 0,
  challengesHit: 0,
  timerInterval: null,
  timeLeft: QUESTION_TIME,
  timerActive: false,
  doubleRoll: false,
  selectedChoice: null,
  challengeCallback: null
};

/* ==================== AUDIO ==================== */
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  }
}

function playTone(freq, duration = 0.12, type = 'sine', volume = 0.15) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

function soundCorrect() {
  [523, 659, 784].forEach((f, i) => setTimeout(() => playTone(f, 0.1, 'sine', 0.2), i * 70));
}
function soundWrong() {
  playTone(200, 0.15, 'sawtooth', 0.15);
  setTimeout(() => playTone(150, 0.25, 'sawtooth', 0.15), 90);
}
function soundDice() {
  for (let i = 0; i < 6; i++) {
    setTimeout(() => playTone(400 + Math.random() * 400, 0.05, 'square', 0.1), i * 80);
  }
}
function soundSnake() {
  playTone(300, 0.15, 'sawtooth', 0.2);
  setTimeout(() => playTone(200, 0.2, 'sawtooth', 0.2), 120);
  setTimeout(() => playTone(120, 0.3, 'sawtooth', 0.2), 280);
}
function soundLadder() {
  [400, 500, 600, 800].forEach((f, i) => setTimeout(() => playTone(f, 0.1, 'sine', 0.2), i * 60));
}
function soundVictory() {
  [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => setTimeout(() => playTone(f, 0.2, 'sine', 0.2), i * 120));
}
function soundMove() {
  playTone(700, 0.05, 'square', 0.08);
}
function soundTick() {
  playTone(1200, 0.04, 'square', 0.06);
}
function soundChallenge() {
  [600, 800, 1000, 1200].forEach((f, i) => setTimeout(() => playTone(f, 0.1, 'triangle', 0.2), i * 80));
}
function soundTimeout() {
  playTone(150, 0.3, 'sawtooth', 0.2);
  setTimeout(() => playTone(100, 0.4, 'sawtooth', 0.2), 200);
}

/* ==================== PARTÍCULAS ==================== */
const canvas = document.getElementById('snakeParticles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y, color, opts = {}) {
    this.x = x; this.y = y;
    this.vx = opts.vx || (Math.random() - 0.5) * 14;
    this.vy = opts.vy || (Math.random() - 0.5) * 14;
    this.size = opts.size || Math.random() * 6 + 3;
    this.color = color;
    this.life = 1;
    this.decay = opts.decay || Math.random() * 0.02 + 0.015;
    this.gravity = opts.gravity !== undefined ? opts.gravity : 0.2;
    this.shape = opts.shape || 'circle';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.vy += this.gravity; this.vx *= 0.99;
    this.life -= this.decay;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    if (this.shape === 'circle') {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    } else if (this.shape === 'square') {
      ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
    } else if (this.shape === 'star') {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const px = this.x + Math.cos(angle) * this.size;
        const py = this.y + Math.sin(angle) * this.size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  }
}

function emitParticles(x, y, count, colors, opts = {}) {
  for (let i = 0; i < count; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = opts.shape || (Math.random() > 0.7 ? 'star' : Math.random() > 0.5 ? 'square' : 'circle');
    particles.push(new Particle(x, y, color, { ...opts, shape }));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ==================== UTILS ==================== */
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function showScreen(id) {
  document.querySelectorAll('.snake-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ==================== INICIO ==================== */
function startGame() {
  initAudio();
  game.p1.name = document.getElementById('p1Name').value.trim() || 'Jugador 1';
  game.p2.name = document.getElementById('p2Name').value.trim() || 'Jugador 2';
  game.p1.position = 0;
  game.p2.position = 0;
  game.p1.correct = 0;
  game.p2.correct = 0;
  game.currentPlayer = 'p1';
  game.usedQuestions = [];
  game.totalTurns = 0;
  game.snakesHit = 0;
  game.laddersHit = 0;
  game.challengesHit = 0;

  document.getElementById('p1DisplayName').textContent = game.p1.name;
  document.getElementById('p2DisplayName').textContent = game.p2.name;
  document.getElementById('p1Position').textContent = '0';
  document.getElementById('p2Position').textContent = '0';

  buildBoard();
  showScreen('screen-game');
  setTimeout(loadQuestion, 300);
}

/* ==================== CONSTRUIR TABLERO ==================== */
function buildBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';

  const orderedCells = [];
  for (let row = BOARD_ROWS - 1; row >= 0; row--) {
    const start = row * BOARD_COLS + 1;
    const rowNums = [];
    for (let c = 0; c < BOARD_COLS; c++) {
      rowNums.push(start + c);
    }
    if (row % 2 === 0) {
      orderedCells.push(...rowNums);
    } else {
      orderedCells.push(...rowNums.reverse());
    }
  }

  const finalCells = [];
  const rows = [];
  for (let r = 0; r < BOARD_ROWS; r++) {
    rows.push(orderedCells.slice(r * BOARD_COLS, (r + 1) * BOARD_COLS));
  }
  for (let r = BOARD_ROWS - 1; r >= 0; r--) {
    finalCells.push(...rows[r]);
  }

  finalCells.forEach(num => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.number = num;

    if (num === 1) cell.classList.add('start-cell');
    if (num === BOARD_SIZE) cell.classList.add('end-cell');
    if (SNAKES[num]) cell.classList.add('snake-head');
    if (LADDERS[num]) cell.classList.add('ladder-bottom');
    if (CHALLENGE_CELLS[num]) cell.classList.add('challenge-cell');

    let icon = '';
    if (num === BOARD_SIZE) icon = '🏁';
    else if (SNAKES[num]) icon = '🐍';
    else if (LADDERS[num]) icon = '🪜';
    else if (CHALLENGE_CELLS[num]) icon = CHALLENGE_CELLS[num].icon;

    cell.innerHTML = `<span class="cell-number">${num}</span>${icon ? `<span class="cell-icon">${icon}</span>` : ''}`;
    board.appendChild(cell);
  });

  renderPieces();
}

function getCellElement(num) {
  return document.querySelector(`.cell[data-number="${num}"]`);
}

function renderPieces() {
  document.querySelectorAll('.player-piece').forEach(p => p.remove());

  if (game.p1.position > 0) {
    const cell1 = getCellElement(game.p1.position);
    if (cell1) {
      const piece1 = document.createElement('div');
      piece1.className = 'player-piece p1-piece';
      piece1.textContent = '🟠';
      piece1.style.top = '4px';
      piece1.style.right = '4px';
      cell1.appendChild(piece1);
    }
  }

  if (game.p2.position > 0) {
    const cell2 = getCellElement(game.p2.position);
    if (cell2) {
      const piece2 = document.createElement('div');
      piece2.className = 'player-piece p2-piece';
      piece2.textContent = '🔵';
      piece2.style.top = '4px';
      piece2.style.left = '4px';
      cell2.appendChild(piece2);
    }
  }
}

/* ==================== CRONÓMETRO ==================== */
function startTimer() {
  stopTimer();
  game.timeLeft = QUESTION_TIME;
  game.timerActive = true;
  updateTimerUI();

  game.timerInterval = setInterval(() => {
    if (game.paused || !game.timerActive) return;
    game.timeLeft -= 0.1;

    if (game.timeLeft <= 0) {
      game.timeLeft = 0;
      updateTimerUI();
      stopTimer();
      handleTimeOut();
      return;
    }

    updateTimerUI();

    // Tick sound en últimos 5 segundos
    if (game.timeLeft <= 5 && Math.abs(game.timeLeft - Math.round(game.timeLeft)) < 0.05) {
      soundTick();
    }
  }, 100);
}

function stopTimer() {
  clearInterval(game.timerInterval);
  game.timerInterval = null;
  game.timerActive = false;
}

function updateTimerUI() {
  const seconds = Math.ceil(game.timeLeft);
  const timerZone = document.querySelector('.timer-zone');
  const timerSeconds = document.getElementById('timerSeconds');
  const timerFill = document.getElementById('timerBarFill');

  timerSeconds.textContent = seconds;
  timerFill.style.width = (game.timeLeft / QUESTION_TIME) * 100 + '%';

  timerZone.classList.remove('warning', 'danger');
  if (game.timeLeft <= 5) timerZone.classList.add('danger');
  else if (game.timeLeft <= 10) timerZone.classList.add('warning');
}

function handleTimeOut() {
  if (game.answered) return;
  game.answered = true;

  soundTimeout();

  const q = game.currentQuestion;
  const buttons = document.querySelectorAll('#answersGrid .answer-btn');
  buttons.forEach((b, i) => {
    b.disabled = true;
    if (i === q.correct) b.classList.add('correct');
  });

  showFeedback(false, `⏰ ¡TIEMPO! La respuesta era: ${q.answers[q.correct]}`);

  setTimeout(() => {
    switchTurn();
    loadQuestion();
  }, 2200);
}

/* ==================== PREGUNTA ==================== */
function loadQuestion() {
  if (game.paused) return;

  if (game.p1.position >= BOARD_SIZE) { endGame('p1'); return; }
  if (game.p2.position >= BOARD_SIZE) { endGame('p2'); return; }

  let available = QUESTION_BANK.filter(q => !game.usedQuestions.includes(q.q));
  if (available.length === 0) {
    game.usedQuestions = [];
    available = [...QUESTION_BANK];
  }
  const q = available[Math.floor(Math.random() * available.length)];
  game.usedQuestions.push(q.q);

  const shuffled = shuffleAnswers(q);
  game.currentQuestion = shuffled;
  game.answered = false;
  game.waitingDice = false;
  game.doubleRoll = false;
  game.selectedChoice = null;

  document.getElementById('qCategory').textContent = q.cat.toUpperCase();
  document.getElementById('qText').textContent = q.q;

  const answersGrid = document.getElementById('answersGrid');
  answersGrid.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  shuffled.answers.forEach((ans, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.innerHTML = `<span class="ans-letter">${letters[i]}</span><span>${ans}</span>`;
    btn.onclick = () => selectAnswer(i, btn);
    answersGrid.appendChild(btn);
  });

  const fb = document.getElementById('qFeedback');
  fb.textContent = '';
  fb.className = 'question-feedback';

  document.getElementById('diceFace').textContent = '🎲';
  document.getElementById('diceInstruction').textContent = 'Responde correctamente para tirar';
  document.getElementById('dice').onclick = null;
  document.getElementById('dice').style.cursor = 'default';

  updateTurnUI();
  startTimer();
}

function shuffleAnswers(q) {
  const indexed = q.answers.map((ans, i) => ({ ans, isCorrect: i === q.correct }));
  const shuffledIdx = shuffle(indexed);
  const newAnswers = shuffledIdx.map(item => item.ans);
  const newCorrect = shuffledIdx.findIndex(item => item.isCorrect);
  return { ...q, answers: newAnswers, correct: newCorrect };
}

/* ==================== SELECCIÓN ==================== */
function selectAnswer(index, btn) {
  if (game.answered || game.waitingDice) return;
  game.answered = true;
  stopTimer();

  const q = game.currentQuestion;
  const isCorrect = index === q.correct;
  const buttons = document.querySelectorAll('#answersGrid .answer-btn');
  buttons.forEach(b => b.disabled = true);

  if (isCorrect) {
    btn.classList.add('correct');
    const player = game.currentPlayer === 'p1' ? game.p1 : game.p2;
    player.correct++;
    game.totalTurns++;

    showFeedback(true, '✅ ¡CORRECTO! Tira el dado');
    soundCorrect();

    const rect = btn.getBoundingClientRect();
    emitParticles(rect.left + rect.width / 2, rect.top + rect.height / 2,
      40, ['#10b981', '#34d399', '#facc15'], { vy: -8, size: 8 });

    game.waitingDice = true;
    document.getElementById('diceInstruction').textContent = '👉 ¡Toca el dado para tirar!';
    document.getElementById('dice').style.cursor = 'pointer';
    document.getElementById('dice').onclick = rollDice;

  } else {
    btn.classList.add('wrong');
    buttons[q.correct].classList.add('correct');
    game.totalTurns++;

    showFeedback(false, `❌ Incorrecto. La respuesta era: ${q.answers[q.correct]}. Pasa el turno.`);
    soundWrong();

    setTimeout(() => {
      switchTurn();
      loadQuestion();
    }, 2200);
  }
}

function showFeedback(isCorrect, text) {
  const fb = document.getElementById('qFeedback');
  fb.textContent = text;
  fb.className = 'question-feedback show ' + (isCorrect ? 'correct' : 'wrong');
}

/* ==================== DADO ==================== */
function rollDice() {
  if (!game.waitingDice || game.paused) return;
  game.waitingDice = false;
  document.getElementById('dice').onclick = null;

  soundDice();

  const dice = document.getElementById('dice');
  const diceFace = document.getElementById('diceFace');
  const instruction = document.getElementById('diceInstruction');

  dice.classList.add('rolling');
  instruction.textContent = 'Tirando...';

  let count = 0;
  const interval = setInterval(() => {
    diceFace.textContent = Math.floor(Math.random() * 6) + 1;
    count++;
    if (count > 10) {
      clearInterval(interval);
      const finalNumber = Math.floor(Math.random() * 6) + 1;
      diceFace.textContent = finalNumber;
      dice.classList.remove('rolling');
      instruction.textContent = `¡Sacaste ${finalNumber}!`;

      setTimeout(() => movePlayer(finalNumber), 600);
    }
  }, 80);
}

/* ==================== MOVER JUGADOR ==================== */
function movePlayer(steps) {
  const player = game.currentPlayer === 'p1' ? game.p1 : game.p2;
  const playerKey = game.currentPlayer;

  const startPos = player.position;
  let targetPos = startPos + steps;

  if (targetPos > BOARD_SIZE) {
    document.getElementById('diceInstruction').textContent = `Necesitas ${BOARD_SIZE - startPos} para ganar. ¡Se queda!`;
    setTimeout(() => {
      switchTurn();
      loadQuestion();
    }, 2000);
    return;
  }

  animateMove(playerKey, startPos, targetPos, () => {
    setTimeout(() => checkCellEvents(targetPos, playerKey), 400);
  });
}

/* ==================== EVENTOS DE CASILLA ==================== */
function checkCellEvents(pos, playerKey) {
  // 1. Serpientes
  if (SNAKES[pos]) {
    soundSnake();
    game.snakesHit++;
    const newPos = SNAKES[pos];
    document.getElementById('diceInstruction').textContent = `🐍 ¡Serpiente! Retrocedes a ${newPos}`;
    emitParticlesAtCell(pos, ['#ef4444', '#f87171', '#a855f7'], 30);

    setTimeout(() => {
      animateMove(playerKey, pos, newPos, () => {
        setTimeout(() => {
          switchTurn();
          loadQuestion();
        }, 800);
      });
    }, 800);
    return;
  }

  // 2. Escaleras
  if (LADDERS[pos]) {
    soundLadder();
    game.laddersHit++;
    const newPos = LADDERS[pos];
    document.getElementById('diceInstruction').textContent = `🪜 ¡Escalera! Subes a ${newPos}`;
    emitParticlesAtCell(pos, ['#10b981', '#34d399', '#facc15'], 40);

    setTimeout(() => {
      animateMove(playerKey, pos, newPos, () => {
        if (newPos >= BOARD_SIZE) {
          endGame(playerKey);
        } else {
          setTimeout(() => {
            switchTurn();
            loadQuestion();
          }, 800);
        }
      });
    }, 800);
    return;
  }

  // 3. Retos
  if (CHALLENGE_CELLS[pos]) {
    soundChallenge();
    game.challengesHit++;
    showChallenge(pos, playerKey);
    return;
  }

  // 4. Sin evento
  if (pos >= BOARD_SIZE) {
    setTimeout(() => endGame(playerKey), 800);
  } else {
    setTimeout(() => {
      switchTurn();
      loadQuestion();
    }, 1000);
  }
}

/* ==================== MOSTRAR RETO ==================== */
function showChallenge(pos, playerKey) {
  const challenge = CHALLENGE_CELLS[pos];
  const player = game[playerKey];

  document.getElementById('challengeIcon').textContent = challenge.icon;
  document.getElementById('challengeLabel').textContent = `CASILLA ${pos} · ESPECIAL`;
  document.getElementById('challengeTitle').textContent = challenge.title;
  document.getElementById('challengeDescription').textContent = challenge.description;

  const choicesDiv = document.getElementById('challengeChoices');
  const continueBtn = document.getElementById('challengeContinue');

  choicesDiv.innerHTML = '';
  continueBtn.style.display = 'none';
  game.selectedChoice = null;

  if (challenge.effect === 'choice') {
    challenge.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'challenge-choice';
      btn.textContent = choice.label;
      btn.onclick = () => {
        document.querySelectorAll('.challenge-choice').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        game.selectedChoice = choice.value;
        continueBtn.style.display = 'inline-flex';
      };
      choicesDiv.appendChild(btn);
    });
  } else {
    continueBtn.style.display = 'inline-flex';
  }

  game.challengeCallback = () => applyChallengeEffect(challenge, playerKey, pos);

  document.getElementById('challengeOverlay').classList.add('active');
}

function acceptChallenge() {
  document.getElementById('challengeOverlay').classList.remove('active');
  if (game.challengeCallback) {
    game.challengeCallback();
    game.challengeCallback = null;
  }
}

/* ==================== APLICAR EFECTO DEL RETO ==================== */
function applyChallengeEffect(challenge, playerKey, pos) {
  const player = game[playerKey];

  switch (challenge.effect) {
    case 'roll_again':
      // Tira otra vez (sin cambiar turno)
      document.getElementById('diceInstruction').textContent = '🔄 ¡Tira otra vez!';
      game.waitingDice = true;
      document.getElementById('dice').style.cursor = 'pointer';
      document.getElementById('dice').onclick = () => {
        // Vuelve a tirar y mover (sin cambiar turno al final)
        rollDiceAgain();
      };
      break;

    case 'skip_turn':
      // Pierde turno
      document.getElementById('diceInstruction').textContent = '💀 ¡Pierdes turno!';
      setTimeout(() => {
        switchTurn();
        loadQuestion();
      }, 1500);
      break;

    case 'advance':
      // Avanza X casillas
      const advanceTo = Math.min(pos + challenge.amount, BOARD_SIZE);
      document.getElementById('diceInstruction').textContent = `⏭ ¡Avanzas ${challenge.amount}! → Casilla ${advanceTo}`;
      setTimeout(() => {
        animateMove(playerKey, pos, advanceTo, () => {
          if (advanceTo >= BOARD_SIZE) {
            endGame(playerKey);
          } else {
            setTimeout(() => {
              // Puede caer en otra casilla especial
              checkCellEvents(advanceTo, playerKey);
            }, 400);
          }
        });
      }, 800);
      break;

    case 'back':
      // Retrocede X casillas
      const backTo = Math.max(pos - challenge.amount, 1);
      document.getElementById('diceInstruction').textContent = `⏪ ¡Retrocedes ${challenge.amount}! → Casilla ${backTo}`;
      setTimeout(() => {
        animateMove(playerKey, pos, backTo, () => {
          setTimeout(() => {
            checkCellEvents(backTo, playerKey);
          }, 400);
        });
      }, 800);
      break;

    case 'double_roll':
      // Doble tiro
      document.getElementById('diceInstruction').textContent = '⭐ ¡Doble tiro! Sumas 2 dados';
      game.waitingDice = true;
      document.getElementById('dice').style.cursor = 'pointer';
      document.getElementById('dice').onclick = () => doubleRollDice();
      break;

    case 'teleport':
      // Teletransporte a casilla aleatoria
      let randomPos;
      do {
        randomPos = Math.floor(Math.random() * (BOARD_SIZE - 1)) + 2;
      } while (randomPos === pos || SNAKES[randomPos] || LADDERS[randomPos]);
      document.getElementById('diceInstruction').textContent = `🌀 ¡Teletransporte a casilla ${randomPos}!`;
      setTimeout(() => {
        player.position = randomPos;
        document.getElementById('p1Position').textContent = game.p1.position;
        document.getElementById('p2Position').textContent = game.p2.position;
        renderPieces();
        emitParticlesAtCell(randomPos, ['#a855f7', '#ec4899', '#06b6d4'], 40);
        setTimeout(() => {
          checkCellEvents(randomPos, playerKey);
        }, 800);
      }, 800);
      break;

    case 'choice':
      // El jugador ya eligió (game.selectedChoice)
      const choice = game.selectedChoice;
      const choiceTo = Math.min(Math.max(pos + choice, 1), BOARD_SIZE);
      const arrow = choice > 0 ? '⏭ Avanzas' : '⏪ Retrocedes';
      document.getElementById('diceInstruction').textContent = `${arrow} ${Math.abs(choice)} → Casilla ${choiceTo}`;
      setTimeout(() => {
        animateMove(playerKey, pos, choiceTo, () => {
          if (choiceTo >= BOARD_SIZE) {
            endGame(playerKey);
          } else {
            setTimeout(() => {
              checkCellEvents(choiceTo, playerKey);
            }, 400);
          }
        });
      }, 800);
      break;
  }
}

function rollDiceAgain() {
  const dice = document.getElementById('dice');
  const diceFace = document.getElementById('diceFace');
  const instruction = document.getElementById('diceInstruction');

  game.waitingDice = false;
  document.getElementById('dice').onclick = null;
  soundDice();

  dice.classList.add('rolling');
  instruction.textContent = 'Tirando otra vez...';

  let count = 0;
  const interval = setInterval(() => {
    diceFace.textContent = Math.floor(Math.random() * 6) + 1;
    count++;
    if (count > 10) {
      clearInterval(interval);
      const finalNumber = Math.floor(Math.random() * 6) + 1;
      diceFace.textContent = finalNumber;
      dice.classList.remove('rolling');
      instruction.textContent = `¡Sacaste ${finalNumber}! (2° tiro)`;

      setTimeout(() => {
        const player = game[game.currentPlayer === 'p1' ? 'p1' : 'p2'];
        const playerKey = game.currentPlayer;
        const startPos = player.position;
        const targetPos = Math.min(startPos + finalNumber, BOARD_SIZE);

        animateMove(playerKey, startPos, targetPos, () => {
          if (targetPos >= BOARD_SIZE) {
            endGame(playerKey);
          } else {
            setTimeout(() => {
              checkCellEvents(targetPos, playerKey);
            }, 400);
          }
        });
      }, 600);
    }
  }, 80);
}

function doubleRollDice() {
  const dice = document.getElementById('dice');
  const diceFace = document.getElementById('diceFace');
  const instruction = document.getElementById('diceInstruction');

  game.waitingDice = false;
  document.getElementById('dice').onclick = null;
  soundDice();

  dice.classList.add('rolling');
  instruction.textContent = '🎲🎲 Tirando 2 dados...';

  let count = 0;
  const interval = setInterval(() => {
    diceFace.textContent = Math.floor(Math.random() * 6) + 1;
    count++;
    if (count > 10) {
      clearInterval(interval);
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      const total = d1 + d2;
      diceFace.textContent = total;
      dice.classList.remove('rolling');
      instruction.textContent = `¡${d1} + ${d2} = ${total}!`;

      setTimeout(() => {
        const player = game[game.currentPlayer === 'p1' ? 'p1' : 'p2'];
        const playerKey = game.currentPlayer;
        const startPos = player.position;
        const targetPos = Math.min(startPos + total, BOARD_SIZE);

        animateMove(playerKey, startPos, targetPos, () => {
          if (targetPos >= BOARD_SIZE) {
            endGame(playerKey);
          } else {
            setTimeout(() => {
              checkCellEvents(targetPos, playerKey);
            }, 400);
          }
        });
      }, 800);
    }
  }, 80);
}

/* ==================== ANIMACIÓN DE MOVIMIENTO ==================== */
function animateMove(playerKey, from, to, callback) {
  const player = game[playerKey];
  const direction = to > from ? 1 : -1;
  let current = from;

  const step = () => {
    if (current === to) {
      player.position = to;
      document.getElementById('p1Position').textContent = game.p1.position;
      document.getElementById('p2Position').textContent = game.p2.position;
      renderPieces();

      const piece = document.querySelector(`.${playerKey}-piece`);
      if (piece) {
        piece.classList.add('hopping');
        setTimeout(() => piece.classList.remove('hopping'), 500);
      }

      soundMove();
      setTimeout(callback, 300);
      return;
    }

    current += direction;
    player.position = current;
    document.getElementById('p1Position').textContent = game.p1.position;
    document.getElementById('p2Position').textContent = game.p2.position;
    renderPieces();
    soundMove();

    const cell = getCellElement(current);
    if (cell) {
      const rect = cell.getBoundingClientRect();
      const colors = playerKey === 'p1' ? ['#f97316', '#facc15'] : ['#06b6d4', '#3b82f6'];
      emitParticles(rect.left + rect.width / 2, rect.top + rect.height / 2,
        5, colors, { vy: -3, size: 4 });
    }

    setTimeout(step, 300);
  };

  step();
}

function emitParticlesAtCell(cellNum, colors, count) {
  const cell = getCellElement(cellNum);
  if (!cell) return;
  const rect = cell.getBoundingClientRect();
  emitParticles(rect.left + rect.width / 2, rect.top + rect.height / 2,
    count, colors, { vy: -8, size: 8 });
}

/* ==================== TURNO ==================== */
function switchTurn() {
  game.currentPlayer = game.currentPlayer === 'p1' ? 'p2' : 'p1';
  updateTurnUI();
}

function updateTurnUI() {
  const p1Panel = document.getElementById('p1Panel');
  const p2Panel = document.getElementById('p2Panel');
  const p1Indicator = document.getElementById('p1TurnIndicator');
  const p2Indicator = document.getElementById('p2TurnIndicator');
  const turnPlayer = document.getElementById('currentPlayerName');

  p1Panel.classList.remove('active-turn');
  p2Panel.classList.remove('active-turn');
  p1Indicator.classList.remove('show');
  p2Indicator.classList.remove('show');

  if (game.currentPlayer === 'p1') {
    p1Panel.classList.add('active-turn');
    p1Indicator.classList.add('show');
    turnPlayer.textContent = game.p1.name;
    turnPlayer.style.color = '#f97316';
    turnPlayer.style.textShadow = '0 0 15px #f97316';
  } else {
    p2Panel.classList.add('active-turn');
    p2Indicator.classList.add('show');
    turnPlayer.textContent = game.p2.name;
    turnPlayer.style.color = '#06b6d4';
    turnPlayer.style.textShadow = '0 0 15px #06b6d4';
  }
}

/* ==================== FIN DEL JUEGO ==================== */
function endGame(winnerKey) {
  soundVictory();
  const winner = game[winnerKey];

  document.getElementById('endTitle').textContent = `¡${winner.name.toUpperCase()} GANA!`;
  document.getElementById('endWinnerName').textContent = `🏆 ${winner.name} llegó a la casilla ${BOARD_SIZE} 🏆`;
  document.getElementById('winnerTrophy').textContent = '👑';

  document.getElementById('endTotalTurns').textContent = game.totalTurns;
  document.getElementById('endP1Correct').textContent = game.p1.correct;
  document.getElementById('endP2Correct').textContent = game.p2.correct;
  document.getElementById('endSnakes').textContent = game.snakesHit;
  document.getElementById('endLadders').textContent = game.laddersHit;
  document.getElementById('endChallenges').textContent = game.challengesHit;

  launchConfetti();
  showScreen('screen-end');
}

function launchConfetti() {
  const container = document.getElementById('confettiEnd');
  container.innerHTML = '';
  const colors = ['#f97316', '#facc15', '#ec4899', '#a855f7', '#06b6d4', '#10b981'];
  for (let i = 0; i < 120; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
    piece.style.animationDelay = (Math.random() * 1.5) + 's';
    piece.style.width = (Math.random() * 8 + 6) + 'px';
    piece.style.height = (Math.random() * 8 + 6) + 'px';
    if (Math.random() > 0.5) piece.style.borderRadius = '50%';
    container.appendChild(piece);
  }
  setTimeout(() => { container.innerHTML = ''; }, 6000);
}

/* ==================== PAUSA ==================== */
function togglePause() {
  game.paused = !game.paused;
  document.getElementById('pauseOverlay').classList.toggle('active', game.paused);
}

function quitGame() {
  if (confirm('¿Salir del juego?')) {
    game.paused = false;
    stopTimer();
    document.getElementById('pauseOverlay').classList.remove('active');
    showScreen('screen-start');
  }
}

function restartGame() {
  showScreen('screen-start');
}

/* ==================== FULLSCREEN ==================== */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(e => console.warn(e));
  } else {
    document.exitFullscreen();
  }
}

/* ==================== ATAJOS DE TECLADO ==================== */
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('screen-game').classList.contains('active')) return;
  if (e.key === 'Escape') { e.preventDefault(); togglePause(); return; }
  if (e.key === ' ' && game.waitingDice) { e.preventDefault(); rollDice(); }
  if (['1', '2', '3', '4'].includes(e.key) && !game.answered) {
    const btn = document.querySelectorAll('#answersGrid .answer-btn')[parseInt(e.key) - 1];
    if (btn && !btn.disabled) btn.click();
  }
});

document.addEventListener('DOMContentLoaded', () => {});
