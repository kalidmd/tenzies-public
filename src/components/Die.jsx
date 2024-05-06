export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#ffff"
    }
    return(
        <div 
            className="die" 
            style={styles}
            onClick={props.holdDice}
        >
            {props.value}
        </div>
    )
}