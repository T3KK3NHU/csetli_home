import { useState, useEffect, useRef } from "react";
import LikeIcon from "../kepek/comment.png";
import Comment from "../kepek/Comment.png";
import "../style/style.css";
import { deleteBejegyzes, BASE } from "../api";

export default function PostCard({ bejegyzes_id, profilkep, felhasznalonev, feltoltotkep, szoveg }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const menuRef = useRef(null);

    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]); // Itt jönnek majd az API kommentek

    const addComment = () => {
        if (newComment.trim() === "") return;
        setComments([...comments, { id: Date.now(), user: "Én", text: newComment }]);
        setNewComment("");
    };

    const deleteComment = (id) => {
        setComments(comments.filter(c => c.id !== id));
    };

    const handleDeletePost = async () => {
        if (window.confirm("Biztosan törölni szeretnéd a posztot?")) {
            await deleteBejegyzes(bejegyzes_id);
            window.location.reload();
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) setShowMenu(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center m-3 text-white">
            <div className="bombo w-50 p-4 position-relative">
                <div className="position-absolute" style={{ top: "15px", right: "20px" }} ref={menuRef}>
                    <button className="btn text-white border-0 shadow-none" onClick={() => setShowMenu(!showMenu)}>&#8942;</button>
                    {showMenu && (
                        <div className="bg-dark border border-secondary rounded p-2 shadow" style={{ position: "absolute", right: 0, zIndex: 1000, minWidth: "120px" }}>
                            <div className="p-2 border-bottom border-secondary text-white" style={{ cursor: "pointer" }} onClick={() => setShowMenu(false)}>Szerkesztés</div>
                            <div className="p-2 text-danger" style={{ cursor: "pointer" }} onClick={handleDeletePost}>Törlés</div>
                        </div>
                    )}
                </div>

                <div className="d-flex flex-row m-2">
                    <img style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }} src={profilkep || "https://via.placeholder.com/50"} alt="profil" />
                    <div className="mx-1 d-flex align-items-center" style={{ fontSize: "25px" }}>{felhasznalonev}</div>
                </div>

                <div className="m-2" style={{ background: "#333333", borderRadius: "45px", overflow: "hidden" }}>
                    {feltoltotkep && <img className="w-100" style={{ maxHeight: "300px", objectFit: "cover" }} src={`${BASE}/uploads/${feltoltotkep}`} alt="poszt" />}
                    {szoveg && <div className="p-3 fs-5">{szoveg}</div>}
                </div>

                <div className="d-flex flex-row m-2 align-items-center">
                    <div className="mx-1"><img src={LikeIcon} alt="like" /></div>
                    <div className="mx-1"><img src={LikeIcon} alt="like" /></div>
                    <div className="mx-1"><img src={LikeIcon} alt="like" /></div>
                    <div className="mx-1 ms-3">
                        <img src={Comment} alt="komment" />
                        <span className="ms-1 fw-bold" style={{ cursor: 'pointer' }} onClick={() => setShowModal(true)}>
                            {comments.length} hozzászólás
                        </span>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="custom-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="custom-modal-container row g-0" onClick={(e) => e.stopPropagation()}>
                        <div className="col-md-7 d-flex flex-column border-end border-secondary bg-darker overflow-hidden" style={{ height: "100%" }}>
                            <div className="image-placeholder-container d-flex align-items-center justify-content-center bg-black">
                                {feltoltotkep ? (
                                    <img className="main-post-image" src={`${BASE}/uploads/${feltoltotkep}`} alt="poszt" />
                                ) : (
                                    <div className="text-muted">Nincs csatolt kép</div>
                                )}
                            </div>
                            <div className="post-text-area p-4 overflow-auto no-scrollbar">
                                <div className="d-flex align-items-center mb-2">
                                    <img src={profilkep || "https://via.placeholder.com/40"} className="rounded-circle me-2" style={{width: "40px", height: "40px"}} alt="profil" />
                                    <strong className="text-info">@{felhasznalonev}</strong>
                                </div>
                                <p className="fs-5">{szoveg}</p>
                            </div>
                        </div>

                        <div className="col-md-5 d-flex flex-column bg-black overflow-hidden" style={{ height: "100%" }}>
                            <div className="p-3 border-bottom border-secondary d-flex justify-content-between align-items-center bg-dark">
                                <h5 className="m-0 fw-bold">Hozzászólások</h5>
                                <button className="btn-close btn-close-white shadow-none" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="flex-grow-1 p-3 no-scrollbar" style={{ overflowY: "auto" }}>
                                {comments.map(c => (
                                    <div key={c.id} className="comment-bubble mb-3 p-3">
                                        <div className="d-flex justify-content-between">
                                            <small className="fw-bold text-primary">@{c.user}</small>
                                            <button className="btn btn-sm text-danger border-0 p-0 shadow-none" onClick={() => deleteComment(c.id)}>×</button>
                                        </div>
                                        <div className="text-white pt-1">{c.text}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 border-top border-secondary bg-dark mt-auto">
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        className="form-control shadow-none" 
                                        placeholder="Írj valamit..." 
                                        value={newComment} 
                                        onChange={(e) => setNewComment(e.target.value)} 
                                        onKeyPress={(e) => e.key === 'Enter' && addComment()}
                                        style={{ color: "black", backgroundColor: "white", fontWeight: "600" }} 
                                    />
                                    <button className="btn btn-primary px-4 fw-bold" onClick={addComment}>Küldés</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <style>{`
                        .custom-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px; }
                        .custom-modal-container { background: #1a1a1a; width: 95vw; max-width: 1100px; height: 85vh; border-radius: 15px; overflow: hidden; border: 1px solid #444; }
                        .image-placeholder-container { height: 65%; background: #000; border-bottom: 1px solid #333; }
                        .main-post-image { max-height: 100%; max-width: 100%; object-fit: contain; }
                        .post-text-area { height: 35%; background: #111; }
                        .comment-bubble { background: #222; border-radius: 10px; border-left: 4px solid #0d6efd; }
                        .no-scrollbar::-webkit-scrollbar { display: none; }
                        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                    `}</style>
                </div>
            )}
        </div>
    );
}