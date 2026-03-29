export default function Button({content,  onClick}){
    return(
        <div>
            <div className={`btn csetliColor`} onClick={onClick}>{content} </div>
        </div>
    )
}