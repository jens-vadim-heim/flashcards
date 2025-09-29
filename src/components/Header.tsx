interface HeaderProps {
  reset: () => void;
}

export default function Header({ reset }: HeaderProps) {
  return (
    <header className="container mx-auto p-4 flex justify-between items-center">
      <span
        className="text-3xl font-bold cursor-pointer hover:text-gray-400 transition duration-300"
        onClick={reset}
      >
        Flashcards
      </span>
      <div className="text-gray-400">👤</div>
    </header>
  );
}
