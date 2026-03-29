import { Link } from "react-router-dom"


export default function Navbar({homeI,messagesI,settingsI,peopleI}) {
    return (
        <div>
            <nav className=" navbar navbar-expand-lg bg-dark width-lg ">
                <div className="container-fluid justify-content-center">
                    <Link to={"/mainmenu"}><img className="icon" src={homeI} alt="Main Menu" /></Link>
                    <Link to={"/messages"}><img className="icon" src={messagesI} alt="Messages" /></Link>
                    <Link to={"/people"}><img className="icon " src={peopleI} alt="People" /></Link>
                    <Link to={"/settings"}><img className="icon" src={settingsI} alt="Settings" /></Link>
                </div>
            </nav>
        </div>
    )
}
