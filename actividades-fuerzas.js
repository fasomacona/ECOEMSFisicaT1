let totalScore = 0;
let selectedChip = null;
let matchSelected = null;

document.querySelectorAll('.block-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const n = btn.dataset.block;
    document.querySelectorAll('.block-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.block').forEach(b => b.classList.remove('active'));
    document.getElementById('block-' + n).classList.add('active');
    document.getElementById('currentBlock').textContent = 'Bloque ' + n;
    document.getElementById('progressFill').style.width = (parseInt(n) / 5 * 100) + '%';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

function addScore(p) {
  totalScore += p;
  document.getElementById('totalScore').textContent = totalScore;
}

/* Classification */
document.querySelectorAll('#forceItems .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('#forceItems .chip').forEach(c => c.classList.remove('selected'));
    chip.classList.add('selected');
    selectedChip = chip;
  });
});
document.querySelectorAll('.drop-zone').forEach(zone => {
  zone.addEventListener('click', () => {
    if (!selectedChip || selectedChip.classList.contains('placed')) return;
    const clone = selectedChip.cloneNode(true);
    clone.classList.remove('selected');
    zone.querySelector('.dropped').appendChild(clone);
    selectedChip.classList.add('placed');
    selectedChip.classList.remove('selected');
    selectedChip = null;
  });
});

function checkForceClass() {
  const fb = document.getElementById('forceClassFb');
  let correct = 0, total = 0;
  document.querySelectorAll('#zoneContacto .chip').forEach(c => { total++; if (c.dataset.type === 'contacto') correct++; });
  document.querySelectorAll('#zoneDistancia .chip').forEach(c => { total++; if (c.dataset.type === 'distancia') correct++; });
  fb.classList.add('show');
  if (correct === 7 && total === 7) {
    fb.className = 'feedback show correct';
    fb.textContent = '¡Perfecto! Todas bien clasificadas.';
    addScore(15);
  } else if (total < 7) {
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Aún faltan fuerzas por clasificar.';
  } else {
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Hay errores. Revisa contacto vs a distancia.';
  }
}

function answerTF(btn, isCorrectAnswer) {
  const item = btn.closest('.tf-item');
  const explain = item.querySelector('.tf-explain');
  item.querySelectorAll('.tf-btns button').forEach(b => b.disabled = true);
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

function checkFR() {
  const v = parseFloat(document.getElementById('frCalc').value);
  const fb = document.getElementById('frFb');
  fb.classList.add('show');
  // 45 - 20 + 10 = 35
  if (v === 35) {
    fb.className = 'feedback show correct';
    fb.textContent = '✓ F_R = 45 − 20 + 10 = 35 N a la derecha';
    addScore(15);
  } else {
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Suma algebraica: 45 − 20 + 10 = 35 N (derecha)';
  }
}

function eqCheck(btn, ok) {
  document.querySelectorAll('#eqFb').forEach(() => {});
  const fb = document.getElementById('eqFb');
  btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
  fb.classList.add('show');
  if (ok) {
    btn.classList.add('correct');
    fb.className = 'feedback show correct';
    fb.textContent = '¡Correcto! Equilibrio cuando F_R = 0 (reposo o MRU).';
    addScore(10);
  } else {
    btn.classList.add('wrong');
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Equilibrio = fuerza neta cero.';
  }
}

/* Matching Newton */
document.querySelectorAll('#newtonMatch .match-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('#newtonMatch .match-item').forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
    matchSelected = item;
  });
});
document.querySelectorAll('#newtonMatch .match-target').forEach(target => {
  target.addEventListener('click', () => {
    if (!matchSelected) return;
    if (matchSelected.dataset.match === target.dataset.match) {
      matchSelected.classList.add('matched');
      target.classList.add('matched');
      matchSelected.classList.remove('selected');
      matchSelected = null;
      if (document.querySelectorAll('#newtonMatch .match-item:not(.matched)').length === 0) {
        const fb = document.getElementById('newtonMatchFb');
        fb.className = 'feedback show correct';
        fb.textContent = '¡Todas las leyes emparejadas!';
        addScore(15);
      }
    } else {
      target.style.borderColor = '#ef4444';
      setTimeout(() => target.style.borderColor = '', 500);
    }
  });
});

function checkA() {
  const v = parseFloat(document.getElementById('aCalc').value);
  const fb = document.getElementById('aFb');
  fb.classList.add('show');
  if (v === 5) {
    fb.className = 'feedback show correct';
    fb.textContent = '✓ a = F/m = 80/16 = 5 m/s²';
    addScore(15);
  } else {
    fb.className = 'feedback show incorrect';
    fb.textContent = 'a = F_R / m = 80 / 16 = 5 m/s²';
  }
}

function swimCheck(btn, ok) {
  const fb = document.getElementById('swimFb');
  btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
  fb.classList.add('show');
  if (ok) {
    btn.classList.add('correct');
    fb.className = 'feedback show correct';
    fb.textContent = '¡Sí! 3ª ley: el agua reacciona empujándote hacia adelante.';
    addScore(10);
  } else {
    btn.classList.add('wrong');
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Acción-reacción: el agua te empuja en sentido contrario.';
  }
}

function checkPesoAct() {
  const v = parseFloat(document.getElementById('pesoCalc').value);
  const fb = document.getElementById('pesoActFb');
  fb.classList.add('show');
  if (Math.abs(v - 686) < 0.5) {
    fb.className = 'feedback show correct';
    fb.textContent = '✓ P = 70 × 9.8 = 686 N';
    addScore(15);
  } else {
    fb.className = 'feedback show incorrect';
    fb.textContent = 'P = m·g = 70 × 9.8 = 686 N';
  }
}

function masaPeso(btn, ok) {
  const fb = document.getElementById('mpFb');
  btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
  fb.classList.add('show');
  if (ok) {
    btn.classList.add('correct');
    fb.className = 'feedback show correct';
    fb.textContent = '¡Correcto! La masa no cambia; el peso sí (g es menor en la Luna).';
    addScore(10);
  } else {
    btn.classList.add('wrong');
    fb.className = 'feedback show incorrect';
    fb.textContent = 'La masa es la misma; el peso depende de g.';
  }
}

function checkEc() {
  const v = parseFloat(document.getElementById('ecCalc').value);
  const fb = document.getElementById('ecFb');
  fb.classList.add('show');
  // 0.5 * 4 * 25 = 50
  if (v === 50) {
    fb.className = 'feedback show correct';
    fb.textContent = '✓ E_c = ½·4·5² = 50 J';
    addScore(15);
  } else {
    fb.className = 'feedback show incorrect';
    fb.textContent = 'E_c = ½·m·v² = ½·4·25 = 50 J';
  }
}

function energyCheck(btn, ok) {
  const fb = document.getElementById('energyFb');
  btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
  fb.classList.add('show');
  if (ok) {
    btn.classList.add('correct');
    fb.className = 'feedback show correct';
    fb.textContent = '¡Exacto! La energía se transforma pero E_m se conserva (sin fricción).';
    addScore(15);
  } else {
    btn.classList.add('wrong');
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Sin fricción, E_m = E_c + E_p se mantiene constante.';
  }
}
