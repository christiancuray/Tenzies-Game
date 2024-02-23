export default function Die(props) {
  // change the background color of the dice button based on whether it is held or not
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  // Return the dice button element

  return (
    <button
      style={styles}
      onClick={props.hold}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
    >
      {props.value}
    </button>
  );
}
