import React from "react";
import images from "../../../data/images";

function Info() {
  const services = [
    {
      type: "Posts",
      details: [
        "Post job vacancies",
        "Share information about drugs",
        "Make enquires about drugs",
      ],
    },
    {
      type: "Chats",
      details: [
        "Chat with others",
        "Share useful information with other users",
        "Consult a pharmacist",
      ],
    },
    {
      type: "Chatrooms",
      details: [
        "Form business groups",
        "Join development groups",
        "Create research groups",
      ],
    },
    {
      type: "Product Gallery",
      details: [
        "List of drug generics",
        "List of available brands",
        "Surveys on your best brands",
      ],
    },
  ];
  return (
    <div className="info">
      <h1>We also offer</h1>
      <div className="home_services">
        <div className="home_serv">
          <div className="service_details">
            <h1>{services[0].type}</h1>
            <ul>
              {services[0].details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
          <div className="service_img">
            <img src={images.post} alt="demand_image" />
          </div>
        </div>
        <div className="home_servic">
          <div className="service_img">
            <img src={images.chatroom} alt="demand_image" />
          </div>
          <div className="service_details">
            <h1>{services[2].type}</h1>
            <ul>
              {services[2].details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="home_serv">
          <div className="service_details">
            <h1>{services[1].type}</h1>
            <ul>
              {services[1].details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
          <div className="service_img">
            <img src={images.chat} alt="demand_image" />
          </div>
        </div>
        <div className="home_servic">
          <div className="service_img">
            <img src={images.productGallery} alt="demand_image" />
          </div>
          <div className="service_details">
            <h1>{services[3].type}</h1>
            <ul>
              {services[3].details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
