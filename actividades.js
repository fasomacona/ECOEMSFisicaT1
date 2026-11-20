/* ===== State ===== */
let totalScore = 0;
let selectedChip = null;
let matchSelected = null;
let chartAct = null;

/* ===== Navigation between blocks ===== */
document.querySelectorAll('.block-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const blockNum = btn.dataset.block;
    
    // Update buttons
    document.querySelectorAll('.block-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update blocks
    document.querySelectorAll('.block').forEach(b => b.classList.remove('active'));
    document.getElementById(`block-${blockNum}`).classList.add('active');
    
    // Update header
    document.getElementById('currentBlock').textContent = `Bloque ${blockNum}`;
    
    // Progress bar
    const percent = (parseInt(blockNum) / 6) * 100;
    document.getElementById('progressFill').style.width = percent + '%';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Init chart if block 4
    if (blockNum === '4') {
      setTimeout(initActChart, 100);
    }
  });
});

function addScore(points) {
  totalScore += points;
  document.getElementById('totalScore').textContent = totalScore;
}

/* ===== 1.1 Brainstorm timer ===== */
function startBrainstorm() {
  const el = document.getElementById('brainstormTimer');
  el.classList.remove('hidden');
  let seconds = 120;
  
  const interval = setInterval(() => {
    seconds--;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    
    if (seconds <= 0) {
      clearInterval(interval);
      el.textContent = '¡Tiempo!';
      el.style.color = '#ef4444';
    }
  }, 1000);
}

/* ===== 1.2 Classification ===== */
document.querySelectorAll('#classifyItems .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    // Deselect previous
    document.querySelectorAll('#classifyItems .chip').forEach(c => c.classList.remove('selected'));
    chip.classList.add('selected');
    selectedChip = chip;
  });
});

document.querySelectorAll('.drop-zone').forEach(zone => {
  zone.addEventListener('click', () => {
    if (!selectedChip) return;
    
    const accept = zone.dataset.accept;
    const type = selectedChip.dataset.type;
    
    // Move chip visually
    const clone = selectedChip.cloneNode(true);
    clone.classList.remove('selected');
    clone.classList.add('placed');
    zone.querySelector('.dropped').appendChild(clone);
    
    selectedChip.classList.add('placed');
    selectedChip.classList.remove('selected');
    selectedChip = null;
  });
});

function checkClassification() {
  const feedback = document.getElementById('classFeedback');
  const escalarZone = document.querySelector('#zoneEscalar .dropped');
  const vectorialZone = document.querySelector('#zoneVectorial .dropped');
  
  let correct = 0;
  let total = 0;
  
  escalarZone.querySelectorAll('.chip').forEach(chip => {
    total++;
    if (chip.dataset.type === 'escalar') correct++;
  });
  vectorialZone.querySelectorAll('.chip').forEach(chip => {
    total++;
    if (chip.dataset.type === 'vectorial') correct++;
  });
  
  feedback.classList.add('show');
  if (correct === 8 && total === 8) {
    feedback.className = 'feedback show correct';
    feedback.textContent = '¡Perfecto! Todas las magnitudes están correctamente clasificadas.';
    addScore(15);
  } else if (total < 8) {
    feedback.className = 'feedback show incorrect';
    feedback.textContent = `Aún faltan magnitudes por clasificar (${total}/8).`;
  } else {
    feedback.className = 'feedback show incorrect';
    feedback.textContent = `Hay ${8 - correct} errores. Revisa las definiciones de escalar y vectorial.`;
  }
}

/* ===== 1.3 True / False ===== */
function answerTF(btn, isCorrectAnswer) {
  const item = btn.closest('.tf-item');
  const explain = item.querySelector('.tf-explain');
  const buttons = item.querySelectorAll('.tf-btns button');
  
  // Disable buttons
  buttons.forEach(b => b.disabled = true);
  
  const clickedTrue = btn.textContent.trim() === 'Verdadero';
  const correct = item.dataset.answer === 'true';
  
  if ((clickedTrue && correct) || (!clickedTrue && !correct)) {
    btn.style.background = '#d1fae5';
    btn.style.borderColor = '#10b981';
    addScore(5);
  } else {
    btn.style.background = '#fee2e2';
    btn.style.borderColor = '#ef4444';
  }
  
  explain.classList.remove('hidden');
}

