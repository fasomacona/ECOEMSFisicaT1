/* ===== Navigation mobile ===== */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

/* ===== Sistema de referencia interactivo ===== */
const refMessages = {
  suelo: 'El pasajero del autobús <strong>se mueve</strong> a la velocidad del autobús respecto al suelo.',
  autobus: 'El pasajero está <strong>en reposo</strong> respecto al autobús (y a los otros pasajeros).',
  luna: 'Tanto el pasajero como el autobús y el suelo de la Tierra se mueven a gran velocidad respecto a la Luna.'
};

document.querySelectorAll('.ref-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ref-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const ref = btn.dataset.ref;
    document.getElementById('refResult').innerHTML = refMessages[ref];
  });
});

/* ===== Pitágoras explicación ===== */
function mostrarPitagoras() {
  const box = document.getElementById('pitagorasExplicacion');
  box.classList.remove('hidden');
  box.innerHTML = `
    <strong>Paso a paso:</strong><br>
    1. Caminas 30 m al este y 40 m al norte → formas un triángulo rectángulo.<br>
    2. Los catetos miden 30 m y 40 m.<br>
    3. La hipotenusa (desplazamiento) = \(\\sqrt{30^2 + 40^2} = \\sqrt{900 + 1600} = \\sqrt{2500} = 50\) m.<br>
    4. Distancia total = 30 + 40 = 70 m (mayor que el desplazamiento).
  `;
  // Re-render math if needed
  if (window.renderMathInElement) {
    renderMathInElement(box, { delimiters: [{left: '\\(', right: '\\)', display: false}, {left: '\\[', right: '\\]', display: true}], throwOnError: false });
  }
}

/* ===== Calculadora rapidez / velocidad ===== */
function calcularRapidezVelocidad() {
  const d = parseFloat(document.getElementById('calcDist').value);
  const desp = parseFloat(document.getElementById('calcDesp').value);
  const t = parseFloat(document.getElementById('calcTiempo').value);
  const result = document.getElementById('calcResultado');

  if (isNaN(d) || isNaN(desp) || isNaN(t) || t <= 0) {
    result.classList.remove('hidden');
    result.innerHTML = 'Por favor ingresa valores válidos (el tiempo debe ser mayor que cero).';
    return;
  }

  const rapidez = d / t;
  const velocidad = desp / t;

  result.classList.remove('hidden');
  result.innerHTML = `
    <strong>Resultados:</strong><br>
    • Rapidez media = ${d} m ÷ ${t} s = <strong>${rapidez.toFixed(2)} m/s</strong><br>
    • Velocidad media (magnitud) = ${desp} m ÷ ${t} s = <strong>${velocidad.toFixed(2)} m/s</strong><br>
    <small>Recuerda: la velocidad es un vector; aquí solo mostramos su magnitud.</small>
  `;
}

/* ===== Gráfica posición-tiempo ===== */
let chartInstance = null;

const graphData = {
  reposo: {
    labels: [0, 1, 2, 3, 4, 5],
    data: [10, 10, 10, 10, 10, 10],
    explanation: 'El objeto permanece en la misma posición. Pendiente = 0 → velocidad = 0 (reposo).'
  },
  mru: {
    labels: [0, 1, 2, 3, 4, 5],
    data: [0, 4, 8, 12, 16, 20],
    explanation: 'Línea recta con pendiente positiva constante → Movimiento Rectilíneo Uniforme (MRU). Velocidad constante = 4 m/s.'
  },
  acelerado: {
    labels: [0, 1, 2, 3, 4, 5],
    data: [0, 1, 4, 9, 16, 25],
    explanation: 'Curva hacia arriba (parábola). La pendiente aumenta → el objeto acelera (velocidad cada vez mayor).'
  },
  desacelerado: {
    labels: [0, 1, 2, 3, 4, 5],
    data: [0, 9, 16, 21, 24, 25],
    explanation: 'Curva que se “aplana”. La pendiente disminuye → el objeto desacelera (velocidad cada vez menor).'
  },
  vuelta: {
    labels: [0, 1, 2, 3, 4, 5, 6],
    data: [0, 5, 10, 15, 10, 5, 0],
    explanation: 'Sube y luego baja. Primero se aleja del origen (pendiente positiva) y después regresa (pendiente negativa). Desplazamiento final = 0.'
  }
};

