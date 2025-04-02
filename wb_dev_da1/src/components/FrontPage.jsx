import React from "react";
import BlurText from "C:/Users/samarth/Desktop/wb_dev_da1/src/animations/blur_stuff.jsx";
import ShinyText from 'C:/Users/samarth/Desktop/wb_dev_da1/src/animations/shiny_text';
import SpotlightCard from 'C:/Users/samarth/Desktop/wb_dev_da1/src/animations/SpotlightCard';
import Dock from 'C:/Users/samarth/Desktop/wb_dev_da1/src/animations/dock1';
import basketball from 'C:/Users/samarth/Desktop/wb_dev_da1/src/media/icons8-basketball-50.png';
import football from 'C:/Users/samarth/Desktop/wb_dev_da1/src/media/icons8-football-50.png';
import f1 from 'C:/Users/samarth/Desktop/wb_dev_da1/src/media/icons8-race-car-50.png';
import { Link } from 'react-router-dom';
import "./card.css";

const FrontPage = () => {
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div>
            <div id="top_box">
                
                <div style={{ textAlign: "center" }}>
                    <BlurText text="FullTime" />
                </div>
            </div>

            <div id="docking">
                <Dock
                    items={[
                        { id: "football", label: "Football", icon: <img src={football} alt="Cricket" width="40" height="40"/>, onClick: () => scrollToSection('sport_container') },
                        { id: "basketball", label: "Basektball", icon: <img src={basketball} alt="Football" width="40" height="40"/>, onClick: () => scrollToSection('sport_container1') },
                        { id: "f1", label: "F1 Racing", icon: <img src={f1} alt="Racecar" width="40" height="40"/>, onClick: () => scrollToSection('sport_container2') }
                    ]}
                    panelHeight={59}
                    baseItemSize={50}
                    magnification={85}
                />
            </div>

            {/* Football Section */}
            <div id="football_section">
                <div id="fade"></div>
                <div id="sport_container"></div>
                <h1 id="football_title"><ShinyText text="Football" disabled={false} speed={3} className='custom-class' /></h1>
                <div id="card1"><SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                    <center><a href="/ongoing" className="link"><h3>Ongoing Matches</h3></a></center>

                    <h1 id="spacing"></h1>
                </SpotlightCard></div>
                <div id="card2"><SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                    <center><a href="/past" className="link"><h3>Past Matches</h3></a></center>
                    <h1 id="spacing"></h1>
                </SpotlightCard></div>
                <div id="card3" ><SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                    <center><a href="/upcoming" className="link"><h3>Upcoming Matches</h3></a></center>
                    <h1 id="spacing"></h1>
                </SpotlightCard></div>
                <div id="fade1"></div>
            </div>

            {/* Basketball Section */}
            <div id="basketball_section">
                <div id="fade_1"></div>
                <div id="sport_container1"></div>
                <h1 id="basketball_title"><ShinyText text="Basketball" disabled={false} speed={3} className='custom-class' /></h1>
                <div id="card4"><SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                    <center><Link to="/basketball/ongoing" className="link"><h3>Ongoing Matches</h3></Link></center>
                    <h1 id="spacing"></h1>
                </SpotlightCard></div>
                <div id="card5"><SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                    <center><Link to="/basketball/past" className="link"><h3>Past Matches</h3></Link></center>
                    <h1 id="spacing"></h1>
                </SpotlightCard></div>
                <div id="card6"><SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                    <center><Link to="/basketball/upcoming" className="link"><h3>Upcoming Matches</h3></Link></center>
                    <h1 id="spacing"></h1>
                </SpotlightCard></div>
                <div id="fade2"></div>
            </div>

            {/* f1 Section */}
            <div id="f1_section">
                <div id="fade_2"></div>
                <div id="sport_container2"></div>
                <h1 id="f1_title"><ShinyText text="F1 Racing" disabled={false} speed={3} className='custom-class' /></h1>
                <div id="card7"><SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                    <center><h3>Ongoing Matches</h3></center>
                    <h1 id="spacing"></h1>
                </SpotlightCard></div>
                <div id="card8"><SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                    <center><h3>Past Matches</h3></center>
                    <h1 id="spacing"></h1>
                </SpotlightCard></div>
                <div id="card9"><SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                    <center><h3>Upcoming Matches</h3></center>
                    <h1 id="spacing"></h1>
                </SpotlightCard></div>
                <div id="fade3"></div>
            </div>
        </div>
    );
};

export default FrontPage;