/* ===== 2.1 Path challenge ===== */
function checkPathChallenge() {
  const dist = parseFloat(document.getElementById('distChallenge').value);
  const desp = parseFloat(document.getElementById('despChallenge').value);
  const feedback = document.getElementById('pathFeedback');
  
  // Correct: distance = 40+30+40+10 = 120 m
  // Displacement: net = 20 m east (30-10) and 0 north → 20 m
  feedback.classList.add('show');
  
  let msg = '';
  let ok = true;
  
  if (dist === 120) {
    msg += '✓ Distancia correcta (120 m). ';
  } else {
    msg += '✗ Distancia incorrecta (debe ser 40+30+40+10 = 120 m). ';
    ok = false;
  }
  
  if (desp === 20) {
    msg += '✓ Desplazamiento correcto (20 m hacia el este).';
  } else {
    msg += '✗ Desplazamiento incorrecto (neto: 20 m al este).';
    ok = false;
  }
  
  feedback.className = ok ? 'feedback show correct' : 'feedback show incorrect';
  feedback.textContent = msg;
  if (ok) addScore(20);
}

/* ===== 2.2 Sequence ===== */
const seqArea = document.getElementById('sequenceArea');
if (seqArea) {
  let dragged = null;
  
  seqArea.querySelectorAll('.seq-item').forEach(item => {
    item.addEventListener('dragstart', () => {
      dragged = item;
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });
    item.addEventListener('dragover', e => e.preventDefault());
    item.addEventListener('drop', e => {
      e.preventDefault();
      if (dragged && dragged !== item) {
        const items = [...seqArea.querySelectorAll('.seq-item')];
        const from = items.indexOf(dragged);
        const to = items.indexOf(item);
        if (from < to) {
          item.after(dragged);
        } else {
          item.before(dragged);
        }
      }
    });
  });
}

function checkSequence() {
  const items = [...document.querySelectorAll('#sequenceArea .seq-item')];
  const order = items.map(i => parseInt(i.dataset.order));
  const feedback = document.getElementById('seqFeedback');
  
  const correct = [1, 2, 3, 4];
  const isCorrect = order.every((v, i) => v === correct[i]);
  
  feedback.classList.add('show');
  if (isCorrect) {
    feedback.className = 'feedback show correct';
    feedback.textContent = '¡Orden correcto! Diagrama → componentes → cálculo → dirección.';
    addScore(15);
  } else {
    feedback.className = 'feedback show incorrect';
    feedback.textContent = 'El orden no es el ideal. Intenta: 1) Diagrama, 2) Componentes, 3) Cálculo, 4) Dirección.';
  }
}

/* ===== 2.3 Find the error ===== */
function checkError(btn, isCorrect) {
  const feedback = document.getElementById('errorFeedback');
  const buttons = btn.parentElement.querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);
  
  if (isCorrect) {
    btn.classList.add('correct');
    feedback.className = 'feedback show correct';
    feedback.innerHTML = '¡Correcto! Por Pitágoras: \(\\sqrt{5^2 + 12^2} = 13\) km. La distancia sí es 17 km, pero el desplazamiento es 13 km.';
    addScore(10);
  } else {
    btn.classList.add('wrong');
    feedback.className = 'feedback show incorrect';
    feedback.textContent = 'No es esa la respuesta. Revisa el cálculo del desplazamiento con Pitágoras.';
  }
  
  if (window.renderMathInElement) {
    renderMathInElement(feedback, { delimiters: [{left: '\\(', right: '\\)', display: false}], throwOnError: false });
  }
}

/* ===== 3.1 Race ===== */
const raceProblems = [
  { q: 'Un ciclista recorre <strong>2.4 km</strong> en <strong>8 minutos</strong>. ¿Cuál es su rapidez media en m/s?', a: 5 },
  { q: 'Un auto viaja 90 km en 1.5 horas. ¿Rapidez media en km/h?', a: 60 },
  { q: 'Recorres 150 m en 25 s. ¿Rapidez en m/s?', a: 6 },
  { q: 'Un tren avanza 2.5 km en 2 minutos. ¿Rapidez en m/s?', a: 20.83 }
];
let currentRace = 0;

function checkRace() {
  const answer = parseFloat(document.getElementById('raceAnswer').value);
  const feedback = document.getElementById('raceFeedback');
  const correct = raceProblems[currentRace].a;
  
  feedback.classList.add('show');
  if (Math.abs(answer - correct) < 0.1) {
    feedback.className = 'feedback show correct';
    feedback.textContent = `¡Correcto! Respuesta: ${correct}`;
    addScore(15);
  } else {
    feedback.className = 'feedback show incorrect';
    feedback.textContent = `Incorrecto. La respuesta correcta es aproximadamente ${correct}`;
  }
}

