import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

// Fonction pour générer une clé unique avec l'ID de l'événement, l'index et un suffixe spécifique
const generateKey = (event, idx, suffix) => `${event.id}-${idx}-${suffix}`;

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Modification du sens de tri : avant : evtA < evtB, après : new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  ) || [];

  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => {
        // Utilisation de la fonction generateKey pour créer des clés uniques
        const cardKey = generateKey(event, idx, "card");
        const paginationKey = generateKey(event, idx, "pagination");

        return (
          <div key={cardKey}>
            <div
              
              className={`SlideCard SlideCard--${
                index === idx ? "display" : "hide"
              }`}
            >
              <img src={event.cover} alt="forum" />
              <div className="SlideCard__descriptionContainer">
                <div className="SlideCard__description">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div>{getMonth(new Date(event.date))}</div>
                </div>
              </div>
            </div>
            <div
              key={paginationKey}
              className="SlideCard__paginationContainer"
            >
              <div className="SlideCard__pagination">
                {byDateDesc.map((_, radioIdx) => (
                  <input
                    // Utilisation de la fonction generateKey pour créer des clés uniques pour les boutons radio
                    key={generateKey(event, idx, `radio-${radioIdx}`)}
                    type="radio"
                    name={`radio-button-${idx}`}
                    // Remplacement de idx par index pour lier les boutons radio à l'index de la carte active
                    checked={index === radioIdx}
                    // Ajout de readOnly pour éviter l'avertissement lié à onChange
                    readOnly
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
