function Score({score, high}) {
  return (
    <div className="scoreDisplay">
      <p className="score">Score: {score}</p>
      <p className="high">High Score: {high}</p>
    </div>
  )
}
export default Score;