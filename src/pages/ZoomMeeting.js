import { ZoomMtg } from "@zoom/meetingsdk";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ZoomMeeting = () => {
  const { id } = useParams();
  useEffect(() => {
    // ZoomMtg.setZoomJSLib("https://source.zoom.us/2.12.0/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();
    ZoomMtg.setZoomJSLib("https://source.zoom.us/3.8.5/lib", "/av");
    fetch("http://localhost:8000/api/zoom/generateSignature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meetingNumber: id,
        role: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const signature = data.signature;
        ZoomMtg.init({
          leaveUrl: "http://localhost:3000/meeting",
          success: (success) => {
            console.log(success);
            ZoomMtg.join({
              sdkKey: process.env.REACT_APP_CLIENT_ID,
              meetingNumber: id,
              signature,
              userName: "Paritosh K",
              userEmail: "paritoshkhubchandani2@gmail.com",
              passWord: "admin",
              success: function () {
                console.log("Joined meeting successfully");
              },
              error: function (err) {
                console.log("Error joining meeting:", err);
              },
            });
          },
          error: function (err) {
            console.log("Error initializing Zoom:", err);
          },
        });
      })
      .catch((error) => {
        console.error("Error generating signature:", error);
      });
  }, [id]);
  return <React.Fragment>{id}</React.Fragment>;
};
export default ZoomMeeting;

// import { ZoomMtg } from "@zoomus/websdk";
// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";

// // Zoom SDK Initialization
// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();

// const ZoomMeeting = () => {
//   const { id } = useParams();
//   const API_KEY = process.env.REACT_APP_CLIENT_ID;
//   const API_SECRET = process.env.REACT_APP_CLIENT_SECRET;
//   const meetingNumber = id;
//   const role = 0;
//   const leaveUrl = "/meeting";
//   const userName = "Paritosh Khubchandani";
//   //   const userEmail = ""; // Optional, required for webinar
//   //   const passWord = "YOUR_MEETING_PASSWORD"; // if required

//   useEffect(() => {
//     const initZoom = async () => {
//       const signature = ZoomMtg.generateSignature({
//         meetingNumber: meetingNumber,
//         apiKey: API_KEY,
//         apiSecret: API_SECRET,
//         role: role,
//         success: function (res) {
//           console.log("Signature generated:", res.result);
//           startMeeting(res.result);
//         },
//         error: function (err) {
//           console.error("Error generating signature:", err);
//         },
//       });
//     };

//     const startMeeting = (signature) => {
//       ZoomMtg.init({
//         leaveUrl: leaveUrl,
//         isSupportAV: true,
//         success: function () {
//           ZoomMtg.join({
//             signature: signature,
//             meetingNumber: meetingNumber,
//             userName: userName,
//             apiKey: API_KEY,
//             // userEmail: userEmail,
//             // passWord: passWord,
//             success: function (res) {
//               console.log("Join meeting success");
//             },
//             error: function (err) {
//               console.error("Error joining meeting:", err);
//             },
//           });
//         },
//         error: function (err) {
//           console.error("Error initializing Zoom SDK:", err);
//         },
//       });
//     };

//     initZoom();
//   }, []);

//   //   return <div id="zoom-meeting-container">Zoom Meeting</div>;
//   return <div id="zoom-meeting-container">Check</div>;
// };

// export default ZoomMeeting;
