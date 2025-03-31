const links = document.querySelectorAll(".link");

links.forEach((link) => {
  link.addEventListener("click", function () {
    links.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
  });
});

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

//Trocando de tema

const toggleTheme = document.getElementById("toggleTheme");

const rootHtml = document.documentElement;

function changeTheme() {
  const currentTheme = rootHtml.getAttribute("data-theme");

  if (currentTheme === "dark") rootHtml.setAttribute("data-theme", "light");
  else rootHtml.setAttribute("data-theme", "dark");

  toggleTheme.classList.toggle("bi-sun");
  toggleTheme.classList.toggle("bi-moon");
}

toggleTheme.addEventListener("click", changeTheme);

const menuLinks = document.querySelectorAll(".menu__link");

menuLinks.forEach((item) => {
  item.addEventListener("click", () => {
    menuLinks.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
  });
});

// Efeito de deslize nas imagens

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slider img");
const navLinks = document.querySelectorAll(".slider-nav a");

// Detecta se é um dispositivo com toque
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Função para detectar o slide visível
const activateNav = () => {
  const sliderWidth = slider.clientWidth;
  const scrollPosition = Math.round(slider.scrollLeft); // Usa Math.round para precisão
  const maxScroll = Math.round(slider.scrollWidth - sliderWidth); // Posição máxima de rolagem

  slides.forEach((slide, index) => {
    const slideStart = Math.round(sliderWidth * index);
    const slideEnd = Math.round(slideStart + sliderWidth);

    if ((scrollPosition >= slideStart && scrollPosition < slideEnd) || (index === slides.length - 1 && scrollPosition >= maxScroll)) {
      navLinks.forEach(link => link.classList.remove("active"));
      navLinks[index].classList.add("active");
    }
  });
};

// Adiciona evento de rolagem para atualizar os seletores
slider.addEventListener("scroll", activateNav);

// Permitir clique nos seletores para navegar
navLinks.forEach((link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    slider.scrollTo({
      left: slider.clientWidth * index,
      behavior: "smooth",
    });
  });
});

// Inicializa para ativar o primeiro seletor
activateNav();

// Funções de interação baseadas no dispositivo
if (isTouchDevice) {
  // Para dispositivos móveis (toque)
  let startX;
  let scrollLeft;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX;
    const walk = (startX - x) * 3; // Ajusta a sensibilidade
    slider.scrollLeft = scrollLeft + walk;
  });
} else {
  // Para desktops (clique e arraste com o mouse)
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1; // Ajusta a sensibilidade
    slider.scrollLeft = scrollLeft - walk;
  });
}



