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

document.querySelectorAll('#condItems .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('#condItems .chip').forEach(c => c.classList.remove('selected'));
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

function checkCond() {
  const fb = document.getElementById('condFb');
  let correct = 0, total = 0;
  document.querySelectorAll('#zoneCond .chip').forEach(c => { total++; if (c.dataset.type === 'conductor') correct++; });
  document.querySelectorAll('#zoneAis .chip').forEach(c => { total++; if (c.dataset.type === 'aislante') correct++; });
  fb.classList.add('show');
  if (correct === 6 && total === 6) {
    fb.className = 'feedback show correct';
    fb.textContent = '¡Perfecto!';
    addScore(15);
  } else if (total < 6) {
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Faltan materiales por clasificar.';
  } else {
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Revisa conductores vs aislantes.';
  }
}

function electronCheck(btn, ok) {
  const fb = document.getElementById('electronFb');
  btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
  fb.classList.add('show');
  if (ok) {
    btn.classList.add('correct');
    fb.className = 'feedback show correct';
    fb.textContent = '¡Correcto! En metales fluyen electrones.';
    addScore(10);
  } else {
    btn.classList.add('wrong');
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Los electrones son las cargas móviles en el cable.';
  }
}

function checkI() {
  const v = parseFloat(document.getElementById('iCalc').value);
  const fb = document.getElementById('iFb');
  fb.classList.add('show');
  if (v === 4) {
    fb.className = 'feedback show correct';
    fb.textContent = '✓ I = V/R = 24/6 = 4 A';
    addScore(15);
  } else {
    fb.className = 'feedback show incorrect';
    fb.textContent = 'I = 24 / 6 = 4 A';
  }
}

function serieCheck(btn, ok) {
  const fb = document.getElementById('serieFb');
  btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
  fb.classList.add('show');
  if (ok) {
    btn.classList.add('correct');
    fb.className = 'feedback show correct';
    fb.textContent = '¡Sí! En serie la corriente es la misma en todo el circuito.';
    addScore(10);
  } else {
    btn.classList.add('wrong');
    fb.className = 'feedback show incorrect';
    fb.textContent = 'En serie: misma I; el voltaje se reparte.';
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

function faradayCheck(btn, ok) {
  const fb = document.getElementById('faradayFb');
  btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
  fb.classList.add('show');
  if (ok) {
    btn.classList.add('correct');
    fb.className = 'feedback show correct';
    fb.textContent = '¡Correcto! Campo magnético variable → fem inducida.';
    addScore(10);
  } else {
    btn.classList.add('wrong');
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Hace falta que el flujo magnético cambie.';
  }
}

function checkVOnda() {
  const v = parseFloat(document.getElementById('vOnda').value);
  const fb = document.getElementById('vOndaFb');
  fb.classList.add('show');
  if (v === 100) {
    fb.className = 'feedback show correct';
    fb.textContent = '✓ v = 5 × 20 = 100 m/s';
    addScore(15);
  } else {
    fb.className = 'feedback show incorrect';
    fb.textContent = 'v = λ·f = 5 × 20 = 100 m/s';
  }
}

document.querySelectorAll('#luzMatch .match-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('#luzMatch .match-item').forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
    matchSelected = item;
  });
});
document.querySelectorAll('#luzMatch .match-target').forEach(target => {
  target.addEventListener('click', () => {
    if (!matchSelected) return;
    if (matchSelected.dataset.match === target.dataset.match) {
      matchSelected.classList.add('matched');
      target.classList.add('matched');
      matchSelected.classList.remove('selected');
      matchSelected = null;
      if (document.querySelectorAll('#luzMatch .match-item:not(.matched)').length === 0) {
        const fb = document.getElementById('luzMatchFb');
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

function prismaCheck(btn, ok) {
  const fb = document.getElementById('prismaFb');
  btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
  fb.classList.add('show');
  if (ok) {
    btn.classList.add('correct');
    fb.className = 'feedback show correct';
    fb.textContent = '¡Sí! El violeta se desvía más que el rojo.';
    addScore(10);
  } else {
    btn.classList.add('wrong');
    fb.className = 'feedback show incorrect';
    fb.textContent = 'El violeta es el que más se desvía.';
  }
}

function genCheck(btn, ok) {
  const fb = document.getElementById('genFb');
  btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
  fb.classList.add('show');
  if (ok) {
    btn.classList.add('correct');
    fb.className = 'feedback show correct';
    fb.textContent = '¡Exacto! Ambos se basan en la inducción electromagnética.';
    addScore(15);
  } else {
    btn.classList.add('wrong');
    fb.className = 'feedback show incorrect';
    fb.textContent = 'Generadores y transformadores usan inducción.';
  }
}
