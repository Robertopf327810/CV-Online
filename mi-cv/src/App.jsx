import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Code2,
  Database,
  ExternalLink,
  Gamepad2,
  Mail,
  MapPin,
  Music2,
  Pause,
  Plane,
  Phone,
  ShieldCheck,
  Volume2,
  VolumeX,
} from "lucide-react";
import { cvData } from "./data/CVData";

const aboutTopics = [
  { label: "Desarrollo web", Icon: Code2 },
  { label: "Estructuras de datos", Icon: Database },
  { label: "Seguridad", Icon: ShieldCheck },
  { label: "Videojuegos", Icon: Gamepad2 },
  { label: "Música", Icon: Music2 },
  { label: "Viajes", Icon: Plane },
];

function SocialIcon({ name }) {
  const paths = {
    github: "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.16c-3.22.7-3.9-1.36-3.9-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.57-.29-5.27-1.29-5.27-5.73 0-1.27.45-2.3 1.2-3.11-.12-.29-.52-1.47.11-3.06 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.83 0c2.22-1.5 3.2-1.2 3.2-1.2.63 1.6.23 2.78.11 3.07.75.81 1.2 1.84 1.2 3.11 0 4.45-2.7 5.43-5.28 5.72.42.36.78 1.06.78 2.14v3.18c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z",
    facebook: "M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06H297V6.26S260.35 0 225.36 0C152.77 0 105.47 44 105.47 123.72v71.62H25.61V288h79.86v224h98.98V288z",
    linkedin: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.4 61.9 111.4 142.3V448z",
  };

  if (name === "instagram") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox={name === "facebook" ? "0 0 320 512" : name === "linkedin" ? "0 0 448 512" : "0 0 24 24"} fill="currentColor" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

export default function App() {
  const { personal, education, skills, projects } = cvData;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personal.email)}`;
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);
  const audioContextRef = useRef(null);
  const masterGainRef = useRef(null);
  const oscillatorsRef = useRef([]);

  const categories = ["Todos", ...new Set(projects.map((project) => project.category))];
  const filteredProjects =
    selectedCategory === "Todos"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [selectedCategory]);

  useEffect(() => {
    if (masterGainRef.current && audioContextRef.current) {
      const gain = musicMuted ? 0 : 0.025;
      masterGainRef.current.gain.setTargetAtTime(
        gain,
        audioContextRef.current.currentTime,
        0.08
      );
    }
  }, [musicMuted]);

  useEffect(() => () => {
    oscillatorsRef.current.forEach((oscillator) => {
      try {
        oscillator.stop();
      } catch {
        // The oscillator may already have stopped.
      }
    });
    audioContextRef.current?.close();
  }, []);

  const toggleMusic = async () => {
    if (musicPlaying) {
      await audioContextRef.current?.suspend();
      setMusicPlaying(false);
      return;
    }

    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const context = new AudioContext();
      const masterGain = context.createGain();
      const filter = context.createBiquadFilter();

      masterGain.gain.value = musicMuted ? 0 : 0.025;
      filter.type = "lowpass";
      filter.frequency.value = 900;
      filter.Q.value = 0.7;

      const frequencies = [110, 164.81, 220];
      const oscillators = frequencies.map((frequency, index) => {
        const oscillator = context.createOscillator();
        const voiceGain = context.createGain();
        oscillator.type = index === 0 ? "sine" : "triangle";
        oscillator.frequency.value = frequency;
        oscillator.detune.value = index * 3 - 3;
        voiceGain.gain.value = index === 0 ? 0.55 : 0.28;
        oscillator.connect(voiceGain);
        voiceGain.connect(filter);
        oscillator.start();
        return oscillator;
      });

      const lfo = context.createOscillator();
      const lfoGain = context.createGain();
      lfo.frequency.value = 0.08;
      lfoGain.gain.value = 160;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      oscillators.push(lfo);

      filter.connect(masterGain);
      masterGain.connect(context.destination);
      audioContextRef.current = context;
      masterGainRef.current = masterGain;
      oscillatorsRef.current = oscillators;
    } else {
      await audioContextRef.current.resume();
    }

    setMusicPlaying(true);
  };

  const toggleMute = () => setMusicMuted((muted) => !muted);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio">
      <nav className="navbar" aria-label="Navegación principal">
        <a className="brand" href="#inicio" onClick={closeMenu}>
          <span>R</span>
          <strong>{personal.name}</strong>
        </a>

        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          type="button"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#sobre-mi" onClick={closeMenu}>Sobre mí</a>
          <a href="#habilidades" onClick={closeMenu}>Habilidades</a>
          <a href="#proyectos" onClick={closeMenu}>Proyectos</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
        </div>
      </nav>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />

          <div className="hero-copy">
            <p className="availability"><span /> Disponible para proyectos</p>
            <p className="hero-name">{personal.name}</p>
            <h1>
              Desarrollo soluciones
              <span>web y digitales.</span>
            </h1>
            <p className="hero-description">{personal.summary}</p>
            <div className="hero-actions">
              <a className="primary-button" href="#proyectos">
                Ver proyectos <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a className="text-button" href={`mailto:${personal.email}`}>
                <Mail size={17} aria-hidden="true" /> Escríbeme
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="portrait-frame">
              <img
                src={personal.photo}
                alt={`Retrato de ${personal.name}`}
              />
            </div>
            <div className="floating-tag tag-top">Full-Stack</div>
            <div className="floating-tag tag-bottom">Seguridad</div>
          </div>

          <a className="scroll-cue" href="#sobre-mi" aria-label="Ir a Sobre mí">
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </section>

        <section className="about section-shell reveal" id="sobre-mi">
          <div className="section-kicker">01 / Sobre mí</div>
          <div className="about-grid">
            <div className="about-visual" aria-label="Intereses y áreas profesionales">
              {aboutTopics.map(({ label, Icon }) => (
                <div className="about-topic" key={label}>
                  <Icon size={28} strokeWidth={1.7} aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="about-copy">
              <p>
                Estudiante de Ingeniería en Sistemas y Seguridad Informática con enfoque
                en desarrollo web full-stack, estructuras de datos y seguridad. Disfruto
                transformar ideas en soluciones funcionales con código limpio y buen diseño.
              </p>
              <p>
                Cuando no estoy programando, me encontrarás explorando nuevos mundos en
                los <strong>videojuegos</strong>, escuchando <strong>música</strong> o
                planeando mi próximo <strong>viaje</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className="skills section-shell reveal" id="habilidades">
          <div className="section-heading">
            <div>
              <div className="section-kicker">02 / Habilidades</div>
              <h2>Mi stack técnico</h2>
            </div>
            <p>Tecnologías y herramientas con las que desarrollo productos digitales.</p>
          </div>

          <div className="skill-cards">
            {Object.entries(skills).map(([category, items], index) => (
              <article className="skill-card" key={category}>
                <div className="skill-card-top">
                  <span>0{index + 1}</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </div>
                <h3>{category}</h3>
                <div className="skill-tags">
                  {items.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="projects section-shell" id="proyectos">
          <div className="section-heading reveal">
            <div>
              <div className="section-kicker">03 / Trabajo seleccionado</div>
              <h2>Proyectos</h2>
            </div>
          </div>

          <div className="project-filters reveal" aria-label="Filtrar proyectos">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={selectedCategory === category ? "active" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="project-list">
            {filteredProjects.map((project, index) => (
              <article className="project-row reveal" key={project.title}>
                <div className="project-number">0{index + 1}</div>
                <div className="project-main">
                  <img
                    className={`project-logo${project.logoBackground === "light" ? " project-logo-light" : ""}`}
                    src={project.logo}
                    alt={`Logo de ${project.title}`}
                  />
                  <div className="project-copy">
                    <div className="project-meta">
                      <span>{project.category}</span>
                      <span>{project.period}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="project-actions">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      Ver demo <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      Código <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="education section-shell reveal" id="formacion">
          <div className="section-kicker">04 / Formación</div>
          <div className="education-card">
            {education.map((item, index) => (
              <div className="education-row" key={`${item.degree}-${index}`}>
                <span>{item.period}</span>
                <div className="institution-info">
                  {item.logo && (
                    <a
                      className="uvaq-logo-link"
                      href="https://www.uvaq.edu.mx/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Visitar el sitio oficial de la UVAQ"
                    >
                      <img className="uvaq-logo" src={item.logo} alt="UVAQ" />
                    </a>
                  )}
                  <div>
                  <h3>{item.degree}</h3>
                  <p>{item.institution}</p>
                  </div>
                </div>
                <p>{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="contact reveal" id="contacto">
          <div>
            <p>¿Tienes un proyecto en mente?</p>
            <h2>Hagamos algo <span>increíble.</span></h2>
          </div>
          <div className="contact-actions">
            <a
              className="contact-button"
              href={gmailComposeUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Mail size={20} aria-hidden="true" />
              Enviar correo
            </a>
            <a
              className="contact-button whatsapp-button"
              href={`https://wa.me/${personal.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Hola, vi tu portafolio y me gustaría contactarte.")}`}
              target="_blank"
              rel="noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.438-9.884 9.89-9.884a9.83 9.83 0 0 1 6.99 2.899 9.83 9.83 0 0 1 2.895 6.993c-.003 5.45-4.439 9.884-9.89 9.884m8.41-18.302A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.334.157 11.89c0 2.096.547 4.142 1.588 5.946L.05 24l6.31-1.656a11.9 11.9 0 0 0 5.683 1.447h.005c6.554 0 11.89-5.334 11.893-11.89a11.82 11.82 0 0 0-3.48-8.418Z" />
              </svg>
              WhatsApp
            </a>
          </div>
          <div className="contact-details" aria-label="Otros medios de contacto">
            <a href={gmailComposeUrl} target="_blank" rel="noreferrer">
              <Mail size={16} aria-hidden="true" />
              {personal.email}
            </a>
            <a href={`tel:${personal.phone.replace(/\s/g, "")}`}>
              <Phone size={16} aria-hidden="true" />
              {personal.phone}
            </a>
            <span>
              <MapPin size={16} aria-hidden="true" />
              {personal.location}
            </span>
            <a href={personal.github} target="_blank" rel="noreferrer">
              <SocialIcon name="github" />
              GitHub
            </a>
            {personal.linkedin && (
              <a href={personal.linkedin} target="_blank" rel="noreferrer">
                <SocialIcon name="linkedin" />
                LinkedIn
              </a>
            )}
            {personal.facebook && (
              <a href={personal.facebook} target="_blank" rel="noreferrer">
                <SocialIcon name="facebook" />
                Facebook
              </a>
            )}
            {personal.instagram && (
              <a href={personal.instagram} target="_blank" rel="noreferrer">
                <SocialIcon name="instagram" />
                Instagram
              </a>
            )}
          </div>
          <div className="location-map">
            <div className="location-map-header">
              <span>
                <MapPin size={16} aria-hidden="true" />
                Mi ubicación
              </span>
              <a
                href="https://www.openstreetmap.org/search?query=Morelia%2C%20Michoacan%2C%20Mexico"
                target="_blank"
                rel="noreferrer"
              >
                Ver en mapa <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
            <div className="location-map-frame">
              <iframe
                title="Mapa de Morelia, Michoacán"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-101.2747%2C19.6460%2C-101.1170%2C19.7460&layer=mapnik&marker=19.7008%2C-101.1844"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="location-map-label">
                <span className="location-map-pin"><MapPin size={18} aria-hidden="true" /></span>
                <div>
                  <strong>Morelia</strong>
                  <small>Michoacán, México</small>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <strong>{personal.name}</strong>
        <p>Desarrollador Full-Stack &amp; estudiante de Seguridad Informática</p>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>

      <div className="music-player" aria-label="Reproductor de música ambiental">
        <button
          type="button"
          className={`music-toggle ${musicPlaying ? "playing" : ""}`}
          onClick={toggleMusic}
          aria-label={musicPlaying ? "Pausar música" : "Reproducir música"}
        >
          {musicPlaying ? <Pause size={17} aria-hidden="true" /> : <Music2 size={17} aria-hidden="true" />}
        </button>
        <button
          type="button"
          className="music-mute"
          onClick={toggleMute}
          aria-label={musicMuted ? "Activar sonido" : "Silenciar música"}
        >
          {musicMuted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
