window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".preloader").style.opacity = "0";
    setTimeout(() => {
      document.querySelector(".preloader").style.display = "none";
    }, 300);
  }, Math.random() * 500 + 500);
});

function toggleTheme() {
  const body = document.body;
  const themeBtn = document.querySelector(".theme-btn");

  body.style.transition = "background-color 0.3s ease, color 0.3s ease";
  body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";

  themeBtn.style.transform = "scale(0.95)";
  setTimeout(() => {
    themeBtn.style.transform = "scale(1)";
  }, 100);

  themeBtn.textContent =
    body.dataset.theme === "dark" ? "🌞 Chế độ sáng" : "🌓 Chế độ tối";

  localStorage.setItem("theme", body.dataset.theme);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.dataset.theme = savedTheme;
  document.querySelector(".theme-btn").textContent =
    savedTheme === "dark" ? "🌞 Chế độ sáng" : "🌓 Chế độ tối";
}

let gameActive = false;
let startTime;
let bestTime = localStorage.getItem("bestTime") || Infinity;
let gameTimeout;

function startGame() {
  const button = document.querySelector(".game-button");
  const scoreDisplay = document.getElementById("game-score");

  if (!gameActive) {
    gameActive = true;
    button.style.background = "#ef4444";
    button.textContent = "Đợi màu xanh...";
    button.style.transform = "scale(1)";
    scoreDisplay.textContent = "";

    clearTimeout(gameTimeout);
    gameTimeout = setTimeout(() => {
      button.style.background = "#22c55e";
      button.textContent = "NHẤN NGAY!";
      startTime = Date.now();
    }, Math.random() * 3000 + 1000);
  } else {
    if (button.style.background === "rgb(34, 197, 94)") {
      const reactionTime = Date.now() - startTime;

      if (reactionTime < bestTime) {
        bestTime = reactionTime;
        localStorage.setItem("bestTime", bestTime);
        scoreDisplay.innerHTML = `
                  <p style="color: var(--success-color); font-weight: 600; margin-bottom: 0.5rem">
                    🎉 KỶ LỤC MỚI! 🎉
                  </p>
                  <p>Thời gian phản ứng: ${reactionTime}ms</p>
                  <p style="font-size: 0.9rem; opacity: 0.8">Kỷ lục tốt nhất: ${bestTime}ms</p>
                `;
      } else {
        scoreDisplay.innerHTML = `
                  <p>Thời gian phản ứng: ${reactionTime}ms</p>
                  <p style="font-size: 0.9rem; opacity: 0.8">Kỷ lục tốt nhất: ${bestTime}ms</p>
                `;
      }
    } else {
      scoreDisplay.textContent = "Quá sớm! Hãy đợi màu xanh 😅";
      clearTimeout(gameTimeout);
    }

    button.style.background = "var(--gradient-1)";
    button.textContent = "Thử lại";
    gameActive = false;
  }
}

document.querySelectorAll(".nav-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;

    card.style.transform = `
              perspective(1000px)
              rotateX(${angleX}deg)
              rotateY(${angleY}deg)
              translateY(-10px)
            `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    setTimeout(() => {
      card.style.transform = "";
    }, 300);
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".nav-card, .mini-game").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
  observer.observe(el);
});

function checkPasswordTopic() {
  const correctPasswordTopic = "999999";

  const userPasswordTopic = prompt("Vui lòng nhập mật khẩu:");
  if (userPasswordTopic === correctPasswordTopic) {
    window.open("topic.html", "_blank");
  } else if (userPasswordTopic === "") {
    alert("Vui lòng nhập mật khẩu");
  } else {
    alert("Sai mật khẩu. Vui lòng thử lại!");
  }
}

