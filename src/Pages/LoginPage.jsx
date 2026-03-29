import { useEffect, useState } from "react"
import TextBox from "../Components/TextBox";
import Button from "../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import { belepes } from "../api";
import csetliLogo from "../kepek/csetli.png"
import "../style/style.css"
import useLanguage from "../language"



export default function LoginPage() {

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [jelszo, setJelszo] = useState("");

    const [lang, setLang]= useState(useLanguage(1))

    useEffect(()=>{
        // a localstorage-et beolvassuk
        const language = JSON.parse(localStorage.getItem("language")) || {lang: "0"}
        setLang(useLanguage(language.lang))
        console.log(lang.username);
    },[])

    return (
        <div className="vh-100 d-flex justify-content-center p-3 align-items-center background">
            <img src={csetliLogo} alt="CsetliLogo" width={200} />
            <div style={{ minWidth: 550 }}>
                <div className="text-center fs-1 mb-3 csetliColor">{lang.login}</div>
                <TextBox title={"E-mail vagy felhasználónév"} type={"text"} placeholder={lang.Placeholderemailorusername} value={usernameOrEmail} setValue={setUsernameOrEmail} />
                <TextBox title={"Jelszó"} type={"password"} placeholder={lang.placeholderpassword} value={jelszo} setValue={setJelszo} />

                <div className="text-center mt-3 csetliColor">
                    <Button content={lang.login} onClick={async () => {
                        if (!usernameOrEmail || !jelszo) {
                            alert("A felhasználónév vagy Email jelszópáros megadása kötelező")
                            return;
                        }
                        const res = await belepes(usernameOrEmail, jelszo);
                        alert(res.message)
                        if (res.result) {
                            // navigálás a bejelentkezésbe
                            navigate("/")
                        }
                    }} />
                </div>

                <div className="text-center mt-3">
                    <Link to="/registration" className="csetliColor text-decoration-none">{lang.donthaveaccount}</Link>
                </div>
                <div className="text-center mt-2">
                    <Link to="/mainmenu" className="csetliColor text-decoration-none">vendég fiók</Link>
                </div>
                <div className="text-center mt-2">
                    <Link to="/" className="csetliColor text-decoration-none">{lang.backtohome}</Link>
                </div>
            </div>
        </div>
    )
}