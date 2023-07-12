import { useParams } from "react-router-dom";

function SayColor() {
  const { word, color1, color2 } = useParams();

  const styles = {
    color: color1,
    backgroundColor: color2
  };

  return <h1 style={styles}>{word}</h1>;
}
export default SayColor;