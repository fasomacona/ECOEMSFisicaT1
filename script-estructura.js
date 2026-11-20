const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
}
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => navMenu && navMenu.classList.remove('open'));
});

function calcOhm() {
  const v = parseFloat(document.getElementById('ohmV').value);
  const r = parseFloat(document.getElementById('ohmR').value);
  const box = document.getElementById('ohmResult');
  if (isNaN(v) || isNaN(r) || r <= 0) {
    box.classList.remove('hidden');
    box.textContent = 'R debe ser mayor que cero.';
    return;
  }
  const i = v / r;
  box.classList.remove('hidden');
  box.innerHTML = `I = V/R = ${v}/${r} = <strong>${i.toFixed(2)} A</strong>`;
}

function calcOnda() {
  const l = parseFloat(document.getElementById('ondaL').value);
  const f = parseFloat(document.getElementById('ondaF').value);
  const box = document.getElementById('ondaResult');
  if (isNaN(l) || isNaN(f)) {
    box.classList.remove('hidden');
    box.textContent = 'Ingresa valores válidos.';
    return;
  }
  const v = l * f;
  box.classList.remove('hidden');
  box.innerHTML = `v = λ·f = ${l} × ${f} = <strong>${v.toFixed(2)} m/s</strong>`;
}

function checkEstEx(num, correct) {
  const selected = document.querySelector(`input[name="ee${num}"]:checked`);
  const feedback = document.getElementById(`eef${num}`);
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
