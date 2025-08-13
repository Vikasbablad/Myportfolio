import React, { useState, useEffect } from 'react';
import './react-component.css';

const TechStackCard = ({ icon, name, description, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`tech-card ${isVisible ? 'visible' : ''}`}
      style={{ '--card-color': color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-icon">
        <i className={icon}></i>
      </div>
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{description}</p>
      </div>
      <div className={`card-overlay ${isHovered ? 'active' : ''}`}>
        <div className="overlay-content">
          <span className="overlay-text">Learn More</span>
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>
  );
};

const TechStackGrid = () => {
  const techStack = [
    {
      icon: 'fab fa-java',
      name: 'Java',
      description: 'Enterprise-level backend development with Spring Framework',
      color: '#007396'
    },
    {
      icon: 'fab fa-react',
      name: 'React',
      description: 'Modern frontend development with hooks and context',
      color: '#61DAFB'
    },
    {
      icon: 'fab fa-python',
      name: 'Python',
      description: 'Backend development with Flask and Django frameworks',
      color: '#3776AB'
    },
    {
      icon: 'fas fa-database',
      name: 'MySQL',
      description: 'Relational database design and optimization',
      color: '#4479A1'
    },
    {
      icon: 'fab fa-spring',
      name: 'Spring Boot',
      description: 'Rapid application development with Spring ecosystem',
      color: '#6DB33F'
    },
    {
      icon: 'fab fa-docker',
      name: 'Docker',
      description: 'Containerization and microservices deployment',
      color: '#2496ED'
    }
  ];

  return (
    <div className="tech-stack-container">
      <h2 className="section-title">Technology Stack</h2>
      <div className="tech-grid">
        {techStack.map((tech, index) => (
          <TechStackCard
            key={index}
            {...tech}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};

// Example usage of custom hooks
const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

// Example of a more complex component with state management
const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with Spring Boot and React',
      technologies: ['Java', 'Spring Boot', 'React', 'MySQL', 'Docker'],
      image: '/path/to/image1.jpg',
      github: 'https://github.com/username/project1',
      live: 'https://project1.com'
    },
    {
      id: 2,
      title: 'Task Management System',
      description: 'Collaborative project management with real-time updates',
      technologies: ['Java', 'Spring Boot', 'React', 'WebSocket', 'Redis'],
      image: '/path/to/image2.jpg',
      github: 'https://github.com/username/project2',
      live: 'https://project2.com'
    }
  ];

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="project-showcase">
      <h2 className="section-title">Featured Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-item"
            onClick={() => openProjectModal(project)}
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <span>Click to view details</span>
              </div>
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-body">
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
              <div className="modal-tech">
                <h4>Technologies Used:</h4>
                <div className="tech-tags">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="modal-links">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <i className="fab fa-github"></i> View Code
                </a>
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App component
const PortfolioApp = () => {
  const scrollY = useScrollAnimation();

  return (
    <div className="portfolio-app">
      <header className="app-header" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        <h1>Your Name - Full Stack Developer</h1>
        <p>Passionate about creating amazing web experiences</p>
      </header>
      
      <main className="app-main">
        <TechStackGrid />
        <ProjectShowcase />
      </main>
    </div>
  );
};

export default PortfolioApp;
export { TechStackCard, TechStackGrid, ProjectShowcase, useScrollAnimation };


