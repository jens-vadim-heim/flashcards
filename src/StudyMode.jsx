import { useState, useEffect } from 'react';

const StudyMode = ({flashcards, setFlashcards, totalCards}) => {

    const [cardIndex, setCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false)
    
    const flipCard= () => {
        setIsFlipped(!isFlipped)
    }

    const nextCard = (e) => {
        e.preventDefault();
        if (cardIndex+1 < flashcards.length) {
            setCardIndex(old => old + 1);
        }
    }

    const previousCard = (e) => {
        e.preventDefault();
        if (cardIndex > 0) {
            setCardIndex(old => old - 1);
        }
    }

    const shuffleFlashcards = () => {
        const flashcardsCopy = [...flashcards];
        for (let i = flashcardsCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [flashcardsCopy[i], flashcardsCopy[j]] = [flashcardsCopy[j], flashcardsCopy[i]];
        }
        setFlashcards(flashcardsCopy);
        setCardIndex(0);
    }

    useEffect(() => {
        setIsFlipped(false);
    }, [cardIndex]);

    return (
        <div className="study-container">
            {flashcards.length > 0 ? (
                <div className="content">  
                    <div className='randomize-counter'>
                        <button className='randomize-btn' onClick={shuffleFlashcards}>Shuffle</button>
                        <span>{cardIndex + 1}/{totalCards}</span>
                    </div>
                    <div className='flashcard study-mode' onClick={flipCard}>
                        {!isFlipped ? flashcards[cardIndex].front : flashcards[cardIndex].back}
                    </div>
                    <div className="buttons-container">
                        <button className="controls" onClick={previousCard} disabled={cardIndex === 0}>Prev</button>
                        <button className="controls" onClick={flipCard}>Flip</button>
                        <button className="controls" onClick={nextCard} disabled={cardIndex === flashcards.length-1}>Next</button>
                    </div>
                </div>
            ) : (
                <p>No flashcards to practice with!</p>
            )}
        </div>
    )
    
}

export default StudyMode;