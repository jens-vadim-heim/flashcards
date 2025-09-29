import { useState, useEffect } from "react";
import type { Card, Deck } from "./interfaces";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DeckList from "./components/DeckList";
import Modal from "./components/Modal";
import DeckView from "./components/DeckView";
import StudyMode from "./components/StudyMode";

const starterDecks: Deck[] = [
  {
    id: 1,
    name: "Spanish Basics",
    cards: [
      { id: 1, question: "¿Cómo estás?", answer: "Estoy bien" },
      { id: 2, question: "Hola", answer: "Hello" },
      { id: 3, question: "Adiós", answer: "Goodbye" },
      { id: 4, question: "Gracias", answer: "Thank you" },
      { id: 5, question: "Por favor", answer: "Please" },
      { id: 6, question: "¿Qué tal?", answer: "How’s it going?" },
      { id: 7, question: "Bienvenido", answer: "Welcome" },
      { id: 8, question: "Sí", answer: "Yes" },
      { id: 9, question: "No", answer: "No" },
      { id: 10, question: "Perdón", answer: "Sorry" },
    ],
  },
  {
    id: 2,
    name: "Math Formulas",
    cards: [
      { id: 1, question: "Area of a circle?", answer: "πr²" },
      { id: 2, question: "Circumference of a circle?", answer: "2πr" },
      { id: 3, question: "Area of a triangle?", answer: "½ × base × height" },
      { id: 4, question: "Pythagoras theorem?", answer: "a² + b² = c²" },
      {
        id: 5,
        question: "Quadratic formula?",
        answer: "(-b ± √(b²-4ac)) / 2a",
      },
      { id: 6, question: "Slope formula?", answer: "(y₂ - y₁)/(x₂ - x₁)" },
      { id: 7, question: "Volume of a cube?", answer: "a³" },
      { id: 8, question: "Area of rectangle?", answer: "length × width" },
      { id: 9, question: "Simple Interest?", answer: "(P × R × T)/100" },
      { id: 10, question: "Perimeter of square?", answer: "4 × side" },
      // add more if needed
    ],
  },
  {
    id: 3,
    name: "History Dates",
    cards: [
      { id: 1, question: "When did WW2 end?", answer: "1945" },
      {
        id: 2,
        question: "When was the Declaration of Independence?",
        answer: "1776",
      },
      { id: 3, question: "Fall of the Berlin Wall?", answer: "1989" },
      { id: 4, question: "Start of French Revolution?", answer: "1789" },
      { id: 5, question: "Moon landing?", answer: "1969" },
      // add more to reach 15
    ],
  },
  {
    id: 4,
    name: "Science Facts",
    cards: [
      { id: 1, question: "H2O is?", answer: "Water" },
      { id: 2, question: "Speed of light?", answer: "299,792 km/s" },
      { id: 3, question: "Chemical symbol for gold?", answer: "Au" },
      { id: 4, question: "Force formula?", answer: "F = m × a" },
      { id: 5, question: "Earth revolves around?", answer: "Sun" },
      // more cards...
    ],
  },
  {
    id: 5,
    name: "Japanese Vocabulary",
    cards: [
      {
        id: 1,
        question: "Hello in Japanese?",
        answer: "こんにちは (Konnichiwa)",
      },
      { id: 2, question: "Thank you?", answer: "ありがとう (Arigatou)" },
      { id: 3, question: "Yes?", answer: "はい (Hai)" },
      { id: 4, question: "No?", answer: "いいえ (Iie)" },
      { id: 5, question: "Good morning?", answer: "おはよう (Ohayou)" },
      // more cards...
    ],
  },
  {
    id: 6,
    name: "Programming Concepts",
    cards: [
      { id: 1, question: "What is a variable?", answer: "A storage for data" },
      { id: 2, question: "Function?", answer: "Reusable block of code" },
      { id: 3, question: "Array?", answer: "Ordered list of elements" },
      { id: 4, question: "Object?", answer: "Collection of key-value pairs" },
      { id: 5, question: "Loop?", answer: "Repeats code multiple times" },
      // more cards...
    ],
  },
  {
    id: 7,
    name: "Art & Music",
    cards: [
      { id: 1, question: "Mona Lisa painted by?", answer: "Leonardo da Vinci" },
      { id: 2, question: "Beethoven's 5th symphony?", answer: "Yes" },
      { id: 3, question: "Famous Spanish painter?", answer: "Pablo Picasso" },
      // more cards...
    ],
  },
  {
    id: 8,
    name: "Geography",
    cards: [
      { id: 1, question: "Largest continent?", answer: "Asia" },
      { id: 2, question: "Longest river?", answer: "Nile" },
      { id: 3, question: "Highest mountain?", answer: "Mount Everest" },
      // more cards...
    ],
  },
];

