import React, { useEffect,useState } from 'react';
import $ from 'jquery';
import { useLocation, Link } from "react-router-dom";
import "./notifactaionpop.css"
import api from '../api';
import { postAPICall, postAPICallto } from '../components/request';
const Notification = (props) => {
const [imagesdata,Setimagedata]=useState([]);
    const location = useLocation();
    const Allretbox = () => {
        $(function () {
            var overlay = $('<div id="overlay"></div>');
            overlay.show();
            overlay.appendTo(document.body);
            $('.popup').show();
            $('.closebtnn').click(function () {
                $('.popup').hide();
                overlay.appendTo(document.body).remove();
                return false;
            });

            $('.x').click(function () {
                $('.popup').hide();
                overlay.appendTo(document.body).remove();
                return false;
            });
        });
    }
    

   
    useEffect(() => {
         Allretbox();
        api.get('notification/last_notification').then((res) => { 
           
           console.log("tgiouse",res?.data?.banner);
            Setimagedata(res?.data?.banner)
          })
       
    }, [])
    return (
        <div>
            <div class='popup'  style={{position:"fixed",height:"100%",width:"100%",zIndex:"100"}}>
                <div class="card  h-100 w-100" >
                <div className=" w-100  h-100">
            
                    <img class="cnt223" src={`http://api.myfastearn.in/${imagesdata}`} alt="Card image cap" />
                    </div>
                    <a href='' class='closebtnn mt-2' style={{ fontSize: "17px" }}>Close</a>
                    <br />


              
              </div>
            </div>
        </div>
    )
}

export default Notification
