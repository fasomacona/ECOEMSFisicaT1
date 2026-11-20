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

document.querySelectorAll('#stateItems .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('#stateItems .chip').forEach(c => c.classList.remove('selected'));
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

function checkStates() {
  const fb = document.getElementById('statesFb');
  let correct = 0, total = 0;
  ['solido', 'liquido', 'gas'].forEach(type => {
    const zone = document.querySelector(`#zone${type.charAt(0).toUpperCase() + type.slice(1)} .dropped, #zone${type === 'solido' ? 'Solido' : type === 'liquido' ? 'Liquido' : 'Gas'} .dropped`);
  });
  document.querySelectorAll('#zoneSolido .chip').forEach(c => { total++; if (c.dataset.type === 'solido') correct++; });
  document.querySelectorAll('#zoneLiquido .chip').forEach(c => { total++; if (c.dataset.type === 'liquido') correct++; });
  document.querySelectorAll('#zoneGas .chip').forEach(c => { total++; if (c.dataset.type === 'gas') correct++; });
  fb.classList.add('show');
  if (correct === 6 && total === 6) {
    fb.className = 'feedback show correct';
    fb.textContent = '¡Perfecto!';
    addScore(15);
  } else if (total < 6) {
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Faltan descripciones por clasificar.';
  } else {
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Revisa sólido / líquido / gas.';
  }
}

function tempPart(btn, ok) {
  const fb = document.getElementById('tempPartFb');
  btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
  fb.classList.add('show');
  if (ok) {
    btn.classList.add('correct');
    fb.className = 'feedback show correct';
    fb.textContent = '¡Correcto! Mayor temperatura → mayor rapidez promedio.';
    addScore(10);
  } else {
    btn.classList.add('wrong');
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Las partículas se mueven más rápido.';
  }
}

function answerTF(btn) {
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

document.querySelectorAll('#heatMatch .match-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('#heatMatch .match-item').forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
    matchSelected = item;
  });
});
document.querySelectorAll('#heatMatch .match-target').forEach(target => {
  target.addEventListener('click', () => {
    if (!matchSelected) return;
    if (matchSelected.dataset.match === target.dataset.match) {
      matchSelected.classList.add('matched');
      target.classList.add('matched');
      matchSelected.classList.remove('selected');
      matchSelected = null;
      if (document.querySelectorAll('#heatMatch .match-item:not(.matched)').length === 0) {
        const fb = document.getElementById('heatMatchFb');
        fb.className = 'feedback show correct';
        fb.textContent = '¡Todas correctas!';
        addScore(15);
      }
    } else {
      target.style.borderColor = '#ef4444';
      setTimeout(() => { target.style.borderColor = ''; }, 500);
    }
  });
});

function checkKelvin() {
  const v = parseFloat(document.getElementById('kelvinIn').value);
  const fb = document.getElementById('kelvinFb');
  fb.classList.add('show');
  if (v === 310) {
    fb.className = 'feedback show correct';
    fb.textContent = '✓ 37 + 273 = 310 K';
    addScore(10);
  } else {
    fb.className = 'feedback show incorrect';
    fb.textContent = 'K ≈ °C + 273 → 37 + 273 = 310 K';
  }
}

function checkP() {
  const v = parseFloat(document.getElementById('pCalc').value);
  const fb = document.getElementById('pFb');
  fb.classList.add('show');
  if (Math.abs(v - 500) < 0.1) {
    fb.className = 'feedback show correct';
    fb.textContent = '✓ P = 150 / 0.3 = 500 Pa';
    addScore(15);
  } else {
    fb.className = 'feedback show incorrect';
    fb.textContent = 'P = F/A = 150 / 0.3 = 500 Pa';
  }
}

function knifeCheck(btn, ok) {
  const fb = document.getElementById('knifeFb');
  btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
  fb.classList.add('show');
  if (ok) {
    btn.classList.add('correct');
    fb.className = 'feedback show correct';
    fb.textContent = '¡Sí! Misma fuerza, menor área → mayor presión.';
    addScore(10);
  } else {
    btn.classList.add('wrong');
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Piensa en P = F/A.';
  }
}

function checkF2() {
  const v = parseFloat(document.getElementById('f2Calc').value);
  const fb = document.getElementById('f2Fb');
  fb.classList.add('show');
  // 20 * (0.2/0.02) = 200
  if (v === 200) {
    fb.className = 'feedback show correct';
    fb.textContent = '✓ F₂ = 20 × (0.2/0.02) = 200 N';
    addScore(15);
  } else {
    fb.className = 'feedback show incorrect';
    fb.textContent = 'F₂ = F₁ × (A₂/A₁) = 20 × 10 = 200 N';
  }
}

function pascalCheck(btn, ok) {
  const fb = document.getElementById('pascalFb');
  btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
  fb.classList.add('show');
  if (ok) {
    btn.classList.add('correct');
    fb.className = 'feedback show correct';
    fb.textContent = '¡Correcto! Ese es el principio de Pascal.';
    addScore(10);
  } else {
    btn.classList.add('wrong');
    fb.className = 'feedback show incorrect';
    fb.textContent = 'La presión se transmite íntegramente en todas direcciones.';
  }
}

function gasCheck(btn, ok) {
  const fb = document.getElementById('gasFb');
  btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
  fb.classList.add('show');
  if (ok) {
    btn.classList.add('correct');
    fb.className = 'feedback show correct';
    fb.textContent = '¡Exacto! Más rapidez → más choques → más presión.';
    addScore(15);
  } else {
    btn.classList.add('wrong');
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Relaciona temperatura con movimiento de partículas y presión.';
  }
}
