import "./About.css";

function About() {
  return (
    <div className="about-container">

      <h1>ℹ️ About Project</h1>

      <div className="about-card">
        <p>
          This project detects forest fire using <b>dual modality input</b>:
          RGB + Thermal Images.
        </p>

        <p>
          Built using <b>React (Frontend)</b>, <b>Flask (Backend)</b>, and
          <b> Machine Learning Model</b>.
        </p>
      </div>

      <div className="about-section">
        <h3>🚀 Key Features</h3>
        <ul>
          <li>🔥 Fire detection from image</li>
          <li>📊 Risk Meter visualization</li>
          <li>📈 Risk Factor Breakdown Chart</li>
          <li>🌡 Sensor based risk analysis</li>
          <li>🛰 Dual Modality (Image + Sensor Data)</li>
          <li>📋 Detection history tracking</li>
          <li>📍 Location based monitoring</li>
        </ul>
      </div>

      <div className="about-section">
        <h3>🌍 How It Helps</h3>
        <ul>
          <li>Early forest fire detection</li>
          <li>Reduces environmental damage</li>
          <li>Helps disaster management teams</li>
          <li>Works with UAV drone systems</li>
        </ul>
      </div>

      <div className="about-section">
        <h3>🔮 Future Scope</h3>
        <ul>
          <li>Real-time satellite integration</li>
          <li>Mobile alert system</li>
          <li>Live dashboard monitoring</li>
          <li>Drone based automatic scanning</li>
        </ul>
      </div>

      <h2 className="team-title">👨‍💻 Project Team</h2>

      <div className="team-container">

        <div className="team-card">
          <h3>Bharti Chaudhary</h3>
          <p className="role">Frontend Developer</p>
          <p>
            Developed UI Dashboard, Risk Meter, Detection Page,
            History Page and Visualization Components.
          </p>

          <div className="social">
            <a href="https://github.com/Bhartichaudhary-git" target="_blank">
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/bharti-chaudhary-a00a14349"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Tahaseen */}
        <div className="team-card">
          <h3>Tahaseen Khan</h3>
          <p className="role">Backend Developer</p>

          <p>
            Built Flask API, handled image processing,
            server communication and system integration.
          </p>

          <div className="social">
            <a href="https://github.com/innovativetahaseen" target="_blank">
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/tahaseen-khan-78a18a324"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Shaurya */}
        <div className="team-card">
          <h3>Shaurya Singhal</h3>
          <p className="role">ML Model Developer</p>

          <p>
            Developed Machine Learning model for fire detection
            using image analysis and thermal data.
          </p>

          <div className="social">
            <a
              href="https://github.com/shauryasinghalcsaiml24-rgb"
              target="_blank"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/shaurya-singhal-b0979a165"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;