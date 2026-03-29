import Navbar from "../Components/Navbar";
import simplehaz from "../kepek/feketeHaz.svg"
import messages from "../kepek/feketeKomment.svg"
import settings from "../kepek/feketeSettings.svg"
import people from "../kepek/feketePeople.svg"
import useLanguage from "../language"
import React, { useState, useEffect } from "react"
import Language from "../Components/Lanugage";
import Button from "../Components/Button";

export default function Settings() {

    const [lang, setLang] = useState(useLanguage(1))

    useEffect(() => {
        // a localstorage-et beolvassuk
        const language = JSON.parse(localStorage.getItem("language")) || { lang: "0" }
        setLang(useLanguage(language.lang))
        console.log(lang.username);
    }, [])

    return (
        <div className="background vh-100">
            <Navbar homeI={simplehaz} messagesI={messages} peopleI={people} settingsI={settings} />
            <h1 className="d-flex text-align-center justify-content-center">Beállítások</h1>

            <div className="d-flex flex-column justify-content-center align-items-start">
                <div className="p-4">
                    <div className="align-self-start csetliColor">
                        <h5>
                            <input placeholder="Új Felhasználónév" className="py-3 text-center" />
                            <button className="text-sm px-8 py-2">Módosítás</button>
                            
                        </h5>
                    </div>
                    <div className="align-self-end csetliColor">
                        <h5>Nyelv
                        <Language/>
                        <Button content={"Módositás"}/></h5>
                    </div>
                </div>
            </div>
        </div>

    )
}

{/* <div className="flex flex-col gap-2">
                    <input placeholder="Régi jelszó" className="px-6 py-2 w-64 text-center" /><br/>
                    <input placeholder="Új Jelszó" className="px-6 py-2 w-64 text-center " /><br/>
                    <input placeholder="Új Jelszó" className="px-6 py-2 w-64 text-center " /><br/>
                    <button className="text-sm px-8 py-2">Módosítás</button>
                    </div>
                    
                    </div> */}