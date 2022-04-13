import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { ranks } from "./data";

export default function Downline(props) {
  const [childData, setChildData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [showTeam, toggleShowTeam] = useState(false);
  const { memberID } = props;
  console.log("MemberID", memberID);

  async function getChilds(memberID) {
    api.post("/userInfo", { member_id: memberID }).then((res) => {
      console.log(res.data);
      setUserInfo({ ...res.data.data });
      setChildData([...res.data.directChild]);
    });
  }

  useEffect(async () => {
    await getChilds(memberID);
  }, []);
  return (
    <>
      <div
        className="card card-body mb-2 py-2 position-relative"
        style={{ minWidth: "400px", maxWidth: "400px" }}
      >
        <div className="d-flex justify-content-between">
          <div>
            <div className="fw-bold" style={{ fontSize: "14px" }}>
              {userInfo?.member_id ?? "Member ID"}{" "}
              {`[ Rank : ${ranks[userInfo.level]} ]`}
            </div>
            <div className="fw-bold" style={{ fontSize: "12px" }}>
              <span className="me-2">Direct Business : {userInfo.direct_coin ?? 0}</span>
              <span>Total Business : {userInfo.total_coin ?? 0}</span>
            </div>
          </div>
          <div
            className={
              showTeam ? "fw-bold text-warning" : "fw-bold text-success"
            }
            style={{ fontSize: "12px", cursor: "pointer" }}
            onClick={() => {
              showTeam ? toggleShowTeam(false) : toggleShowTeam(true);
            }}
          >
            {showTeam ? "Hide Team" : "Show Team"}
          </div>
        </div>

        {childData && childData.length > 0 && (
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
            {childData.length}{" "}
            <span class="visually-hidden">unread messages</span>
          </span>
        )}
      </div>
      {showTeam && childData && childData.length > 0 && (
        <div className="border-start ps-4">
          {childData.map((child) => (
            <Downline memberID={child.member_id} />
          ))}
        </div>
      )}
    </>
  );
}
