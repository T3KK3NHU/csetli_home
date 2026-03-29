import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import csetliLogo from "../kepek/csetli.png";
import theme from "../kepek/sun.png";
import "../style/style.css"
import Language from "../Components/Lanugage";
import useLanguage from "../language"

export default function AboutusPage() {

    const [lang, setLang]= useState(useLanguage(1))

    useEffect(()=>{
        // a localstorage-et beolvassuk
        const language = JSON.parse(localStorage.getItem("language")) || {lang: "0"}
        setLang(useLanguage(language.lang))
        console.log(lang.username);
    },[])

    return (
        <div className="background">
            <div className="d-flex  justify-content-end align-items-start ">
                <Language />
                <div>
                    <img width={50} src={theme} alt="Theme" />
                </div>
            </div>
            <div className="">

            </div>
            <div className=" d-flex justify-content-center align-items-center ">
                <img src={csetliLogo} alt="CsetliLogo" />
            </div>
            <div className="d-flex  justify-content-center align-items-center text-white ">{lang.abautus}</div>
            <div className="text-center mt-2">
                <Link to="/" className="csetliColor text-decoration-none m-3">Vissza a főoldalra</Link>
            </div>
        </div>


    )
}
