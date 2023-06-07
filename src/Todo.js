function Todo(props){
    return(
        <div>
            {/* <h2>{props.id}</h2> */}
            <h3> Task:<span>{props.id}</span> {props.title}</h3>
        </div>
    )
}
export default Todo;