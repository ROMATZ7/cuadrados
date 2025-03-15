const pistasTexto = [
  (tesoro) => `El cofre ${tesoro + 1} tiene el tesoro.`,
  () => `El tesoro no está en el cofre 1.`,
  () => `El cofre 3 está vacío.`,
  (tesoro) => `El tesoro está en un número impar.`,
  () => `El cofre 5 está maldito.`,
  () => `Solo un cofre contiene algo.`,
  () => `Este cofre está mintiendo.`,
  (tesoro) => `No elijas el cofre ${tesoro === 8 ? 1 : 9}.`,
  (tesoro) => `Confía en el cofre ${tesoro + 2 > 9 ? 1 : tesoro + 2}.`
];

let tesoroIndex = 0;
let cofres = [];

function empezarJuego() {
  document.getElementById("instrucciones").style.display = "none";
  document.getElementById("juego").style.display = "block";
  document.getElementById("resultado").innerHTML = "";

  tesoroIndex = Math.floor(Math.random() * 9);
  cofres = [];

  const verdadera = Math.floor(Math.random() * 9);

  for (let i = 0; i < 9; i++) {
    const pista = pistasTexto[i % pistasTexto.length](tesoroIndex);
    cofres.push({
      texto: pista,
      verdadera: i === verdadera
    });
  }

  mostrarCofres();
}

function mostrarCofres() {
  const contenedor = document.getElementById("cofres");
  contenedor.innerHTML = "";

  cofres.forEach((cofre, i) => {
    const btn = document.createElement("button");
    btn.className = "cofre";
    btn.textContent = cofre.texto;
    btn.onclick = () => seleccionarCofre(i);
    contenedor.appendChild(btn);
  });
}

function seleccionarCofre(index) {
  if (index === tesoroIndex) {
    // ⭐ Pantalla completa de victoria
    document.body.innerHTML = `<div id="estrellaVictoria">🎁</div>`;
  } else {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `💥 Has fallado... El tesoro estaba en el cofre ${tesoroIndex + 1}`;
    document.querySelectorAll(".cofre").forEach(btn => btn.disabled = true);
  }
}
