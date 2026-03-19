let Milistitadepalabras = [
  'Todo apunta a que sí',
  'La suerte está de tu lado',
  'Mejor no contar con ello',
  'Muy probable',
  'El destino aún no lo decide',
  'No es el momento indicado',
  'Tus probabilidades mejoran pronto',
  'Las cosas saldrán mejor de lo esperado',
  'No confíes demasiado en eso',
  'El universo conspira a tu favor',
  'Pregunta más tarde',
];

let button = document.getElementsByTagName('button')[0];

button.addEventListener('click', function () {
  let randomIndex = Math.floor(Math.random() * Milistitadepalabras.length);

  document.getElementById('first').innerHTML = Milistitadepalabras[randomIndex];
});

const section = document.querySelector('section');
const buttonSecundario = document.querySelector('.btn2');
const div = document.querySelector('div');

buttonSecundario.addEventListener('click', () => {
  // section.innerHTML = "<img src='burguer.jpg'>"

  const imagen = document.createElement('img');
  imagen.src = 'Assets/BoxTla.jpg';
  imagen.classList.add('imagen-dinamica');

  div.appendChild(imagen);

  imagen.addEventListener('load', () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });
});
