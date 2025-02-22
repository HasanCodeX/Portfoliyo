import './Header.css';
import { Component } from "react";
import { motion } from "framer-motion";
import Switch from "react-switch"; // সুইচ ব্যবহারের জন্য
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { TypeAnimation } from 'react-type-animation';

class Header extends Component {
  titles = [];

  constructor() {
    super();
    // Set initial state to light theme (checked: false means light theme)
    this.state = { checked: false };
    this.onThemeSwitchChange = this.onThemeSwitchChange.bind(this);
  }

  componentDidMount() {
    // Always set light mode as the default theme on page load (if no theme stored in localStorage)
    document.body.setAttribute("data-theme", "light");

    // Get the theme from localStorage (if any) and set it
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      // If a theme is found in localStorage, set the theme and update the state
      document.body.setAttribute("data-theme", savedTheme);
      this.setState({ checked: savedTheme === "dark" });
    }
  }

  onThemeSwitchChange(checked) {
    this.setState({ checked }, () => {
      this.setTheme();
    });
  }

  setTheme() {
    const newTheme = this.state.checked ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    // Save the theme preference to localStorage
    localStorage.setItem("theme", newTheme);
  }

  render() {
    const { sharedData } = this.props;
    if (sharedData) {
      var name = sharedData.name;
      // Use titles or default value if not provided
      this.titles = sharedData.titles?.length
        ? sharedData.titles
            .map((x) => [x.toUpperCase(), 1500])
            .flat()
        : [];
    }

    return (
      <header style={{ height: window.innerHeight - 140, display: "block" }}>
        <div className="row aligner" style={{ height: "100%" }}>
          <div className="col-md-12">
            <div>
              {/* SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                focusable="false"
                width="4em"
                height="4em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 32 32"
                className="iconify header-icon"
                data-icon="la:laptop-code"
                data-inline="false"
                style={{ transform: "rotate(360deg)", fontSize: "50px" }}
              >
                <path
                  fill="currentColor"
                  d="M5 6v13.563l-2.281 2.314A2.44 2.44 0 0 0 2 23.594A2.42 2.42 0 0 0 4.406 26h23.188A2.42 2.42 0 0 0 30 23.594a2.45 2.45 0 0 0-.719-1.719L27 19.562V6zm2 2h18v11H7zm9 1l-1.5 9H16l1.5-9zm-3.914 2l-1.719 2.068L10 13.5l.367.432L12.086 16l1.086-.863L11.81 13.5l1.36-1.637zm7.828 0l-1.086.863L20.19 13.5l-1.36 1.637l1.085.863l1.719-2.068L22 13.5l-.367-.432zM6.437 21h19.125l2.313 2.281a.46.46 0 0 1 .125.313a.386.386 0 0 1-.406.406H4.406A.386.386 0 0 1 4 23.594c0-.11.047-.234.125-.313z"
                ></path>
              </svg>
              <br />
              
              {/* Name Animation */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="mb-0"
              >
                {name}
              </motion.h1>

              {/* Static Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="static-text"
              >
                 Mehedi Hasan
              </motion.p>

               {/* Dynamic Text */}
               <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1, delay: 1 }}
  className="banner-text"
>
  <TypeAnimation
    sequence={[
      'Frontend Developer', 1500,
      'React Enthusiast', 1500,
      'MERN Stack Developer', 1500
    ]}
    speed={50}
    repeat={Infinity}
  />
</motion.p>

               


              {/* Titles Animation */}
              <div className="title-container">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <span className="title-styles">
                    {this.titles.map((title, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.5 }}
                      >
                        {title}
                      </motion.span>
                    ))}
                  </span>
                </motion.div>
              </div>

              {/* Switch Component for Theme Toggle */}
              <Switch
                checked={this.state.checked}
                onChange={this.onThemeSwitchChange}
                offColor="#000000"
                onColor="#FFD700"
                className="react-switch mx-auto"
                width={90}
                height={40}
                uncheckedIcon={
                  <Icon
                    icon="twemoji:owl"
                    style={{
                      display: "block",
                      width: "100%",  // Make icon width 100% to fill the switch
                      height: "100%", // Ensure icon takes full height
                      fontSize: 25,
                      color: "#353239",
                      textAlign: "center", // Center the icon horizontally
                    }}
                  />
                }
                checkedIcon={
                  <Icon
                    icon="twemoji:sun-with-face"
                    style={{
                      display: "block",
                      width: "100%",  // Make icon width 100% to fill the switch
                      height: "100%", // Ensure icon takes full height
                      fontSize: 25,
                      color: "#353239",
                      textAlign: "center", // Center the icon horizontally
                    }}
                  />
                }
                id="icon-switch"
              />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  sharedData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Header;
