const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createGoomba() {
  const goomba = document.createElement('div');
  let goombaPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  goomba.classList.add('goomba');
  background.appendChild(goomba);
  goomba.style.left = goombaPosition + 'px';

  let leftTimer = setInterval(() => {
    if (goombaPosition < -60) {
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (goombaPosition > 0 && goombaPosition < 60 && position < 60) {
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      goombaPosition -= 10;
      goomba.style.left = goombaPosition + 'px';
    }
  }, 20);

  setTimeout(createGoomba, randomTime);
}

createGoomba();
document.addEventListener('keyup', handleKeyUp);
