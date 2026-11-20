/* Motor simple de quiz para los 4 juegos */
let questions = [];
let idx = 0;
let score = 0;
let streak = 0;
let answered = false;

function startGame(qs) {
  questions = qs;
  idx = 0;
  score = 0;
  streak = 0;
  answered = false;
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('endScreen').style.display = 'none';
  document.getElementById('playScreen').style.display = 'block';
  renderQ();
}

function renderQ() {
  answered = false;
  const q = questions[idx];
  document.getElementById('qNum').textContent = `Pregunta ${idx + 1} de ${questions.length}`;
  document.getElementById('qText').textContent = q.q;
  document.getElementById('scorePill').textContent = score + ' pts';
  document.getElementById('streakPill').textContent = 'Racha: ' + streak;
  const box = document.getElementById('answers');
  box.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const b = document.createElement('button');
    b.className = 'ans-btn';
    b.textContent = opt;
    b.onclick = () => choose(i);
    box.appendChild(b);
  });
  const fb = document.getElementById('fbBox');
  fb.className = 'fb-box';
  fb.textContent = '';
  document.getElementById('nextBtn').style.display = 'none';
}

function choose(i) {
  if (answered) return;
  answered = true;
  const q = questions[idx];
  const btns = document.querySelectorAll('.ans-btn');
  btns.forEach((b, j) => {
    b.disabled = true;
    if (j === q.ok) b.classList.add('correct');
    if (j === i && i !== q.ok) b.classList.add('wrong');
  });
  const fb = document.getElementById('fbBox');
  fb.classList.add('show');
  if (i === q.ok) {
    streak++;
    const pts = 10 + Math.min(streak - 1, 5) * 2;
    score += pts;
    fb.classList.add('ok');
    fb.textContent = `¡Correcto! +${pts} pts` + (q.tip ? ' · ' + q.tip : '');
  } else {
    streak = 0;
    fb.classList.add('bad');
    fb.textContent = (q.tip || 'Incorrecto.') + ' Respuesta: ' + q.opts[q.ok];
  }
  document.getElementById('scorePill').textContent = score + ' pts';
  document.getElementById('streakPill').textContent = 'Racha: ' + streak;
  document.getElementById('nextBtn').style.display = 'inline-block';
}

function nextQ() {
  idx++;
  if (idx >= questions.length) {
    document.getElementById('playScreen').style.display = 'none';
    document.getElementById('endScreen').style.display = 'block';
    document.getElementById('finalScore').textContent = score;
    let msg = '¡Buen esfuerzo!';
    if (score >= questions.length * 12) msg = '¡Excelente! Dominas el tema.';
    else if (score >= questions.length * 8) msg = '¡Muy bien! Sigue practicando.';
    document.getElementById('endMsg').textContent = msg;
  } else {
    renderQ();
  }
}

function restart() {
  document.getElementById('endScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'block';
}
