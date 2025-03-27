import React, { useState } from "react";
import "../css/Projects.css"; 

const Project = ({ title, languages, description, image, video, website }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePreviewClick = () => {
    setIsVideoPlaying(true);
  };

  const handleCloseClick = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div className={`project-container ${isVideoPlaying ? "show-video" : ""}`}>
      <h2>{title}</h2>
      <p>
        <a href={website} target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
      </p>
      <p>
        <strong>Languages:</strong> {languages}
      </p>

      {/* Image or Video */}
      {!isVideoPlaying ? (
        <img
          src={image}
          alt="Project Preview"
          className="project-image"
        />
      ) : (
        <div className="video-container">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Preview button to toggle between image and video */}
      {!isVideoPlaying && (
        <button className="preview-button" onClick={handlePreviewClick}>
          Preview
        </button>
      )}

      {/* Close button to switch back to the image */}
      {isVideoPlaying && (
        <button className="preview-button" onClick={handleCloseClick}>
          Close
        </button>
      )}

      <p>{description}</p>
    </div>
  );
};

const ProjectsList = () => {
  const frontendProjects = [
    {
      id: 1,
      title: "RESUME BUILDER",
      languages: "HTML + CSS",
      description: "A web application built using React for managing tasks.",
      image: "https://imgur.com/Swlckqm.png", 
      video: "P0NhN_4FcAg",
      website: "https://resumebuilderssk.netlify.app",
    },
    {
      id: 2,
      title: "PRO HEALTH",
      languages: "HTML + CSS + JavaScript",
      description: "A backend API built using Flask for data processing.",
      image: "https://imgur.com/l53zwrf.png", 
      video: "lMaUKLqXt_Q",
      website: "https://prohealthssk.netlify.app",
    },
    {
      id: 3,
      title: "MELODY PULSE",
      languages: "HTML + CSS + JavaScript",
      description: "A static website for a portfolio with responsive design.",
      image: "https://imgur.com/mUGqOMU.png",
      video: "0tIzAk_gw7k",
      website: "https://musicplayerssk.netlify.app",
    },
    {
      id: 4,
      title: "PORTFOLIO",
      languages: "HTML + CSS + JavaScript",
      description: "A RESTful web service for handling user authentication.",
      image: "https://imgur.com/aqOvcx5.png", 
      video: "Gn2NJeW26Tk",
      website: "https://sampleportfoliossk.netlify.app",
    },
    {
      id: 5,
      title: "SOLAR",
      languages: "HTML + CSS + JavaScript",
      description: "An enterprise application for managing inventory.",
      image: "https://imgur.com/ocaXLSy.png", 
      video: "GwuPy4u9-EY",
      website: "https://solarssk.netlify.app",
    },
    {
      id: 6,
      title: "RESTAURANT",
      languages: "HTML + CSS + JavaScript",
      description: "A content management system for blogs.",
      image: "https://imgur.com/bg2gSkJ.png", 
      video: "hlFJpgoCrmY",
      website: "https://restaurantssk.netlify.app",
    },
    {
      id: 7,
      title: "TRAVEL PLANNER",
      languages: "HTML + CSS + JavaScript",
      description: "A web application for booking hotels.",
      image: "https://imgur.com/s9Ddwc0.png", 
      video: "YOUTUBE_VIDEO_ID_7",
      website: "https://travelplannerssk.netlify.app",
    },
    {
      id: 8,
      title: "GAME STORE",
      languages: "HTML + CSS + JavaScript",
      description: "A mobile application for tracking expenses.",
      image: "https://imgur.com/Lb0Bty1.png", 
      video: "YwQ14oDNOtM",
      website: "https://gamestoressk.netlify.app",
    },
    {
      id: 9,
      title: "CYBER JUNGLE",
      languages: "HTML + Bootstrap",
      description: "An Android app for fitness tracking.",
      image: "https://imgur.com/oIykZoR.png", 
      video: "UuAE2ATZTiw",
      website: "https://cyberjunglessk.netlify.app",
    },
    {
      id: 10,
      title: "WILDLIFE",
      languages: "HTML + CSS",
      description: "A high-performance web server for handling requests.",
      image: "https://imgur.com/fuOBDkL.png",
      video: "-oqwdIdGhdY",
      website: "https://wildlifeblogssk.netlify.app",
    },
  ];

  const backendProjects = [
    {
      id: 1,
      title: "API AUTHENTICATION",
      languages: "Node.js + Express",
      description: "A backend API for handling user authentication with JWT.",
      image: "https://i.imgur.com/5Eq4xcm.png", 
      video: "dQw4w9WgXcQ",
      website: "https://apiauthentication.com",
    },
    {
      id: 2,
      title: "WEATHER DASHBOARD",
      lang",
      description: "A REST API for managing products and orders in an e-commerce platform.",
      image: "https://i.imgur.com/DHcCw7Y.png", 
      website: "https://ecommerceapi.com",
    },
    {
      id: 3,
      title: "BLOG PLATFORM",
      languages: "Ruby on Rails",
      description: "A backend API for managing blog posts and comments.",
      image: "https://imgur.com/fuOBDkL.png", 
      video: "YOUTUBE_VIDEO_ID_3",
      website: "https://blogplatform.com",
    },
  ];

  return (
    <div className="projects-sections">
      <h2 className="section-title">Frontend Projects</h2>
      <div className="projects-wrapper">
        {frontendProjects.map((project) => (
          <Project
            key={project.id}
            title={project.title}
            languages={project.languages}
            description={project.description}
            image={project.image}
            video={project.video}
            website={project.website}
          />
        ))}
      </div>

      <h2 className="section-title">Backend Projects</h2>
      <div className="projects-wrapper">
        {backendProjects.map((project) => (
          <Project
            key={project.id}
            title={project.title}
            languages={project.languages}
            description={project.description}
            image={project.image}
            video={project.video}
            website={project.website}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
