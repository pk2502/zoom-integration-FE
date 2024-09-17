import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MeetingForm = () => {
  const [meetingTopic, setMeetingTopic] = useState("");
  const [meetingPassword, setMeetingPassword] = useState("");
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    getAllMeetings();
  }, []);

  const handleCreateMeeting = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/zoom/meeting`,
        {
          topic: meetingTopic,
          password: meetingPassword,
        }
      );
      // setMeetings([...response.data.meetings]);
      // alert(`Meeting created! Meeting ID: ${response.data.meetingId}`);
    } catch (error) {
      console.error("Error creating meeting", error);
    }
  };

  const getAllMeetings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/zoom/meetings`
      );
      setMeetings([...response.data.meetings]);
    } catch (error) {
      console.error("Error listing meetings", error);
    }
  };

  return (
    <React.Fragment>
      <div>
        <h2>Create Meeting</h2>
        <input
          type="text"
          placeholder="Meeting Topic"
          value={meetingTopic}
          onChange={(e) => setMeetingTopic(e.target.value)}
        />
        <input
          type="text"
          placeholder="Meeting Password"
          value={meetingPassword}
          onChange={(e) => setMeetingPassword(e.target.value)}
        />
        <button onClick={handleCreateMeeting}>Create Meeting</button>
      </div>
      <div>
        <ul>
          {meetings &&
            meetings.length &&
            meetings.map((meeting) => (
              <li key={meeting.id}>
                <strong>{meeting.topic}</strong>
                <br />
                Start Time:{" "}
                {new Date(meeting.start_time).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
                <br />
                Duration: {meeting.duration} minutes
                <br />
                <Link to={`/join-meeting/${meeting.id}`}>Join Meeting</Link>
              </li>
            ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default MeetingForm;
