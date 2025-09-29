import { useState } from "react";
import type { Card, Deck } from "../interfaces";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StudyModeProps {
  deck: Deck;
  closeSM: () => void;
}

export default function StudyMode({ deck, closeSM }: StudyModeProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [cards, setCards] = useState<Card[]>(deck.cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const startStudy = (mode: "ordered" | "shuffled") => {
    if (mode === "shuffled") {
      setCards([...deck.cards].sort(() => Math.random() - 0.5));
    }
    setCurrentIndex(0);
    setIsActive(true);
  };

  if (!isActive) {
    return (
      <div className="fixed inset-0 bg-black/10 backdrop-blur-lg pt-8">
        <div className="p-8 flex flex-col gap-8 w-full sm:w-[min(700px,60%)] mx-auto">
          <div className="flex justify-between items-center">
            <div
              className="cursor-pointer hover:bg-gray-800/30 p-2 self-start rounded-full transition duration-300"
              onClick={closeSM}
            >
              <ArrowLeft></ArrowLeft>
            </div>
            <h2 className="text-3xl font-bold">{deck.name}</h2>
            <span></span>
          </div>

          <div className="flex flex-col gap-4 text-lg items-center">
            <p>Cards: {deck.cards.length}</p>

            <p>How would you like to study?</p>

            <div className="flex sm:flex-row gap-2">
              <button
                className="rounded py-2 px-4 bg-gray-700 cursor-pointer transition-colors duration-300 hover:bg-gray-800 w-max"
                onClick={() => startStudy("ordered")}
              >
                In order
              </button>
              <button
                className="rounded py-2 px-4 bg-gray-700 cursor-pointer transition-colors duration-300 hover:bg-gray-800 w-max"
                onClick={() => startStudy("shuffled")}
              >
                Shuffle
              </button>
            </div>
            <button
              className="block rounded p-2 bg-red-900 cursor-pointer transition-colors duration-300 hover:bg-red-800 w-[200px]"
              onClick={closeSM}
            >
              Exit to deck view
            </button>
          </div>
        </div>
      </div>
    );
  }

  const card = cards[currentIndex];

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-lg pt-8">
      {/* Top bar */}
      <div className="w-full sm:w-[min(700px,80%)] p-8 flex flex-col items-center gap-8 mx-auto">
        <div className="w-full flex items-center justify-between">
          <div
            className="cursor-pointer hover:bg-gray-800/30 p-2 self-start rounded-full transition duration-300"
            onClick={() => setIsActive(false)}
          >
            <ArrowLeft></ArrowLeft>
          </div>
          <h2 className="text-3xl font-bold">{deck.name}</h2>
          <span></span>
        </div>

        {/* Progress */}
        <p className="text-lg">
          {currentIndex + 1}/{cards.length}
        </p>

        <div
          className="bg-gray-700 rounded p-8 text-xl transition w-full h-[200px] flex justify-center items-center cursor-pointer max-w-sm shadow-2xl"
          onClick={() => setShowAnswer((prev) => !prev)}
        >
          {showAnswer ? card.answer : card.question}
        </div>

        <button
          className="text-xl transition cursor-pointer hover:text-gray-200"
          onClick={() => setShowAnswer((prev) => !prev)}
        >
          Flip
        </button>
        <div className="flex gap-4">
          <button
            className="bg-gray-700 p-2 rounded-full cursor-pointer disabled:cursor-none disabled:opacity-40"
            disabled={currentIndex - 1 < 0}
            onClick={() => {
              setShowAnswer(false);
              setCurrentIndex((i) => i - 1);
            }}
          >
            <ArrowLeft />
          </button>
          <button
            className="bg-gray-700 p-2 rounded-full cursor-pointer disabled:cursor-none disabled:opacity-40"
            disabled={currentIndex >= cards.length - 1}
            onClick={() => {
              setShowAnswer(false);
              setCurrentIndex((i) => i + 1);
            }}
          >
            <ArrowRight />
          </button>
        </div>
        <button
          onClick={closeSM}
          className="rounded p-2 bg-red-900 hover:bg-red-800 cursor-pointer transition duration-300 w-[200px]"
        >
          Exit to deck view
        </button>
      </div>
    </div>
  );
}
