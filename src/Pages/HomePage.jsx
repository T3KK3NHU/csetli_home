import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import TextBox from "../Components/TextBox"
import Button from "../Components/Button"
import { Link, useNavigate } from "react-router-dom";
import csetliLogo from "../kepek/csetli.png";
import Profilkep from "../kepek/search.webp";
import "../style/style.css"
import useLanguage from "../language";
import Language from "../Components/Lanugage";
import theme from "../kepek/sun.png";

export default function HomePage() {

    const [lang, setLang] = useState(useLanguage(1))

    useEffect(() => {
        // a localstorage-et beolvassuk
        const language = JSON.parse(localStorage.getItem("language")) || { lang: "0" }
        setLang(useLanguage(language.lang))
        console.log(lang.username);
    }, [])

    return (

        <div className="background">
            <div className="d-flex  justify-content-end align-items-start ">
                <Language />
                <div>
                    <img width={50} src={theme} alt="Theme" />
                </div>
            </div>
            <div className="d-flex vh-100 justify-content-center align-items-center ">
                <div>
                    <div>
                        <img src={csetliLogo} alt="csetliLogo" width={400} />
                    </div>
                    <div>
                        <Link to="/registration" className=" text-decoration-none csetliColor">{lang.registration}</Link>
                    </div>
                    <div>
                        <Link to="/login" className=" text-decoration-none csetliColor ">{lang.login}</Link>
                    </div>
                    <div>
                        <Link to="/about" className=" text-decoration-none csetliColor ">{lang.abautus}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}        