import Button from "../Components/Button";
export default function PeopleCard({felhasznalonev,image,onClick,content}) {
    return (
        <div className="bombo" style={{ borderRadius: "45px", padding: "20px", width: "250px", textAlign: "center", minHeight:"250px"}}>
                   <div>
                       <img src={image} style={{ width: "100%", borderRadius: "20px", marginBottom: "15px", maxHeight:"200px", minHeight:"200px"}} />
                   </div>
                   <div className=" d-flex align-items-start" style={{ color: "white" }}>{felhasznalonev}</div>
                   <div style={{ background: "#333333 ", borderRadius: "45px"}}>
                       <Button content={content} style={{  borderRadius: "15px", boxShadow: "0px 4px 10px ",width:"200px"}} onClick={onClick}/>
                   </div>
               </div>
    )
}