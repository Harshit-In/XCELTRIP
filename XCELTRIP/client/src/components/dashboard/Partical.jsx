import React, { useEffect } from "react";

export default function Partical() {
  useEffect(() => {
    setTimeout(
      () =>
        window?.tsParticles?.load("tsparticles", {
          fps_limit: 60,
          background: {
            color: "#none",
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              ondiv: [
                {
                  enable: true,
                  elementId: "bubble--div",
                  mode: "bubble",
                  type: "",
                },
                {
                  enable: true,
                  elementId: "repulse--div",
                  mode: "repulse",
                  type: "",
                },
                {
                  enable: true,
                  elementId: "bubble-rectangle-div",
                  mode: "bubble",
                  type: "rectangle",
                },
                {
                  enable: true,
                  elementId: "repulse-rectangle-div",
                  mode: "repulse",
                  type: "rectangle",
                },
              ],
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.5,
                size: 6,
                speed: 3,
                color: "#000000",
              },
              grab: { distance: 400, line_linked: { opacity: 0.5 } },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#84dd33bf" },
            line_linked: {
              color: "#ff24b259",
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
              bounce: false,
              direction: "none",
              enable: true,
              out_mode: "out",
              random: false,
              speed: 2,
              straight: false,
            },
            number: { density: { enable: true, value_area: 800 }, value: 80 },
            opacity: {
              anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
              random: false,
              value: 0.5,
            },
            shape: {
              type: "",
            },
            size: {
              anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
              random: true,
              value: 5,
            },
          },
          polygon: {
            draw: { enable: false, lineColor: "#ffffff", lineWidth: 0.2 },
            move: { radius: 10 },
            scale: 1,
            type: "none",
            url: "",
          },
          retina_detect: true,
        }),
      200
    );
  }, []);
  return (
    <div id="particles">
      <div id="tsparticles" style={{ zIndex: 0 }}></div>
    </div>
  );
}
