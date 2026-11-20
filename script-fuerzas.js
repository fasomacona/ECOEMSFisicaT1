/* Tema 2 · Las fuerzas */

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
}
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

function calcResultante() {
  const f1 = parseFloat(document.getElementById('f1').value);
  const f2 = parseFloat(document.getElementById('f2').value);
  const box = document.getElementById('resResultado');
  if (isNaN(f1) || isNaN(f2)) {
    box.classList.remove('hidden');
    box.textContent = 'Ingresa valores válidos.';
    return;
  }
  const fr = f1 + f2;
  let dir = '';
  if (fr > 0) dir = 'hacia la derecha';
  else if (fr < 0) dir = 'hacia la izquierda';
  else dir = '(equilibrio)';
  box.classList.remove('hidden');
  box.innerHTML = `<strong>F<sub>R</sub> = ${fr} N</strong> ${dir}`;
}

function calcNewton2() {
  const m = parseFloat(document.getElementById('newtonM').value);
  const f = parseFloat(document.getElementById('newtonF').value);
  const box = document.getElementById('newton2Result');
  if (isNaN(m) || isNaN(f) || m <= 0) {
    box.classList.remove('hidden');
    box.textContent = 'Masa debe ser mayor que cero.';
    return;
  }
  const a = f / m;
  box.classList.remove('hidden');
  box.innerHTML = `a = F<sub>R</sub> / m = ${f} / ${m} = <strong>${a.toFixed(2)} m/s²</strong>`;
}

function calcPeso() {
  const m = parseFloat(document.getElementById('pesoM').value);
  const g = parseFloat(document.getElementById('pesoG').value);
  const box = document.getElementById('pesoResult');
  if (isNaN(m) || isNaN(g) || m < 0) {
    box.classList.remove('hidden');
    box.textContent = 'Ingresa valores válidos.';
    return;
  }
  const p = m * g;
  box.classList.remove('hidden');
  box.innerHTML = `P = m·g = ${m} × ${g} = <strong>${p.toFixed(1)} N</strong>`;
}

function calcEnergia() {
  const m = parseFloat(document.getElementById('enM').value);
  const v = parseFloat(document.getElementById('enV').value);
  const h = parseFloat(document.getElementById('enH').value);
  const g = parseFloat(document.getElementById('enG').value);
  const box = document.getElementById('enResult');
  if ([m, v, h, g].some(x => isNaN(x)) || m < 0) {
    box.classList.remove('hidden');
    box.textContent = 'Ingresa valores válidos.';
    return;
  }
  const ec = 0.5 * m * v * v;
  const ep = m * g * h;
  const em = ec + ep;
  box.classList.remove('hidden');
  box.innerHTML = `
    E<sub>c</sub> = ½·m·v² = <strong>${ec.toFixed(1)} J</strong><br>
    E<sub>p</sub> = m·g·h = <strong>${ep.toFixed(1)} J</strong><br>
    E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub> = <strong>${em.toFixed(1)} J</strong>
  `;
}

function checkFuerzaEx(num, correct) {
  const selected = document.querySelector(`input[name="ef${num}"]:checked`);
  const feedback = document.getElementById(`fef${num}`);
  if (!selected) {
    feedback.className = 'feedback incorrect';
    feedback.style.display = 'block';
    feedback.textContent = 'Selecciona una opción.';
    return;
  }
  feedback.style.display = 'block';
  if (selected.value === correct) {
    feedback.className = 'feedback correct';
    feedback.textContent = '✅ ¡Correcto!';
  } else {
    feedback.className = 'feedback incorrect';
    feedback.textContent = `❌ Incorrecto. La respuesta correcta es la opción ${correct.toUpperCase()}.`;
  }
}
