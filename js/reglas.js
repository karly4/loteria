// Generar todas las operaciones posibles
const operaciones = [];
for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
    operaciones.push({ op: `${i} × ${j}`, resultado: i * j });
  }
}

let boards = { grid1: [], grid2: [] };
let history = [];
let currentOp = null;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function newGame() {
  createBoard("grid1", configJugador1);
  createBoard("grid2", configJugador2);
  document.getElementById("drawn").textContent = "Operación sorteada: -";
  history = [];
  document.getElementById("historyList").innerHTML = "";
  document.getElementById("counter").textContent = "0";
  currentOp = null;
}

function createBoard(id, config) {
  const grid = document.getElementById(id);
  grid.innerHTML = "";
  boards[id] = shuffle([...new Set(operaciones.map(o => o.resultado))]).slice(0, 16);
  boards[id].forEach(function(num, index) {
    const cell = document.createElement("div");
    let k = 0;
    cell.className = "cell";
    const figura = config.figurasBase[index];
    cell.innerHTML = ""; // limpiar
    for (k = 0; k <num; k++) {
    const icon = document.createElement("span");
    icon.textContent = figura;
    cell.appendChild(icon);
   
    }
     if(num==k){
      const result = document.createElement("span");
      result.textContent=num;
      cell.appendChild(result);
    }
    cell.onclick = () => {
      if (currentOp && num === currentOp.resultado) {
        cell.classList.add("marked");
        cell.style.background = config.colorMarcado;
        checkWin(id);
      } else {
        alert("Esa casilla no corresponde a la operación actual.");
      }
    };
    grid.appendChild(cell);
  });
}

function drawOperation() {
  currentOp = operaciones[Math.floor(Math.random() * operaciones.length)];
if(!history.includes(currentOp.op)){
  document.getElementById("drawn").textContent = "Operación sorteada: " + currentOp.op;
  history.push(currentOp.op);
  const li = document.createElement("li");
  li.textContent = currentOp.op +"="+ currentOp.resultado;
  document.getElementById("historyList").appendChild(li);
  document.getElementById("counter").textContent = history.length;
}
}

function checkWin(boardId) {
  const rule = document.getElementById("rule").value;
  const cells = document.getElementById(boardId).children;
  const marked = Array.from(cells).map(c => c.classList.contains("marked"));

  let win = false;

  if (rule === "fila") {
    for (let r = 0; r < 4; r++) {
      if (marked.slice(r * 4, r * 4 + 4).every(m => m)) win = true;
    }
  } else if (rule === "columna") {
    for (let c = 0; c < 4; c++) {
      if ([0, 1, 2, 3].map(r => marked[r * 4 + c]).every(m => m)) win = true;
    }
  } else if (rule === "diagonal") {
    if ([0, 5, 10, 15].map(i => marked[i]).every(m => m)) win = true;
    if ([3, 6, 9, 12].map(i => marked[i]).every(m => m)) win = true;
  } else if (rule === "tablero") {
    if (marked.every(m => m)) win = true;
  }

  if (win) {
    alert("¡Lotería para " + boardId + " con regla: " + rule + "!");
  }
}

// Inicializar juego
newGame();