function checkPasswordMusic() {
  const correctPasswordMusic = "music1689";

  const userPasswordMusic = prompt("Vui lòng nhập mật khẩu:");
  if (userPasswordMusic === correctPasswordMusic) {
    window.open("song.html", "_blank");
  } else {
    alert("Sai mật khẩu. Vui lòng thử lại!");
  }
}
function checkPasswordCavoi() {
  const correctPasswordCavoi = "3.cavoi";

  const userPasswordCavoi = prompt("Vui lòng nhập mật khẩu:");
  if (userPasswordCavoi === correctPasswordCavoi) {
    window.open("cavoi.html", "_blank");
  } else {
    alert("Sai mật khẩu. Vui lòng thử lại!");
  }
}

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let gameOver = false;

function checkGuess() {
  if (gameOver) return;

  let userGuess = parseInt(document.getElementById("userGuess").value);
  let message = document.getElementById("message");
  let attemptsDisplay = document.getElementById("attempts");

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    message.innerText = "Vui lòng nhập số hợp lệ từ 1 đến 100!";
    message.style.color = "var(--gradient-2)";
    return;
  }

  attempts++;
  attemptsDisplay.innerText = attempts;

  if (userGuess > randomNumber) {
    message.innerText = "⬇ Nhập số bé hơn!";
    message.style.color = "var(--primary-color)";
  } else if (userGuess < randomNumber) {
    message.innerText = "⬆ Nhập số lớn hơn!";
    message.style.color = "var(--primary-color)";
  } else {
    message.innerText = `🎉 Chúc mừng! Bạn đã đoán đúng sau ${attempts} lần!`;
    message.style.color = "var(--success-color)";
    gameOver = true;
    document.getElementById("userGuess").disabled = true;
    document.getElementById("resetButton").style.display = "inline-block";
  }
}

function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  gameOver = false;
  document.getElementById("attempts").innerText = attempts;
  document.getElementById("message").innerText = "";
  document.getElementById("userGuess").value = "";
  document.getElementById("userGuess").disabled = false;
  document.getElementById("resetButton").style.display = "none";
}

document
  .getElementById("userGuess")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      checkGuess();
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  const shapes = document.querySelectorAll(".shape");
  shapes.forEach((shape) => {
    const size = Math.random() * 100 + 50;
    const tx = (Math.random() - 0.5) * 200;
    const ty = (Math.random() - 0.5) * 200;

    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.left = `${Math.random() * 100}%`;
    shape.style.top = `${Math.random() * 100}%`;
    shape.style.setProperty("--tx", `${tx}%`);
    shape.style.setProperty("--ty", `${ty}%`);
    shape.style.animationDelay = `${Math.random() * 5}s`;
  });

  function createParticle(x, y) {
    const particle = document.createElement("div");
    particle.className = "mouse-particle";

    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    document.body.appendChild(particle);

    particle.animate(
      [
        { transform: "scale(1)", opacity: 0.8 },
        { transform: "scale(0)", opacity: 0 },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      }
    ).onfinish = () => particle.remove();
  }

  let lastX = 0;
  let lastY = 0;

  document.addEventListener("mousemove", (e) => {
    const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);

    if (distance > 50) {
      createParticle(e.clientX, e.clientY);
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });

  const header = document.querySelector(".dynamic-header");
  const layers = document.querySelectorAll(".parallax-layer");

  header.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = header.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    layers.forEach((layer) => {
      const depth = parseFloat(
        getComputedStyle(layer).getPropertyValue("--depth")
      );
      const translateX = x * depth * -1;
      const translateY = y * depth * -1;

      layer.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${depth}px) scale(var(--scale))`;
    });
  });

  header.addEventListener("mouseleave", () => {
    layers.forEach((layer) => {
      layer.style.transform =
        "translateX(0) translateY(0) translateZ(var(--depth)) scale(var(--scale))";
    });
  });

  const button = document.querySelector(".header-button");
  button.addEventListener("click", () => {
    const ripple = document.createElement("div");
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    ripple.style.width = "100px";
    ripple.style.height = "100px";
    ripple.style.transform = "translate(-50%, -50%) scale(0)";
    ripple.style.animation = "ripple 0.6s linear";

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

const style = document.createElement("style");
style.textContent = `
  @keyframes ripple {
    to {
      transform: translate(-50%, -50%) scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

