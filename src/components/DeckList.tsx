import type { Deck } from "../interfaces";

interface DeckListProps {
  decks: Deck[];
  selectDeck: (id: number) => void;
  openAddDeckModal: () => void;
}

export default function DeckList({
  decks,
  selectDeck,
  openAddDeckModal,
}: DeckListProps) {
  return (
    <div className="container mx-auto">
      <p className="mb-4">Welcome! Choose a deck to study:</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <button
          className="rounded p-4 bg-gray-600 shadow-lg cursor-pointer text-3xl text-gray-400 transform transition duration-200 hover:scale-105 hover:bg-gray-700"
          onClick={openAddDeckModal}
        >
          +
        </button>
        {decks.map((deck: Deck) => (
          <div
            key={deck.id}
            className="rounded p-4 bg-gray-600 shadow-lg cursor-pointer transform transition duration-200 hover:scale-105 hover:bg-gray-700"
            onClick={() => selectDeck(deck.id)}
          >
            <div className="flex flex-col items-center text-gray-200">
              <strong className="text-lg text-center">{deck.name}</strong>
              <p className="text-sm mt-1">({deck.cards.length} cards)</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
