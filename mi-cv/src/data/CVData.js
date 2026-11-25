import fotoPerfil from "../assets/perfil.jpg";
import uvaqLogo from "../assets/uvaq-logo.png";
import heroesPcLogo from "../assets/heroespc-logo.png";
import aprendePlusLogo from "../assets/aprendeplus-logo.svg";
import pulseMusicLogo from "../assets/pulsemusic-logo.svg";
import socketChatLogo from "../assets/socketchat-logo.svg";

export const cvData = {
  personal: {
    name: "Roberto Pérez Flores",
    role: "Estudiante de Ingeniería en Sistemas y Seguridad Informática | Desarrollador Full-Stack",
    photo: fotoPerfil,
    location: "Morelia, Michoacán, México",
    email: "robertopf327@gmail.com",
    phone: "+52 443 463 6242",
    github: "https://github.com/Robertopf327810",
    linkedin: "https://www.linkedin.com/in/roberto-p%C3%A9rez-flores-a1149834b/",
    summary:
      "Estudiante de Ingeniería en Sistemas y Seguridad Informática en la Universidad Vasco de Quiroga (UVAQ), con experiencia práctica en desarrollo web full-stack, aplicaciones de escritorio, gestión de bases de datos relacionales y administración de entornos Linux. Enfocado en construir software seguro, escalable y con buena experiencia de usuario.",
  },

  education: [
    {
      degree: "Ingeniería en Sistemas y Seguridad Informática",
      institution: "Universidad Vasco de Quiroga (UVAQ)",
      logo: uvaqLogo,
      period: "2024 - Presente (5° Semestre)",
      details: "Miembro estudiantil de IEEE Computer Society y participante en IEEEXtreme.",
    },
  ],

  skills: {
    Lenguajes: ["Java", "JavaScript (ES6+)", "Python", "PHP", "SQL", "HTML5 / CSS3"],
    "Frameworks y Web": ["React", "Node.js", "Express", "Tailwind CSS", "Sequelize ORM", "JavaFX / Swing"],
    "Bases de Datos": ["MySQL", "PostgreSQL", "phpMyAdmin", "TablePlus"],
    "Sistemas y Herramientas": ["Git / GitHub", "Linux (Ubuntu Server / Mint)", "VirtualBox", "ZeroTier", "Windows PowerShell"],
    "Inteligencia Artificial": ["IA generativa", "Asistencia en desarrollo"],
  },

  projects: [
    {
      title: "HeroesPC — E-Commerce de Hardware y Cómputo",
      logo: heroesPcLogo,
      logoBackground: "light",
      category: "React / Node",
      period: "2026",
      description:
        "Tienda web full-stack especializada en hardware y equipos de cómputo con arquitectura de 8 tablas relacionales, API REST y panel de gestión.",
      tech: ["React", "Node.js", "Express", "MySQL", "Sequelize"],
      github: "https://github.com/Robertopf327810",
      demo: "",
    },
    {
      title: "AprendePlus — Plataforma de Cursos Online",
      logo: aprendePlusLogo,
      category: "PHP / MySQL",
      period: "2026",
      description:
        "Sistema web educativo con autenticación de usuarios, gestión de perfiles, avatares personalizados y control de roles.",
      tech: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
      github: "https://github.com/Robertopf327810/Online-Courses",
      demo: "",
    },
    {
      title: "Reproductor de Música Web",
      logo: pulseMusicLogo,
      category: "JavaScript",
      period: "2026",
      description:
        "Aplicación web responsiva para reproducción de audio y gestión dinámica (creación y eliminación) de listas de reproducción.",
      tech: ["JavaScript", "HTML5", "CSS3"],
      github: "https://github.com/Robertopf327810/Reproductor-de-musica",
      demo: "https://robertopf327810.github.io/Reproductor-de-musica/",
    },
    {
      title: "Aplicación de Comunicación en Red (Sockets)",
      logo: socketChatLogo,
      category: "Redes / Web",
      period: "2026",
      description:
        "Implementación cliente-servidor para intercambio de datos en tiempo real mediante sockets.",
      tech: ["Sockets", "HTML5", "JavaScript"],
      github: "https://github.com/Robertopf327810/Sockets",
      demo: "",
    },
  ],
};