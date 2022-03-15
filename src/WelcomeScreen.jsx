import React from "react";
import './WelcomeScreen.css';

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
    (
        <div className="WelcomeScreen">
            <div className="welcome-title">
                <h1>Welcome to MeetYour-App</h1>
                <h4>See upcoming events around the world for Full-Stack Developers</h4>
            </div>
            <div className="button_cont" align="center">
                <div class="google-btn">
                <div class="google-icon-wrapper">
                    <img
                    class="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="Google sign-in"
                    />
                </div>
                <button onClick={() => { props.getAccessToken() }}
                    rel="nofollow noopener"
                    className="btn-text">
                    <b>Sign in with google</b>
                </button>
                </div>
            </div>
                <a
                className="privacy-link"
                href="https://JonsMendi.github.io/meet/privacy.html"
                rel="nofollow noopener">
                Privacy policy
                </a>
        </div>
    )
    : null
}
export default WelcomeScreen;