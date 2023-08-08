import { useState } from "react";
const AutoCorrect = () => {
    const style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
    };
    const [presentWord, setPresentWord] = useState("");
    const [correctSentence, setCorrectSentence] = useState("");
    const setText = (event) => {
        setPresentWord(event.target.value);
    }
    const autoCorrect = async () => {
        const words = presentWord.split(" ");
        const url = `https://api.textgears.com/correct?key=mYDjY3BacFYfFTN3&ai=1&text=${words.join("+")}`;
        try {
            const response = await fetch(url)
            .then(async (response) => 
            {
                const reader = await response.body.getReader();
                reader.read().then(({ done, value }) => {  
                    const decoded = new TextDecoder("utf-8").decode(value);
                    console.log("decoded",decoded);
                    const parsed = JSON.parse(decoded);
                    console.log(parsed.response);
                    setCorrectSentence(parsed.response.corrected);
                }
                );
            });
            console.log(response);
            const result = await response.body;
            console.log(result);
            setCorrectSentence(result);
        } catch (error) {
            console.error(error);
        }
    }

    
    return (
        <div style={style}>
            <h1>AutoCorrect</h1>
            <input type="text" name = "auto_correct_text" onChange={setText}/>
            <button onClick = {autoCorrect}>Auto Correct</button>
            <p>{correctSentence}</p>
        </div>
    );
}

export default AutoCorrect;