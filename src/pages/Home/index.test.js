import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async() => {
    render(< Home />)
    expect(screen.getByTestId("Event-list")).toBeInTheDocument()
    
    waitFor(() => {
      expect(screen.getByText("Mega Event")).toBeInTheDocument()
    });
  })
  it("a list a people is displayed",() => {
    render(<Home />);
    
    expect(screen.getByText("Samira")).toBeInTheDocument();
    expect(screen.getByText("Jean-baptiste")).toBeInTheDocument();
  })
  it("a footer is displayed", () => {
    render(<Home />);
    expect(screen.getByText("Notre derniére prestation")).toBeInTheDocument();    
    expect(screen.getByText("Contactez-nous")).toBeInTheDocument()
    expect(screen.getByText("contact@724events.com")).toBeInTheDocument()
  })
  it("an event card, with the last event, is displayed", async() => {
    render(<Home />);
    waitFor(() => {
      expect(screen.getByText("Conférence #productCON")).toBeInTheDocument();
      expect(screen.getByText("soirée entreprise")).toBeInTheDocument();
      expect(screen.getByText("Avril")).toBeInTheDocument();      
    });
  })
});


const data = {
        last: [
          {
          "id": 18,
          "type": "soirée entreprise",
          "date": "2022-04-29T20:28:45.744Z",
          "title": "Conférence #productCON",
          "cover": "/images/stem-list-EVgsAbL51Rk-unsplash.png",
          "description": "Présentation des outils analytics aux professionnels du secteur ",
          "nb_guesses": 1300,
          "periode": "24-25-26 Février",
          "prestations": [
            "1 espace d’exposition",
            "1 scéne principale",
            "2 espaces de restaurations",
            "1 site web dédié",
          ],
        },
      ],
    };




    describe("Home page", () => {
      it("displays the last event on EventCard", async () => {
        api.loadData = jest.fn().mockReturnValue(data);
        render(
          <DataProvider>
            <Home />
          </DataProvider>
        );
    
        // Attendre que l'EventCard soit rendue
        waitFor(() => {
          const eventCard = screen.getByTestId("event-card"); // Utiliser un attribut de test pour cibler l'EventCard
          expect(eventCard).toBeInTheDocument();
    
          // Vérifier que le titre de l'événement est correct
          expect(screen.getByText("Conférence #productCON")).toBeInTheDocument();
    
          // Vérifier que la date de l'événement est correcte
          expect(screen.getByText("Avril")).toBeInTheDocument();
          
          // Vérifier que l'image de l'événement est correcte
          expect(eventCard.querySelector("img")).toHaveAttribute("src", "/images/stem-list-EVgsAbL51Rk-unsplash.png");
        });
      });
    });
    
