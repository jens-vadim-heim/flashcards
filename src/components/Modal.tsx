import { useState } from "react";
import type { Card } from "../interfaces";

interface ModalProps {
  mode: "card" | "deck";
  closeModal: () => void;
  deckId: number | null;
  addCard: (deckId: number, card: Card) => void;
  deleteCard: (deckId: number, card: Card) => void;
  updateCard: (deckId: number, updatedCard: Card) => void;
  editingCard?: Card | null;
  addDeck?: (name: string) => void;
}

export default function Modal({
  mode,
  deckId,
  addDeck,
  addCard,
  deleteCard,
  updateCard,
  editingCard,
  closeModal,
}: ModalProps) {
  const [deckname, setDeckname] = useState<string>("");
  const [answer, setAnswer] = useState<string>(editingCard?.answer || "");
  const [question, setQuestion] = useState<string>(editingCard?.question || "");

  const handleSubmit = () => {
    if (mode === "deck") {
      if (addDeck && deckname.trim() !== "") {
        addDeck(deckname.trim());
      }
    } else {
      if (deckId === null) return;

      if (editingCard) {
        updateCard(deckId, {
          ...editingCard,
          answer: answer,
          question: question,
        });
      } else {
        const newCard = {
          id: Date.now(),
          answer: answer,
          question: question,
        };
        addCard(deckId, newCard);
      }
    }

    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center"
      onClick={() => {
        closeModal();
      }}
    >
      <div
        className="bg-gray-600 p-6 rounded-lg shadow-lg flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {mode === "deck" ? (
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-bold">New deck</p>

            <input
              type="text"
              name="deckname"
              value={deckname}
              id="deckname"
              placeholder="Deck name..."
              className="p-2 bg-gray-700 rounded"
              onChange={(e) => setDeckname(e.target.value)}
            />
            <button
              className="block rounded p-2 bg-gray-700 cursor-pointer transition-colors duration-300 hover:bg-gray-800"
              onClick={() => {
                if (addDeck && deckname.trim() !== "") {
                  addDeck(deckname);
                } else {
                  alert("Please provide a deck name");
                  return;
                }
              }}
            >
              Create deck
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <label>
              <span className="text-xl font-bold block mb-2">Question</span>
              <textarea
                className="p-2 bg-gray-700 rounded"
                name="question"
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </label>

            <label>
              <span className="text-xl font-bold block mb-2">Answer</span>
              <textarea
                className="p-2 bg-gray-700 rounded"
                name="answer"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </label>

            <div className="mt-4 flex flex-col gap-1">
              <button
                className="block rounded p-2 bg-gray-700 cursor-pointer transition-colors duration-300 hover:bg-gray-800"
                onClick={() => {
                  if ((question || answer).trim() === "") {
                    alert("Fields cannot be empty.");
                    return;
                  } else {
                    handleSubmit();
                  }
                }}
              >
                {editingCard ? "Update" : "Add"}
              </button>
              {deckId && editingCard && (
                <button
                  className="block rounded p-2 bg-red-900 cursor-pointer transition-colors duration-300 hover:bg-red-800"
                  onClick={() => {
                    deleteCard(deckId, editingCard);
                    closeModal();
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