function createChart(type = 'reposo') {
  const ctx = document.getElementById('posicionChart');
  if (!ctx) return;

  const config = graphData[type];

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: config.labels,
      datasets: [{
        label: 'Posición (m)',
        data: config.data,
        borderColor: '#1e40af',
        backgroundColor: 'rgba(30, 64, 175, 0.1)',
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: '#3b82f6',
        tension: type === 'acelerado' || type === 'desacelerado' ? 0.3 : 0,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          title: { display: true, text: 'Tiempo (s)', font: { weight: 'bold' } },
          grid: { color: '#e2e8f0' }
        },
        y: {
          title: { display: true, text: 'Posición (m)', font: { weight: 'bold' } },
          grid: { color: '#e2e8f0' }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `Posición: ${ctx.raw} m`
          }
        }
      }
    }
  });

  document.getElementById('graphExplanation').textContent = config.explanation;
}

// Graph buttons
document.querySelectorAll('.graph-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.graph-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    createChart(btn.dataset.type);
  });
});

// Initialize chart on load
document.addEventListener('DOMContentLoaded', () => {
  createChart('reposo');
});

/* ===== Calculadora MRUA ===== */
function calcularMRUA() {
  const vi = parseFloat(document.getElementById('mruaVi').value);
  const a = parseFloat(document.getElementById('mruaA').value);
  const t = parseFloat(document.getElementById('mruaT').value);
  const result = document.getElementById('mruaResultado');

  if (isNaN(vi) || isNaN(a) || isNaN(t) || t < 0) {
    result.classList.remove('hidden');
    result.innerHTML = 'Ingresa valores válidos.';
    return;
  }

  const vf = vi + a * t;
  const x = vi * t + 0.5 * a * t * t;

  result.classList.remove('hidden');
  result.innerHTML = `
    <strong>Resultados del MRUA:</strong><br>
    • Velocidad final \(v_f\) = ${vi} + (${a})(${t}) = <strong>${vf.toFixed(2)} m/s</strong><br>
    • Desplazamiento \(x\) = ${vi}·${t} + ½·${a}·(${t})² = <strong>${x.toFixed(2)} m</strong>
  `;
  if (window.renderMathInElement) {
    renderMathInElement(result, { delimiters: [{left: '\\(', right: '\\)', display: false}], throwOnError: false });
  }
}

/* ===== Calculadora caída libre ===== */
function calcularCaidaLibre() {
  const h = parseFloat(document.getElementById('caidaH').value);
  const g = parseFloat(document.getElementById('caidaG').value);
  const result = document.getElementById('caidaResultado');

  if (isNaN(h) || isNaN(g) || h < 0 || g <= 0) {
    result.classList.remove('hidden');
    result.innerHTML = 'Ingresa una altura y un valor de g válidos.';
    return;
  }

  const t = Math.sqrt((2 * h) / g);
  const v = g * t;

  result.classList.remove('hidden');
  result.innerHTML = `
    <strong>Resultados de caída libre (desde el reposo):</strong><br>
    • Tiempo de caída \(t = \\sqrt{\\frac{2h}{g}}\) = <strong>${t.toFixed(2)} s</strong><br>
    • Velocidad al llegar al suelo \(v = gt\) = <strong>${v.toFixed(2)} m/s</strong><br>
    <small>También puedes usar \(v = \\sqrt{2gh}\)</small>
  `;
  if (window.renderMathInElement) {
    renderMathInElement(result, { delimiters: [{left: '\\(', right: '\\)', display: false}], throwOnError: false });
  }
}

/* ===== Ejercicios de opción múltiple ===== */
function checkExercise(num, correct) {
  const selected = document.querySelector(`input[name="ex${num}"]:checked`);
  const feedback = document.getElementById(`feedback${num}`);

  if (!selected) {
    feedback.className = 'feedback incorrect';
    feedback.textContent = 'Selecciona una opción antes de verificar.';
    return;
  }

  if (selected.value === correct) {
    feedback.className = 'feedback correct';
    feedback.innerHTML = '✅ ¡Correcto! Muy bien.';
  } else {
    feedback.className = 'feedback incorrect';
    feedback.innerHTML = `❌ Incorrecto. La respuesta correcta es la opción <strong>${correct.toUpperCase()}</strong>.`;
  }
}

/* ===== Solución ejercicio abierto ===== */
function showOpenSolution() {
  const sol = document.getElementById('openSolution');
  sol.classList.remove('hidden');
}
