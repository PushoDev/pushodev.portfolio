import React, { useState, useEffect } from "react";
import Button from "./Button";
import RadialGradient from "./RadialGradient";
import { headerIntroData } from "../assets/lib/data";
import { useSectionInView } from "../assets/lib/hooks";
import { useActiveSectionContext } from "../context/active-section-context";
import { useLanguage } from "../context/language-context";
import { BsMouse } from "react-icons/bs";

const HeaderIntro: React.FC = () => {
  const { language } = useLanguage();
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  // Animación de máquina de escribir con múltiples textos
  const texts = ["FullStack Dev", "Desarrollador FullStack"];
  const [displayText, setDisplayText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [textIndex, setTextIndex] = useState<number>(0);
  const typingSpeed = 150;
  const pauseDuration = 2000;
  const deleteSpeed = typingSpeed / 2;

  useEffect(() => {
    const currentText = texts[textIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Modo escritura
        if (currentIndex < currentText.length) {
          setDisplayText(currentText.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Fin de escritura - iniciar pausa
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Modo borrado
        if (currentIndex > 0) {
          setDisplayText(currentText.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          // Fin de borrado - cambiar al siguiente texto
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deleteSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, textIndex]);

  return (
    <section
      className="flex flex-col items-center justify-center h-full gap-10 hero max-lg:h-full max-lg:gap-6"
      ref={ref}
      id="home"
    >
      <RadialGradient scale="scale-y-125" opacity="opacity-30" />

      <img
        src={headerIntroData.profilepicture}
        alt="Foto de perfil de Luis Guisado"
        className="w-1/6 rounded-full shadow-2xl drop-shadow-2xl avatar-img max-lg:w-3/4"
      />
      <h1>
        {language === "DE"
          ? headerIntroData.title.de
          : headerIntroData.title.en}
        <span className="wave text-7xl">&#128075;&#127997;</span>
      </h1>

      {/* Subtítulo animado */}
      <h2 className="min-h-[2.5rem]">
        {displayText}
        <span className="text-green-600 blinking-cursor">|</span>
      </h2>

      <p className="w-1/2 text-center max-lg:hidden">
        {language === "DE"
          ? headerIntroData.description.de
          : headerIntroData.description.en}
      </p>

      <div className="flex items-center justify-center gap-10 mb-12 mr-8 button-container max-lg:flex-col max-lg:items-center">
        {headerIntroData.buttons.map((button, index) => (
          <Button
            key={index}
            label={language === "DE" ? button.label.de : button.label.en}
            iconSVG={button.icon}
            link={button.link} // Usa el enlace directo del objeto
            buttoncolor={button.color}
            onClick={() => {
              // Solo ejecuta para enlaces internos
              if (!button.isExternal) {
                setActiveSection(button.name);
                setTimeOfLastClick(Date.now());
              }
            }}
            isExternal={button.isExternal} // Nuevo prop
            target={button.target} // Nuevo prop
            className="transition-transform cursor-pointer hover:scale-105"
          />
        ))}
      </div>
      <div className="flex gap-6 scroll-down-container animate-bounce">
        <BsMouse className="text-[2.6rem]" />
      </div>
    </section>
  );
};

export default HeaderIntro;
