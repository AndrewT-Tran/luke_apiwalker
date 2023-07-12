import React from 'react'
import {useParams} from 'react-router-dom'
const SayWord = () => {
  const { word } = useParams()
  const isNumber = !isNaN(word)
  return (
    <div>
      <h1>
        {isNumber ? "The number is: " : "The word is: "}{word}
      </h1>
    </div>
  );
}

export default SayWord