function newRaceProblem() {
  currentRace = (currentRace + 1) % raceProblems.length;
  document.getElementById('raceProblem').innerHTML = `<p>${raceProblems[currentRace].q}</p>`;
  document.getElementById('raceAnswer').value = '';
  document.getElementById('raceFeedback').classList.remove('show');
}

/* ===== 3.2 Matching ===== */
document.querySelectorAll('.match-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.match-item').forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
    matchSelected = item;
  });
});

document.querySelectorAll('.match-target').forEach(target => {
  target.addEventListener('click', () => {
    if (!matchSelected) return;
    
    if (matchSelected.dataset.match === target.dataset.match) {
      matchSelected.classList.add('matched');
      target.classList.add('matched');
      matchSelected.classList.remove('selected');
      matchSelected = null;
      
      // Check if all matched
      const remaining = document.querySelectorAll('.match-item:not(.matched)').length;
      if (remaining === 0) {
        const feedback = document.getElementById('matchFeedback');
        feedback.className = 'feedback show correct';
        feedback.textContent = '¡Todas las relaciones son correctas!';
        addScore(20);
      }
    } else {
      // Wrong match - brief feedback
      target.style.borderColor = '#ef4444';
      setTimeout(() => target.style.borderColor = '', 600);
    }
  });
});

/* ===== 3.3 Maria scenario ===== */
function checkMaria() {
  const rapidez = parseFloat(document.getElementById('mariaRapidez').value);
  const vel = parseFloat(document.getElementById('mariaVel').value);
  const feedback = document.getElementById('mariaFeedback');
  
  // 4.2 km / (25/60) h = 4.2 * 2.4 = 10.08 km/h
  // 2.8 km / (25/60) h = 2.8 * 2.4 = 6.72 km/h
  
  feedback.classList.add('show');
  let ok = true;
  let msg = '';
  
  if (Math.abs(rapidez - 10.08) < 0.15) {
    msg += '✓ Rapidez ≈ 10.08 km/h. ';
  } else {
    msg += '✗ Rapidez incorrecta (4.2 km ÷ 0.4167 h ≈ 10.08 km/h). ';
    ok = false;
  }
  
  if (Math.abs(vel - 6.72) < 0.15) {
    msg += '✓ Velocidad media ≈ 6.72 km/h.';
  } else {
    msg += '✗ Velocidad media incorrecta (2.8 km ÷ 0.4167 h ≈ 6.72 km/h).';
    ok = false;
  }
  
  feedback.className = ok ? 'feedback show correct' : 'feedback show incorrect';
  feedback.textContent = msg;
  if (ok) addScore(15);
}

