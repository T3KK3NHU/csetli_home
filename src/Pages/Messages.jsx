import Navbar from "../Components/Navbar";
import simplehaz from "../kepek/feketeHaz.svg"
import messages from "../kepek/feketeKomment.svg"
import settings from "../kepek/feketeSettings.svg"
import people from "../kepek/feketePeople.svg"
import useLanguage from "../language"
import React, { useState, useEffect } from "react"

export default function Messages() {

    const [lang, setLang] = useState(1);

    useEffect(() => {
        const language = JSON.parse(localStorage.getItem("language")) || { lang: "0" };
        setLang(useLanguage(language.lang));
    }, []);

    return (
        <div className="background">
                <Navbar homeI={simplehaz} messagesI={messages} peopleI={people} settingsI={settings}/>
                <div>EZ EGY ÜZENEET?</div>
        </div>
    )
}