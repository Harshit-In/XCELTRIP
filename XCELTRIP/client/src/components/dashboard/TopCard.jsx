import React from "react";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";
export default function TopCard(props) {
  const { id, wallet } = useSelector((state) => state.userinfo);
  return (
  
        <div
          className="btn-group bg-white h-100 p-3"
          role="group"
          aria-label="Basic example"
          style={props.visible?{width:"100%",border:"2px solid #517197"}:{width:"100%",visibility:"hidden"  }}
        >
          <button
            type="button"
            className="btn btn-link text-light py-0 border-right"
          >
            <span>
              <b style={{color:"#517197"}}>{props.name}</b>
            </span>
          </button>
          <button
            type="button"
            className="btn btn-link text-dark py-0"
          >
            <span>{props.value}</span>
          </button>
      
      {/* <div className="col-sm-4">
        <div
          className="btn-group bg-white p-3"
          role="group"
          aria-label="Basic example"
          style={{ width: "100%" }}
        >
          <input type="text" id="reffer_link" value={`https://fessglobe.live//create/ref/${id}`} style={{zIndex:-9,height:0,width:0}} readOnly/>
          <button
            type="button"
            className="btn btn-link text-light py-0 border-right"
          >
            <span>
              <img src="/assets/images/referral code.svg" />
              
            </span>
          </button>
          <button
            type="button"
            className="btn btn-link text-dark py-0 border-right"
          >
            <span>https://fessglobe.live/create/ref/{id}</span>
          </button>
          <button type="button" className="btn btn-link text-light py-0" onClick={()=>{
             var copyText = document.getElementById("reffer_link");
             copyText.select();
             copyText.setSelectionRange(0, 99999);
             document.execCommand("copy");
             navigator.clipboard.writeText(copyText.value);
             NotificationManager.success("URL Copied!");
          }}>
            <span className="copybtn" >
              <img src="/assets/images/copy.png" />
            </span>
          </button>
        </div>
      </div> */}
     
    </div>
  );
}
