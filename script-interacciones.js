const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
}
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => navMenu && navMenu.classList.remove('open'));
});

function convertTemp() {
  const c = parseFloat(document.getElementById('tempC').value);
  const box = document.getElementById('tempResult');
  if (isNaN(c)) {
    box.classList.remove('hidden');
    box.textContent = 'Ingresa un número válido.';
    return;
  }
  const k = c + 273;
  box.classList.remove('hidden');
  box.innerHTML = `${c} °C = <strong>${k} K</strong> (aprox. K = °C + 273)`;
}

function calcPresion() {
  const f = parseFloat(document.getElementById('presF').value);
  const a = parseFloat(document.getElementById('presA').value);
  const box = document.getElementById('presResult');
  if (isNaN(f) || isNaN(a) || a <= 0) {
    box.classList.remove('hidden');
    box.textContent = 'Área debe ser mayor que cero.';
    return;
  }
  const p = f / a;
  box.classList.remove('hidden');
  box.innerHTML = `P = F/A = ${f}/${a} = <strong>${p.toFixed(2)} Pa</strong>`;
}

function calcHidraulico() {
  const f1 = parseFloat(document.getElementById('hidF1').value);
  const a1 = parseFloat(document.getElementById('hidA1').value);
  const a2 = parseFloat(document.getElementById('hidA2').value);
  const box = document.getElementById('hidResult');
  if ([f1, a1, a2].some(x => isNaN(x)) || a1 <= 0) {
    box.classList.remove('hidden');
    box.textContent = 'Ingresa valores válidos (A₁ > 0).';
    return;
  }
  const f2 = f1 * (a2 / a1);
  box.classList.remove('hidden');
  box.innerHTML = `F₂ = F₁ × (A₂/A₁) = ${f1} × (${a2}/${a1}) = <strong>${f2.toFixed(1)} N</strong>`;
}

function checkIntEx(num, correct) {
  const selected = document.querySelector(`input[name="ei${num}"]:checked`);
  const feedback = document.getElementById(`ief${num}`);
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
