import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import TextBox from "../Components/TextBox"
import Button from "../Components/Button"
import { regisztracio } from "../api";
import { Link } from "react-router-dom";
import csetliLogo from "../kepek/csetli.png";
import Profilkep from "../kepek/csetlikereso.svg";
import "../style/style.css"
import useLanguage from "../language"

export default function RegistrationPage() {

    const [lang, setLang]= useState(useLanguage(1))

    useEffect(()=>{
        // a localstorage-et beolvassuk
        const language = JSON.parse(localStorage.getItem("language")) || {lang: "0"}
        setLang(useLanguage(language.lang))
        console.log(lang.username);
    },[])

    const [email, setEmail] = useState("");
    const [felhasználonev, setFelhasznalonev] = useState("");
    const [jelszo, setJelszo] = useState("");
    const [jelszo2, setJelszo2] = useState("");
    const [kep, setKep] = useState("")


    return (
        <div className="background ">
            <div className="vh-100 d-flex justify-content-center align-items-center ">
                <div> <img src={csetliLogo} alt="CsetliLogo" /> </div>

                <div style={{ minWidth: 400 }}>
                    <div className="text-center fs-1 csetliColor">{lang.register}</div>
                    <TextBox title={lang.username} type={"text"} placeholder={lang.username} value={felhasználonev} setValue={setFelhasznalonev} />
                    <TextBox title={lang.email} type={"email"} placeholder={lang.email} value={email} setValue={setEmail} />
                    <TextBox title={lang.password} type={"password"} placeholder={"********"} value={jelszo} setValue={setJelszo} />
                    <TextBox title={lang.passwordagain} type={"password"} placeholder={"********"} value={jelszo2} setValue={setJelszo2} />

                    <div className="csetliColor text-decoration-none text-center">
                        <Button content={lang.register} onClick={async () => {
                            if (!email || !felhasználonev || !jelszo || !jelszo2) {
                                return alert("Hiányos beviteli adat(ok)!")
                            }
                            if (jelszo !== jelszo2) {
                                return alert("A jelszavak nem egyeznek")
                            }
                            const res = await regisztracio(email, felhasználonev, jelszo)
                            alert(res.message)
                            if (res.result) {
                                // navigálás a bejelentkezésbe 
                                    navigate("/login")
                                
        
                            }
                        }}/>
                    </div>
                    <div className="text-center mt-2">
                        <Link to="/login" className="csetliColor text-decoration-none">{lang.haveaccount}</Link>
                    </div>
                    <div className="text-center mt-2">
                        <Link to="/" className="csetliColor text-decoration-none">{lang.backtohome}</Link>
                    </div>
                </div>
                <div style={{ minWidth:400}}>
                    <div className="text-center mt-1 ">
                        <img src={Profilkep} alt="Itt tölts fel profilképet" width={200}/>
                            <div className="csetliColor">
                                <Button content={lang.upload} value={kep} setValue={setKep} />
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}