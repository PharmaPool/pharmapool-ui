import React from "react";

function MoreInfo() {
  const moreInfo = [
    {
      title: "Beyond Transactions",
      details:
        "Pharmapool isn't just about transactions; it's about fostering connections and empowering businesses to thrive. Our platform features robust communication tools, including chatrooms and business posts, allowing users to network and share insights within the community.",
    },
    {
      title: "Seamless Transactions, Secure Payments",
      details:
        "We prioritize security and convenience in every transaction. Pharmapool facilitates secure monetary transactions through dedicated wallets, ensuring peace of mind for all parties involved. With our streamlined logistics network, we manage the transfer of products from our warehouses to your doorstep, seamlessly bridging the gap between supply and demand.",
    },
    {
      title: "Expert Drug Information at Your Fingertips",
      details:
        "Navigate the complexities of pharmaceuticals with ease. Pharmapool provides comprehensive drug information, including a catalog of available medications and their respective brands. Have questions about a particular medication? Our community-driven platform allows users to share experiences and receive insightful answers.",
    },
    {
      title: "Join the Pharmapool Community Today",
      details:
        "Pharmapool is more than just a platform; it's a community of like-minded professionals dedicated to driving innovation in the pharmaceutical industry. Join us in shaping the future of pharmacy and unlock new opportunities for growth and success.",
    },
    {
      title: "Why Pharmapool?",
      details:
        "We're not just another marketplace. Pharmapool is the first of its kind, providing a tailored solution for pharmacists and pharmacies to expand their reach and enhance their businesses. With our user-friendly interface, comprehensive services, and commitment to excellence, Pharmapool is your ultimate partner in success.",
    },
  ];
  return (
    <div className="more_infos">
      {moreInfo.map((info, i) => (
        <div className="more_info" key={i}>
          <div>
          </div>
          <div>
            <h3>{info.title}</h3>
            <p>{info.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MoreInfo;
