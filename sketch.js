// Variáveis globais
let chickens = []; // Array para armazenar as galinhas
let numChickens = 5; // Número inicial de galinhas
let score = 0; // Pontuação do jogador
let gameTimer = 30; // Tempo de jogo em segundos
let gameStarted = false; // Flag para controlar se o jogo começou
let gameOver = false; // Flag para controlar se o jogo terminou

let timerInterval; // Variável para armazenar o intervalo do temporizador

function setup() {
  createCanvas(800, 600); // Cria uma tela maior para o jogo
  textAlign(CENTER, CENTER); // Alinha o texto ao centro para a tela de início/fim
  resetGame(); // Chama a função para configurar o jogo no início
}

function draw() {
  background(135, 206, 235); // Céu azul claro como fundo

  if (!gameStarted) {
    // Tela de início
    fill(0);
    textSize(40);
    text("Jogo de Capturar Galinhas", width / 2, height / 2 - 50);
    textSize(20);
    text("Clique para começar!", width / 2, height / 2 + 20);
  } else if (gameOver) {
    // Tela de fim de jogo
    fill(0);
    textSize(40);
    text("FIM DE JOGO!", width / 2, height / 2 - 50);
    textSize(30);
    text("Sua Pontuação: " + score, width / 2, height / 2 + 10);
    textSize(20);
    text("Clique para jogar novamente!", width / 2, height / 2 + 60);
  } else {
    // Jogo em andamento
    // Desenha e atualiza cada galinha
    for (let i = 0; i < chickens.length; i++) {
      chickens[i].move();
      chickens[i].display();
    }

    // Desenha a pontuação e o tempo
    fill(0); // Cor preta para o texto
    textSize(24);
    text("Galinhas Capturadas: " + score, 150, 30);
    text("Tempo: " + gameTimer, width - 100, 30);

    // Se todas as galinhas foram capturadas, adicione mais
    if (chickens.length === 0) {
      fill(0, 100); // Fundo semi-transparente para a mensagem
      rect(width / 2 - 200, height / 2 - 30, 400, 60);
      fill(255); // Texto branco
      textSize(20);
      text("Todas as galinhas capturadas! Gerando mais...", width / 2, height / 2);
      // Adiciona um pequeno atraso antes de gerar novas galinhas
      if (frameCount % 60 === 0) { // A cada 1 segundo (60 frames/seg)
        numChickens += 2; // Aumenta o número de galinhas
        for (let i = 0; i < numChickens; i++) {
          chickens.push(new Chicken());
        }
      }
    }
  }
}

// Função para lidar com cliques do mouse
function mousePressed() {
  if (!gameStarted && !gameOver) {
    // Inicia o jogo
    gameStarted = true;
    startTimer();
  } else if (gameOver) {
    // Reinicia o jogo
    resetGame();
    gameStarted = true;
    gameOver = false;
    startTimer();
  } else if (gameStarted && !gameOver) {
    // Lógica de captura de galinhas
    for (let i = chickens.length - 1; i >= 0; i--) {
      if (dist(mouseX, mouseY, chickens[i].x, chickens[i].y) < chickens[i].size / 2) {
        chickens.splice(i, 1);
        score++;
      }
    }
  }
}

// Função para iniciar o temporizador
function startTimer() {
  // Limpa qualquer temporizador anterior para evitar múltiplos
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  gameTimer = 30; // Reinicia o tempo
  timerInterval = setInterval(() => {
    gameTimer--;
    if (gameTimer <= 0) {
      clearInterval(timerInterval); // Para o temporizador
      gameOver = true; // Define o estado de fim de jogo
    }
  }, 1000); // Decrementa a cada 1 segundo (1000 milissegundos)
}

// Função para resetar o jogo
function resetGame() {
  chickens = [];
  score = 0;
  numChickens = 5;
  gameTimer = 30;
  gameOver = false;
  gameStarted = false; // Volta para a tela de início
  if (timerInterval) {
    clearInterval(timerInterval); // Garante que o temporizador seja parado
  }
  // Inicializa as galinhas para a próxima rodada (elas só aparecerão quando o jogo começar)
  for (let i = 0; i < numChickens; i++) {
    chickens.push(new Chicken());
  }
}

// Classe para representar uma galinha (a mesma do exemplo anterior)
class Chicken {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = 40;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.color = color(255, 255, 0); // Amarelo
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }
  }

  display() {
    noStroke();

    // Corpo
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);

    // Cabeça
    fill(255);
    ellipse(this.x + this.size / 2 - 5, this.y - this.size / 2 + 5, this.size / 3, this.size / 3);

    // Bico
    fill(255, 165, 0);
    triangle(
      this.x + this.size / 2 + 5, this.y - this.size / 2 + 5,
      this.x + this.size / 2 + 15, this.y - this.size / 2,
      this.x + this.size / 2 + 5, this.y - this.size / 2 - 5
    );

    // Olho
    fill(0);
    ellipse(this.x + this.size / 2 + 2, this.y - this.size / 2 + 2, this.size / 8, this.size / 8);
  }
}
 