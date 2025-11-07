import { useEffect, useState } from "react";
import '../styles/Integrantes.css';
import dataSkills from '../data/dataSkills.json';
import { ExperienceBar } from '../components/ExperienceBar'

import ivanImg from '../assets/img/ivanImg.jpg';
import nachoImg from '../assets/img/nachoImg.jpg';
import lauraImg from '../assets/img/lauraImg.jpg';
import romiImg from '../assets/img/romiImg.jpg';
import gonzaloImg from '../assets/img/gonzaloImg.png';


export default function Integrantes() {

  const [flippedIndex, setFlippedIndex] = useState(null);
  const imagenes = [ivanImg, nachoImg, lauraImg, romiImg, gonzaloImg];


  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div className="integrantes-page-container">
      <div className="integrantes-container">
        <h1>Nuestro equipo</h1>
        <div className="cards-container">

          {dataSkills.map((memberSkills, index) => (
            <div
              key={index}
              className={`card ${flippedIndex === index ? 'flipped' : ''}`}
              onClick={() => handleFlip(index)}
            >
              <div className="card-inner">
                <div className="card-front">
                  <img src={imagenes[index]} alt={memberSkills.integrante} />
                  <h2>{memberSkills.integrante}</h2>
                  <p>{memberSkills.rol}</p>
                </div>
                <div className="card-back">
                  <h3>{memberSkills.integrante}</h3>
                  <p className="rol-back">{memberSkills.rol}</p>
                  <div className="skills-container">
                    {memberSkills.skills.map((skill, idx) => (
                      <ExperienceBar
                        key={idx}
                        skill={skill.name}
                        level={skill.level}
                        maxLevel={100}
                        color={skill.color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
