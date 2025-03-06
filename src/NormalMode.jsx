const NormalMode = ({flashcards, handleSubmit, handleDelete, frontInput, backInput, handleFrontInput, handleBackInput, clearFlashcards}) => {

    return (
        <div className="normal-mode-container">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="frontInput" 
                    id="frontInput" 
                    placeholder='Front side...'
                    value={frontInput}
                    onChange={handleFrontInput}/>
                <input 
                    type="text" 
                    name="backInput" 
                    id="backInput" 
                    placeholder='Back side...' 
                    value={backInput}
                    onChange={handleBackInput}/>
                <button className="add-flashcard-btn">Add Flashcard</button>
                <button className="clear-flashcards-btn" onClick={clearFlashcards}>Clear flashcards</button>
            </form>
            <p>Total flashcards: {flashcards.length}</p>
            
            <br />
            
            {flashcards.length > 0 ? (
                <div className="flashcard-container">
                {flashcards.map((flashcard, index) => {
                    return (
                    <div key={index} className="flashcard">
                        <button className="dlt-flashcard-btn" onClick={() => handleDelete(index)}>del</button>
                        <p><span className='flashcard-text'>Front: </span>{flashcard.front}</p>
                        <hr />
                        <p><span className='flashcard-text'>Back: </span>{flashcard.back}</p>
                    </div>
                    )
                })}
                </div>
            ) : (
                <div>Add a flashcard to show them here</div>
            )}
        </div>
    )
}

export default NormalMode;