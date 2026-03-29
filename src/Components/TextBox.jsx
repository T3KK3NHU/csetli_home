export default function TextBox({ title, placeholder, type, value, setValue }) {
    return (
        <div>
            <label for={title} className="form-label csetliColor">{title}</label>
            <input type={type} className="form-control white" id={title} placeholder={placeholder} value={value} onChange={(e) => setValue((e.target.value))}></input>
        </div>
    )
}