import LikeIcon from "../kepek/like.png"
import Comment from "../kepek/feketeKomment.svg"

export default function PostCard({profilkep,felhasznalonev,feltoltotkep,szoveg}) {
    return (
        <div className="d-flex vh-100 flex-column justify-content-center align-items-center background text-white">
            <div>
                <div className="d-flex flex-row">
                    <div><img src={profilkep}/>Profilkep</div>
                    <div>{felhasznalonev}</div>
                </div>
                <div className="d-flex flex-row">
                    <div><img src={feltoltotkep}/>feltoltott kep</div>
                    <div>{szoveg}</div>
                </div>
                <div className="d-flex flex-row">
                    <div><img src={LikeIcon} alt="" /></div>
                    <div><img src={Comment} alt="" /></div>
                </div>


            </div>
        </div>
    )
}
