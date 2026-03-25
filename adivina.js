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

let button = document.getElementById('btn-suerte');

button.addEventListener('click', function () {
  let randomIndex = Math.floor(Math.random() * Milistitadepalabras.length);

  document.getElementById('first').innerHTML = Milistitadepalabras[randomIndex];
});

const sectionDeMascota = document.getElementById('mascota-section');
const buttonSecundario = document.querySelector('.btn2');
const lugarDeTlacuache = document.getElementById('contenedor-imagen');

buttonSecundario.addEventListener('click', () => {
  lugarDeTlacuache.innerHTML = ''; // 🔥 limpia lo anterior

  const imagen = document.createElement('img');
  imagen.src = 'Assets/BoxTla.jpg';
  imagen.classList.add('imagen-dinamica');

  lugarDeTlacuache.appendChild(imagen);

  imagen.addEventListener('load', () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });
});

// Activacion de modulos
const activaciondemodulo = document.getElementById('modulito1');
const Galeria = document.getElementById('gallery-btn');
const activaciondemodulo2 = document.getElementById('contac-divuno');
const Contactos = document.getElementById('contac-btn');

const togglegallery = () => {
  activaciondemodulo.style.display = 'grid';
  activaciondemodulo.style.gridTemplateColumns =
    'repeat(auto-fill, minmax(400px, 1fr))';
  activaciondemodulo2.style.display = 'none';

  activaciondemodulo.scrollIntoView({
    behavior: 'smooth',
  });
};

Galeria.addEventListener('click', togglegallery);

const togglecontacs = () => {
  activaciondemodulo2.style.display = 'grid';
  activaciondemodulo2.style.gridTemplateColumns =
    'repeat(auto-fill, minmax(400px, 1fr))';
  activaciondemodulo.style.display = 'none';
  activaciondemodulo.scrollIntoView({
    behavior: 'smooth',
  });
};

Contactos.addEventListener('click', togglecontacs);