export default function App() {
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [decks, setDecks] = useState<Deck[]>(() => {
    const saved = localStorage.getItem("decks");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Error parsing decks from localStorage: ", error);
      }
    }
    return starterDecks;
  });
  const [modalMode, setModalMode] = useState<"card" | "deck">("card");
  const [studyModeActive, setStudyModeActive] = useState<boolean>(false);

  const addCardToDeck = (did: number, card: Card) => {
    const updatedDecks = decks.map((d) =>
      d.id === did ? { ...d, cards: [...d.cards, card] } : d
    );
    setDecks(updatedDecks);
  };

  const deleteCard = (did: number, cardToDelete: Card) => {
    const updatedDecks = decks.map((deck) => {
      if (deck.id !== did) {
        return deck;
      }

      const updatedCards = deck.cards.filter(
        (card) => card.id !== cardToDelete.id
      );

      return { ...deck, cards: updatedCards };
    });

    setDecks(updatedDecks);
  };

  const updateCardInDeck = (did: number, updatedCard: Card) => {
    const updatedDecks = decks.map((deck) => {
      if (deck.id !== did) {
        return deck;
      }

      const updatedCards = deck.cards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      );

      return { ...deck, cards: updatedCards };
    });

    setDecks(updatedDecks);
  };

  const openAddCardModal = () => {
    setEditingCard(null);
    setModalMode("card");
    setModalActive(true);
  };

  const openEditCardModal = (card: Card) => {
    setEditingCard(card);
    setModalMode("card");
    setModalActive(true);
  };

  const openAddDeckModal = () => {
    setModalMode("deck");
    setModalActive(true);
  };

  const addDeck = (deckName: string) => {
    const newDeck: Deck = {
      id: Date.now(),
      name: deckName,
      cards: [],
    };
    setDecks([...decks, newDeck]);
    setModalActive(false);
  };

  const deleteDeck = (deck: Deck) => {
    const updatedDecks = decks.filter((d) => d.id !== deck.id);
    setDecks(updatedDecks);
  };

  const goToMain = () => {
    setSelectedDeckId(null);
    closeSM();
  };

  const openSM = () => {
    setStudyModeActive(true);
  };

  const closeSM = () => {
    setStudyModeActive(false);
  };

  useEffect(() => {
    localStorage.setItem("decks", JSON.stringify(decks));
  }, [decks]);

  const selectedDeck = decks.find((d) => d.id === selectedDeckId) ?? null;

  return (
    <div className="min-h-[100dvh] bg-gray-700 flex flex-col text-white">
      <Header reset={goToMain}></Header>

      <main className="flex-1 bg-gray-500 p-4 overflow-y-auto">
        {selectedDeckId === null && !studyModeActive && (
          <DeckList
            decks={decks}
            selectDeck={setSelectedDeckId}
            openAddDeckModal={openAddDeckModal}
          />
        )}

        {selectedDeck !== null && !studyModeActive && (
          <DeckView
            openSM={openSM}
            deck={selectedDeck}
            deleteDeck={deleteDeck}
            goBack={goToMain}
            openAddCardModal={openAddCardModal}
            openEditCardModal={openEditCardModal}
          />
        )}

        {studyModeActive && selectedDeck !== null && (
          <StudyMode deck={selectedDeck} closeSM={closeSM} />
        )}
      </main>

      {modalActive && (
        <Modal
          mode={modalMode}
          addDeck={addDeck}
          closeModal={() => setModalActive(false)}
          deckId={selectedDeckId}
          addCard={addCardToDeck}
          updateCard={updateCardInDeck}
          deleteCard={deleteCard}
          editingCard={editingCard || null}
        />
      )}

      <Footer />
    </div>
  );
}
