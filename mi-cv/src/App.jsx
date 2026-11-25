import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { cvData } from "./data/CVData";

export default function App() {
  const { personal, education, skills, projects } = cvData;
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);

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
            <h2>Construyendo tecnología con enfoque práctico y creativo.</h2>
            <div className="about-copy">
              <p>
                Soy estudiante de Ingeniería en Sistemas y Seguridad Informática,
                con pasión por crear aplicaciones útiles, modernas y bien estructuradas.
              </p>
              <p>
                Me interesa llevar cada proyecto desde la idea hasta una experiencia
                funcional, cuidando la arquitectura, el diseño y la seguridad.
              </p>
              <div className="location">
                <MapPin size={16} aria-hidden="true" />
                {personal.location}
              </div>
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
          <a className="contact-button" href={`mailto:${personal.email}`}>
            <Mail size={20} aria-hidden="true" />
            Iniciar conversación
          </a>
          <div className="contact-details" aria-label="Otros medios de contacto">
            <a href={`mailto:${personal.email}`}>
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
              <ExternalLink size={16} aria-hidden="true" />
              GitHub
            </a>
            {personal.linkedin && (
              <a href={personal.linkedin} target="_blank" rel="noreferrer">
                <ExternalLink size={16} aria-hidden="true" />
                LinkedIn
              </a>
            )}
          </div>
        </section>
      </main>

      <footer>
        <strong>{personal.name}</strong>
        <p>Desarrollador Full-Stack &amp; estudiante de Seguridad Informática</p>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
    </div>
  );
}
