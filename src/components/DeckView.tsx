import type { Card, Deck } from "../interfaces";
import { ArrowLeft } from "lucide-react";

interface DeckViewProps {
  deck: Deck;
  deleteDeck: (deck: Deck) => void;
  goBack: () => void;
  openAddCardModal: () => void;
  openEditCardModal: (c: Card) => void;
  openSM: () => void;
}

export default function DeckView({
  deck,
  openSM,
  deleteDeck,
  goBack,
  openAddCardModal,
  openEditCardModal,
}: DeckViewProps) {
  return (
    <div className="flex-1 flex flex-col gap-2 container mx-auto h-full">
      <div className="flex justify-between items-center">
        <div
          className="flex cursor-pointer w-min hover:text-gray-400 transition duration-300"
          onClick={goBack}
        >
          <span className="flex">
            {" "}
            <ArrowLeft /> Back
          </span>
        </div>
        <button
          className="sm:w-[150px] block rounded p-2 bg-red-900 cursor-pointer transition-colors duration-300 hover:bg-red-800"
          onClick={() => {
            deleteDeck(deck);
            goBack();
          }}
        >
          Delete
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <strong className="text-3xl">{deck.name}</strong>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            className="sm:w-[150px] rounded p-2 bg-gray-700 cursor-pointer transition-colors duration-300 hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-gray-700 disabled:cursor-default"
            onClick={openSM}
            disabled={deck.cards.length < 1}
          >
            Study
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 flex-1 overflow-y-auto">
        <button
          className="rounded p-4 bg-gray-600 shadow-lg cursor-pointer transform transition duration-200 hover:scale-105 hover:bg-gray-700 text-xl"
          onClick={openAddCardModal}
        >
          +
        </button>
        {deck.cards.map((card) => (
          <div
            key={card.id}
            className="rounded p-4 bg-gray-600 shadow-lg cursor-pointer transform transition duration-200 hover:scale-105 hover:bg-gray-700 text-center flex flex-col gap-2 justify-center items-center"
            onClick={() => openEditCardModal(card)}
          >
            <p>{card.question}</p>
            <hr className="border-t border-gray-400 w-full" />

            <p>{card.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