/* ===== 4.1 Graph ===== */
function initActChart() {
  const ctx = document.getElementById('actChart');
  if (!ctx || chartAct) return;
  
  chartAct = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      datasets: [{
        label: 'Posición (m)',
        data: [0, 4, 8, 8, 8, 12, 16, 12, 8],
        borderColor: '#1e40af',
        backgroundColor: 'rgba(30,64,175,0.1)',
        borderWidth: 3,
        pointRadius: 5,
        tension: 0
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Tiempo (s)' } },
        y: { title: { display: true, text: 'Posición (m)' } }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function graphQ(btn, isCorrect) {
  const feedback = document.getElementById('graphQFeedback');
  const buttons = btn.parentElement.querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);
  
  if (isCorrect) {
    btn.classList.add('correct');
    feedback.className = 'feedback show correct';
    feedback.textContent = '¡Correcto! Entre 2 s y 4 s la posición no cambia → reposo (pendiente = 0).';
    addScore(10);
  } else {
    btn.classList.add('wrong');
    feedback.className = 'feedback show incorrect';
    feedback.textContent = 'Observa dónde la línea es horizontal.';
  }
}

/* ===== 4.3 Slope ===== */
function checkSlope() {
  const val = parseFloat(document.getElementById('slopeVel').value);
  const feedback = document.getElementById('slopeFeedback');
  
  // (18-6)/(5-2) = 12/3 = 4 m/s
  feedback.classList.add('show');
  if (val === 4) {
    feedback.className = 'feedback show correct';
    feedback.textContent = '¡Exacto! v = (18−6)/(5−2) = 4 m/s';
    addScore(15);
  } else {
    feedback.className = 'feedback show incorrect';
    feedback.textContent = 'Recuerda: pendiente = Δx / Δt = (18−6)/(5−2) = 4 m/s';
  }
}

/* ===== 5.1 Formulas (button version) ===== */
const formulaAnswers = { 1: null, 2: null, 3: null };

function selectFormula(btn, qNum) {
  const group = btn.closest('.fq-options');
  group.querySelectorAll('button').forEach(b => {
    b.classList.remove('correct', 'wrong');
    b.disabled = true;
  });
  
  const isCorrect = btn.dataset.correct === '1';
  if (isCorrect) {
    btn.classList.add('correct');
    formulaAnswers[qNum] = true;
  } else {
    btn.classList.add('wrong');
    const correctBtn = group.querySelector('[data-correct="1"]');
    if (correctBtn) correctBtn.classList.add('correct');
    formulaAnswers[qNum] = false;
  }
  
  if (formulaAnswers[1] !== null && formulaAnswers[2] !== null && formulaAnswers[3] !== null) {
    const feedback = document.getElementById('formulaFeedback');
    const score = [1, 2, 3].filter(k => formulaAnswers[k]).length;
    feedback.classList.add('show');
    if (score === 3) {
      feedback.className = 'feedback show correct';
      feedback.textContent = '¡Todas correctas! Sabes elegir la fórmula adecuada según los datos.';
      addScore(15);
    } else {
      feedback.className = 'feedback show incorrect';
      feedback.textContent = `Obtuviste ${score}/3. Usa la fórmula que contenga exactamente las variables que conoces y la que buscas.`;
    }
  }
}

/* ===== 5.2 Guided ===== */
function checkGuided(step) {
  const feedback = document.getElementById('guidedFeedback');
  
  if (step === 1) {
    const vf = parseFloat(document.getElementById('guidedVf').value);
    if (vf === 18) {
      document.getElementById('step1').classList.add('hidden');
      document.getElementById('step2').classList.remove('hidden');
      feedback.className = 'feedback show correct';
      feedback.textContent = 'Correcto: vf = 0 + 1.5×12 = 18 m/s';
    } else {
      feedback.className = 'feedback show incorrect';
      feedback.textContent = 'vf = vi + a·t = 0 + 1.5×12 = 18 m/s';
    }
  } else if (step === 2) {
    const x = parseFloat(document.getElementById('guidedX').value);
    if (x === 108) {
      document.getElementById('step2').classList.add('hidden');
      document.getElementById('step3').classList.remove('hidden');
      feedback.className = 'feedback show correct';
      feedback.textContent = '¡Perfecto! x = ½·a·t² = ½·1.5·144 = 108 m';
      addScore(20);
    } else {
      feedback.className = 'feedback show incorrect';
      feedback.textContent = 'x = ½ × 1.5 × 12² = 0.75 × 144 = 108 m';
    }
  }
  feedback.classList.add('show');
}

/* ===== 5.3 Auto freno ===== */
function checkAutoFreno() {
  const t = parseFloat(document.getElementById('autoT').value);
  const x = parseFloat(document.getElementById('autoX').value);
  const feedback = document.getElementById('autoFeedback');
  
  // vf = 0 = 20 + (-4)t → t = 5 s
  // x = (vi+vf)/2 * t = (20+0)/2 * 5 = 50 m
  // or vf² = vi² + 2ax → 0 = 400 + 2(-4)x → x = 50 m
  feedback.classList.add('show');
  let ok = true;
  let msg = '';
  
  if (t === 5) {
    msg += '✓ Tiempo = 5 s. ';
  } else {
    msg += '✗ Tiempo incorrecto (0 = 20 − 4t → t = 5 s). ';
    ok = false;
  }
  
  if (x === 50) {
    msg += '✓ Distancia = 50 m.';
  } else {
    msg += '✗ Distancia incorrecta (x = 50 m).';
    ok = false;
  }
  
  feedback.className = ok ? 'feedback show correct' : 'feedback show incorrect';
  feedback.textContent = msg;
  if (ok) addScore(20);
}

/* ===== 5.4 Acceleration negative ===== */
function showAccelExplain(isFalse) {
  const feedback = document.getElementById('accelFeedback');
  feedback.classList.add('show');
  
  if (isFalse) {
    feedback.className = 'feedback show correct';
    feedback.innerHTML = '¡Correcto, es Falso! Aceleración negativa solo significa que la velocidad disminuye <em>en el sentido positivo</em> que elegimos. Si el objeto se mueve en sentido negativo y va cada vez más rápido, la aceleración también es negativa.';
    addScore(10);
  } else {
    feedback.className = 'feedback show incorrect';
    feedback.textContent = 'No es verdadero. Piensa en un objeto que se mueve hacia la izquierda (sentido negativo) y va cada vez más rápido.';
  }
}

/* ===== 5.5 Moto conversion ===== */
function checkMoto() {
  const a = parseFloat(document.getElementById('motoA').value);
  const feedback = document.getElementById('motoFeedback');
  // 72 km/h = 20 m/s; a = 20/5 = 4 m/s²
  feedback.classList.add('show');
  if (a === 4) {
    feedback.className = 'feedback show correct';
    feedback.textContent = '¡Correcto! 72 km/h = 20 m/s → a = 20/5 = 4 m/s²';
    addScore(15);
  } else {
    feedback.className = 'feedback show incorrect';
    feedback.textContent = 'Convierte primero: 72 ÷ 3.6 = 20 m/s. Luego a = Δv/t = 20/5 = 4 m/s²';
  }
}

/* ===== 2.4 Dron ===== */
function checkDron() {
  const dist = parseFloat(document.getElementById('dronDist').value);
  const desp = parseFloat(document.getElementById('dronDesp').value);
  const feedback = document.getElementById('dronFeedback');
  // dist = 50+120+50 = 220 m; desp = 120 m north
  feedback.classList.add('show');
  let ok = true;
  let msg = '';
  if (dist === 220) msg += '✓ Distancia = 220 m. ';
  else { msg += '✗ Distancia incorrecta (50+120+50 = 220 m). '; ok = false; }
  if (desp === 120) msg += '✓ Desplazamiento = 120 m (hacia el norte).';
  else { msg += '✗ Desplazamiento incorrecto (los 50 m este y oeste se cancelan → 120 m norte).'; ok = false; }
  feedback.className = ok ? 'feedback show correct' : 'feedback show incorrect';
  feedback.textContent = msg;
  if (ok) addScore(15);
}

/* ===== 3.4 Conversion ===== */
function checkConv() {
  const v = parseFloat(document.getElementById('convMs').value);
  const feedback = document.getElementById('convFeedback');
  feedback.classList.add('show');
  if (Math.abs(v - 25) < 0.1) {
    feedback.className = 'feedback show correct';
    feedback.textContent = '¡Correcto! 90 ÷ 3.6 = 25 m/s';
    addScore(15);
  } else {
    feedback.className = 'feedback show incorrect';
    feedback.textContent = '90 km/h ÷ 3.6 = 25 m/s';
  }
}

/* ===== 4.4 Graph description ===== */
function checkGraphDesc(btn, isCorrect) {
  const feedback = document.getElementById('graphDescFeedback');
  const buttons = btn.parentElement.querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);
  
  if (isCorrect) {
    btn.classList.add('correct');
    feedback.className = 'feedback show correct';
    feedback.textContent = '¡Correcto! Pendiente = (0−20)/(4−0) = −5 m/s → se acerca al origen a 5 m/s.';
    addScore(15);
  } else {
    btn.classList.add('wrong');
    feedback.className = 'feedback show incorrect';
    feedback.textContent = 'La línea baja de 20 m a 0 m en 4 s → velocidad = −5 m/s (hacia el origen).';
  }
  feedback.classList.add('show');
}

/* ===== 6.1 Caida sim ===== */
function runCaidaSim() {
  const h = parseFloat(document.getElementById('simH').value);
  const g = parseFloat(document.getElementById('simG').value);
  const result = document.getElementById('simResult');
  
  if (isNaN(h) || isNaN(g) || h < 0 || g <= 0) {
    result.classList.remove('hidden');
    result.textContent = 'Ingresa valores válidos.';
    return;
  }
  
  const t = Math.sqrt(2 * h / g);
  const v = g * t;
  
  result.classList.remove('hidden');
  result.innerHTML = `Tiempo de caída: <strong>${t.toFixed(2)} s</strong><br>Velocidad de impacto: <strong>${v.toFixed(2)} m/s</strong>`;
}

/* ===== 6.2 Final solution ===== */
function showFinalSolution() {
  const sol = document.getElementById('finalSolution');
  sol.classList.remove('hidden');
  sol.classList.add('show');
  sol.className = 'feedback show info';
  addScore(15);
}

/* ===== 6.3 Compare falls ===== */
function checkCompare(btn, isCorrect) {
  const feedback = document.getElementById('compareFeedback');
  const buttons = btn.parentElement.querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);
  
  if (isCorrect) {
    btn.classList.add('correct');
    feedback.className = 'feedback show correct';
    feedback.innerHTML = '¡Correcto! B tiene velocidad inicial hacia abajo, por eso llega antes. (Con g=10: A tarda √4 ≈ 2 s; B tarda menos).';
    addScore(20);
  } else {
    btn.classList.add('wrong');
    feedback.className = 'feedback show incorrect';
    feedback.textContent = 'B llega primero porque ya tiene velocidad inicial hacia abajo.';
  }
  feedback.classList.add('show');
}

/* ===== Initialize ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Chart inits when entering block 4
});
