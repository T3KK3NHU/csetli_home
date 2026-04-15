import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // to get ismerosId from URL
import Navbar from "../Components/Navbar";
import simplehaz from "../kepek/feketeHaz.svg";
import messagesIcon from "../kepek/feketeKomment.svg";
import settings from "../kepek/feketeSettings.svg";
import people from "../kepek/feketePeople.svg";
import useLanguage from "../language";
import BaratokCard from "../Components/BaratokCard";
import UzenetekCard from "../Components/UzenetekCard";
import { ismerosok as fetchIsmerosok, getUzenetek, BASE } from "../api";

export default function Messages() {
    const [smerosok, setIsmerosok] = useState([]);
    const [lang, setLang] = useState(1);
    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.felhasznalo_id;

    const { ismerosId } = useParams();

    const myProfilePic = user?.kep || `${BASE}/defaultMyProfilePic.png`;
    const friendProfilePic = `${BASE}/defaultFriendProfilePic.png`;

    useEffect(() => {
        (async () => {
            const data = await fetchIsmerosok();
            if (data.result && Array.isArray(data.ismerosok)) {
                setIsmerosok(data.ismerosok);
            } else {
                setIsmerosok([]);
            }
        })();

        const language = JSON.parse(localStorage.getItem("language")) || { lang: "0" };
        setLang(useLanguage(language.lang));
    }, []);

    useEffect(() => {
        if (!userId || !ismerosId) return;

        async function loadMessages() {
            setLoadingMessages(true);
            const { result, message } = await getUzenetek(ismerosId);
            if (result && message.uzenetek) {
                const formattedMessages = message.uzenetek.map((msg) => ({
                    text: msg.szoveg,
                    isSent: msg.felhasznalo_id === userId,
                }));
                setMessages(formattedMessages);
            } else {
                setMessages([]);
            }
            setLoadingMessages(false);
        }

        loadMessages();
    }, [userId, ismerosId]);


    return (
        <div className="background" style={{ height: "100vh", overflow: "hidden" }}>
            <Navbar homeI={simplehaz} messagesI={messagesIcon} settingsI={settings} peopleI={people} />
            <div className="row d-flex flex-column justify-content-start background text-white" style={{ paddingTop: "100px" }}>
                <div className="d-flex flex-row container">
                    {/* Friends */}
                    <div className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex flex-column vh-80 align-items-start m-3 bombo px-4 p-2">
                        <div className="d-flex flex-row mt-5">
                            <h4 className="d-flex text-white">Barátok</h4>
                            <div className="m-1">( {smerosok.length} )</div>
                        </div>
                        {smerosok.length > 0 ? (
                            smerosok.map((ismeros, index) => (
                                <BaratokCard
                                    key={index}
                                    profilkep={`${BASE}/uploads/${ismeros.kep}`}
                                    felhasznalonev={ismeros.felhasznalo_nev}
                                />
                            ))
                        ) : (
                            <p>Nincsenek barátaid :(</p>
                        )}
                    </div>

                    {/* Messages resz */}
                    <div
                        className="d-flex align-items-start bombo m-3"
                        style={{ height: "815px", overflowY: "auto", scrollbarWidth: "none" }}
                    >
                        <div className="flex-grow-1 d-flex flex-column h-100 p-3">
                            {/* Messages */}
                            <div className="flex-grow-1">
                                {loadingMessages ? (
                                    <p>Loading messages...</p>
                                ) : messages.length > 0 ? (
                                    messages.map((msg, index) => (
                                        <UzenetekCard
                                            key={index}
                                            profilkep={msg.isSent ? myProfilePic : friendProfilePic}
                                            balUzenet={!msg.isSent ? msg.text : null}
                                            jobbUzenet={msg.isSent ? msg.text : null}
                                        />
                                    ))
                                ) : (
                                    <p>Nincsenek üzenetek.</p>
                                )}
                            </div>

                            {/* Input */}
                            <div className="d-flex p-2" style={{ maxWidth: "97%" }}>
                                <input className="form-control" placeholder="Üzenet..." />
                                <button className="btn csetliColor me-auto">Küldés</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
