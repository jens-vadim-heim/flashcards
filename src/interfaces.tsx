export interface Card {
  id: number;
  question: string;
  answer: string;
}

export interface Deck {
  id: number;
  name: string;
  cards: Card[];
}
