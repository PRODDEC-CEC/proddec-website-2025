import React from "react";
import ClipBox from "../../components/ClipPath/ClipPath";
import TextWithDot from "../../components/InlineComponents/TextWithDot/TextWithDot";
import styles from "./Service.module.css";
import Spacer from "../../components/Spacer/Spacer";

// Example data object (you can replace with API / DB later)
const data = {
  services: [
    {
      title: "Development",
      description:
        "We design and develop innovative products from concept to prototype, focusing on real-world usability.",
    },
    {
      title: "Consultation",
      description:
        "Providing expert guidance and mentoring for research, prototyping, and technical problem solving.",
    },
    {
      title: "Training",
      description:
        "Hands-on workshops to enhance technical skills, creativity, and industry readiness.",
    },
  ],
  projects: [
    {
      title: "Smart Irrigation System",
      description:
        "IoT-based solution that optimizes water usage in agriculture using real-time soil data.",
    },
    {
      title: "AI-Powered Health Assistant",
      description:
        "An intelligent assistant that provides preliminary health diagnostics and connects patients to doctors.",
    },
    {
      title: "Drone Surveillance",
      description:
        "Aerial drone system for monitoring large areas with real-time video analytics.",
    },
  ],
};

function Service() {
  return (
    <div className={styles.container}>
      <TextWithDot text="Our Services" transform="translateX(5.5rem)" />
      <Spacer />
      <h1 className={styles.Head}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
        omnis incidunt cum quos distinctio,{" "}
      </h1>
      <div className={styles.grid}>
      {data.services.map((service, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.titleWrapper}>
            <img
              src="https://cdn.prod.website-files.com/63c560228fad5afd4ddbe1b3/6440eebe555338b647258161_automate.svg"
              alt="icon"
              className={styles.icon}
            />
            <h3>{service.title}</h3>
          </div>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
       
    </div>
  );
}

export default Service;
