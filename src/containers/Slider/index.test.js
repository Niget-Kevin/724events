import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";


const data = {
  focus: [
    {
      title: "World economic forum",
      description: "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png"
  },
    {
      title: "Nordic design week",
      description: "Conférences sur le design de demain dans le digital",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/teemu-paananen-bzdhc5b3Bxs-unsplash1.png"
    },
    {
      title: "Sneakercraze market",
      description: "Rencontres de spécialistes des Sneakers Européens.",
      date: "2022-05-29T20:28:45.744Z",
      cover: "/images/jakob-dalbjorn-cuKJre3nyYc-unsplash 1.png"
    },
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });
});


describe("Slider component", () => {
  it("renders events in descending order of date", async () => {
    // Rendu du composant Slider avec les données mockées    
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider value={{ data }}>
        <Slider />
      </DataProvider>
    );

    // Attente de l'affichage du premier événement dans le slider
    await screen.findByText("janvier");

    // Récupération de tous les éléments contenant les mois des dates des événements dans l'ordre affiché
    const eventMonths = [
      screen.getByText("janvier"),
      screen.getByText("mars"),
      screen.getByText("mai")
    ];

    // Vérification que les mois correspondent à l'ordre décroissant des dates
    expect(eventMonths[0]).toBeInTheDocument("mai");
    expect(eventMonths[1]).toBeInTheDocument("mars");
    expect(eventMonths[2]).toBeInTheDocument("janvier");
  });
});


