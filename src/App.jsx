import { useState } from 'react'
import NormalMode from "./NormalMode";
import StudyMode from './StudyMode';
import './App.css'

function App() {

  const [flashcards, setFlashcards] = useState([]);
  const [frontInput, setFrontInput] = useState('');
  const [backInput, setBackInput] = useState('');
  const [studyMode, setStudyMode] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (frontInput.trim() !== '' && backInput.trim() !== '') {
        const newFlashcards = [...flashcards, {front: frontInput, back: backInput}]
        setFlashcards(newFlashcards);
        setFrontInput('');
        setBackInput('');
        console.log("Flashcard added");
        document.getElementById('frontInput').focus();
        }
    }

    const handleFrontInput = (e) => {
      setFrontInput(e.target.value);
    }

    const handleBackInput = (e) => {
      setBackInput(e.target.value);
    }

    const handleDelete = (indexToDelete) => {
      const filteredFlashcards = flashcards.filter((card, index) => index !== indexToDelete);
      setFlashcards(filteredFlashcards);
    }

    const toggleStudyMode = () => {
      setStudyMode(!studyMode);
    }

    const clearFlashcards = () => {
      setFlashcards([]);
    }
  
  return (
    <div className="container">
      <h1>Flashy cards</h1>
      <button 
            className='study-mode-btn' 
            onClick={toggleStudyMode}>
            {studyMode ? "Exit study mode" : "Enter study mode"}
      </button>

      {!studyMode ? (
        <NormalMode
          flashcards={flashcards}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          frontInput={frontInput}
          backInput={backInput}
          handleFrontInput={handleFrontInput}
          handleBackInput={handleBackInput}
          clearFlashcards={clearFlashcards}
        />
      ) : (
        <StudyMode 
          flashcards={flashcards}
          setFlashcards={setFlashcards}
          totalCards={flashcards.length}
        />
      )}
    </div>
  )

}

export default App;