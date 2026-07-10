<?php

declare(strict_types=1);

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

$profile = [
    'name' => 'Javi Pérez',
    'role' => 'Programador Web Junior',
    'tagline' => 'Desarrollo interfaces web con mentalidad de supervivencia: claras, resistentes y listas para funcionar cuando el mapa se pone difícil.',
    'location' => 'Asturias Wasteland',
    'birthdate' => '29-10-1999',
    'phone' => '+34 608 354 157',
    'email' => 'rasganorth@gmail.com',
    'address' => 'A/ Carlos Conde Nº17, Castropol, Asturias',
    'profileImage' => 'profile-wasteland.jpeg',
    'cv' => 'Currículum.pdf',
];

$technicalSkills = [
    'JavaScript' => 50,
    'HTML & CSS' => 75,
    'Java' => 25,
];

$professionalSkills = [
    'Comunicación' => 75,
    'Trabajo en equipo' => 85,
    'Creatividad' => 95,
    'Dedicación' => 65,
];

$interests = ['Interfaces', 'Responsive', 'Automatización', 'Diseño web'];
$typewriterPhrases = [
    'Programador Web Junior',
    'Frontend en modo supervivencia',
    'HTML, CSS y JavaScript',
    'Interfaces con señal propia',
];
?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
    <title><?= e($profile['name']); ?> | Portfolio</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="cursor-light" aria-hidden="true"></div>

    <div class="contenedor-header">
      <header>
        <div class="logo">
          <a href="#inicio">Javi</a>
        </div>
        <nav id="nav">
          <ul>
            <li><a href="#inicio" onclick="seleccionar()">Inicio</a></li>
            <li><a href="#sobremi" onclick="seleccionar()">Sobre mí</a></li>
            <li><a href="#skills" onclick="seleccionar()">Skills</a></li>
            <li><a href="#contacto" onclick="seleccionar()">Contacto</a></li>
          </ul>
        </nav>
        <button
          class="nav-responsive"
          type="button"
          aria-label="Abrir menú"
          onclick="mostrarOcultarMenu()"
        >
          <i class="fa-solid fa-bars"></i>
        </button>
      </header>
    </div>

    <section id="inicio" class="inicio">
      <div class="hero-hud">
        <p class="eyebrow">
          <span></span>
          Terminal activo // <?= e($profile['location']); ?>
        </p>
        <h1><?= e($profile['name']); ?></h1>
        <h2>
          <span
            id="typewriter"
            data-phrases='<?= e(json_encode($typewriterPhrases, JSON_UNESCAPED_UNICODE)); ?>'
          ><?= e($profile['role']); ?></span>
          <span class="terminal-caret" aria-hidden="true"></span>
        </h2>
        <p class="hero-copy"><?= e($profile['tagline']); ?></p>

        <div class="hero-actions">
          <a class="btn btn-primary" href="#contacto">
            Contactar
            <i class="fa-solid fa-paper-plane"></i>
          </a>
          <a class="btn btn-ghost" href="<?= e($profile['cv']); ?>" download>
            Descargar CV
            <i class="fa-solid fa-download"></i>
          </a>
        </div>

        <div class="status-grid" aria-label="Estado del sistema">
          <div>
            <span>RAD</span>
            <strong id="rad-counter">014</strong>
          </div>
          <div>
            <span>FOCO</span>
            <strong>98%</strong>
          </div>
          <div>
            <span>SEÑAL</span>
            <strong>ONLINE</strong>
          </div>
        </div>
      </div>

      <div class="contenido-banner survivor-card" data-tilt>
        <div class="vault-tag">VAULT 29</div>
        <div class="contenedor-img">
          <img src="<?= e($profile['profileImage']); ?>" alt="Foto de perfil de <?= e($profile['name']); ?>" />
        </div>
        <h2>Frontend scavenger</h2>
        <p>HTML // CSS // JavaScript // PHP 8</p>
      </div>
    </section>

    <section id="sobremi" class="sobremi">
      <div class="contenido-seccion">
        <h2>Sobre mí</h2>
        <p class="intro">
          <span>Hola, soy <?= e($profile['name']); ?>.</span> Soy un apasionado
          de la programación web y de la informática en general. Desde joven
          formateaba ordenadores de familia y amigos, y sigo con la misma
          curiosidad por entender, reparar y construir cosas digitales.
        </p>

        <div class="fila about-grid">
          <div class="col terminal-panel">
            <h3>Datos personales</h3>
            <ul>
              <li>
                <strong>Nacimiento</strong>
                <?= e($profile['birthdate']); ?>
              </li>
              <li>
                <strong>Teléfono</strong>
                <?= e($profile['phone']); ?>
              </li>
              <li>
                <strong>Email</strong>
                <?= e($profile['email']); ?>
              </li>
              <li>
                <strong>Dirección</strong>
                <?= e($profile['address']); ?>
              </li>
            </ul>
          </div>

          <div class="col terminal-panel">
            <h3>Bitácora</h3>
            <p>
              Me gusta aprender a base de práctica, cuidar los detalles visuales
              y convertir ideas sencillas en experiencias con personalidad.
            </p>
            <div class="chips" aria-label="Intereses">
              <?php foreach ($interests as $interest): ?>
                <span><?= e($interest); ?></span>
              <?php endforeach; ?>
            </div>
          </div>
        </div>

        <a class="btn download-link" href="<?= e($profile['cv']); ?>" download>
          Descargar CV
          <i class="fa-solid fa-download"></i>
        </a>
      </div>
    </section>

    <section class="skills" id="skills">
      <div class="contenido-seccion">
        <h2>Skills</h2>
        <div class="fila">
          <div class="col terminal-panel">
            <h3>Technical Skills</h3>
            <?php foreach ($technicalSkills as $skill => $percent): ?>
              <div class="skill">
                <span><?= e($skill); ?></span>
                <div class="barra-skill">
                  <div class="progreso" data-progress_percent="<?= e((string) $percent); ?>">
                    <span>0%</span>
                  </div>
                </div>
              </div>
            <?php endforeach; ?>
          </div>

          <div class="col terminal-panel">
            <h3>Professional Skills</h3>
            <?php foreach ($professionalSkills as $skill => $percent): ?>
              <div class="skill">
                <span><?= e($skill); ?></span>
                <div class="barra-skill">
                  <div class="progreso" data-progress_percent="<?= e((string) $percent); ?>">
                    <span>0%</span>
                  </div>
                </div>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </section>

    <section id="contacto" class="contacto">
      <div class="contenido-seccion">
        <h2>Contacto</h2>
        <div class="fila">
          <form id="form" class="terminal-panel">
            <div class="field">
              <label for="emailjs_name">Nombre</label>
              <input type="text" name="emailjs_name" id="emailjs_name" autocomplete="name" required />
            </div>
            <div class="field">
              <label for="emailjs_email">Email</label>
              <input type="email" name="emailjs_email" id="emailjs_email" autocomplete="email" required />
            </div>
            <div class="field">
              <label for="emailjs_message">Mensaje</label>
              <textarea name="emailjs_message" id="emailjs_message" rows="5" required></textarea>
            </div>

            <button type="submit" id="button" class="submit-button">
              Enviar señal
              <i class="fa-solid fa-satellite-dish"></i>
            </button>
            <p id="form-status" class="form-status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </section>

    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
    ></script>
    <script type="text/javascript">
      if (window.emailjs) {
        emailjs.init("-cOsGWVSDaBvq2DrC");
      }
    </script>
    <script src="script.js"></script>
  </body>
</html>
