import React from "react";
import Particles from "./Particles/Particles";
import FuzzyText from "./FuzzyText/FuzzyText";

function ErrorPage() {
  return (
    <div className="relative">
      <div className="h-screen w-full bg-black relative"
    
      >
        <Particles
          particleColors={["#000000", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />

        <div className="absolute z-10  top-1/2 left-1/2 -translate-1/2 ">
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.93}
            enableHover={true}
          >
            404 not found
          </FuzzyText>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
