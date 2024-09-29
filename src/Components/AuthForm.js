import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import * as Auth from "./Auth"; // Adjust the import to your actual Auth component file

const videoSources = [
  "https://media.istockphoto.com/id/1202881496/video/transportation.mp4?s=mp4-640x640-is&k=20&c=kvzO1tlFuBkbept3U3r8SwyYyxbodzOrtyKLx9AT1Bw=",
  "https://media.istockphoto.com/id/1275071441/video/art-concept-design-with-funny-character.mp4?s=mp4-640x640-is&k=20&c=sjCjYjccz0a_P7OunO_bFQdMwMjcEkwr_z4nkKjUG_s=",
];

function AuthForm() {
  const [signIn, toggle] = useState(true); // State to toggle between forms
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null); // Reference to the video element
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
    }, 10000); // Change video every 10 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideoIndex]);

  const handleSignIn = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Add your logic for sign-in (if needed)
    navigate('/home'); // Navigate to Home after sign-in
  };

  const handleSignUp = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Add your logic for sign-up (if needed)
    navigate('/'); // Navigate to Home after sign-up
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={videoSources[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Auth.Container>
        <Auth.SignUpContainer signinIn={signIn}>
          <Auth.Form onSubmit={handleSignUp}> {/* Call handleSignUp on submit */}
            <Auth.Title>Create Account</Auth.Title>
            <Auth.Input type="text" placeholder="Name" required />
            <Auth.Input type="email" placeholder="Email" required />
            <Auth.Input type="password" placeholder="Password" required />
            <Auth.Button type="submit">Sign Up</Auth.Button>
          </Auth.Form>
        </Auth.SignUpContainer>

        <Auth.SignInContainer signinIn={signIn}>
          <Auth.Form onSubmit={handleSignIn}> {/* Call handleSignIn on submit */}
            <Auth.Title>Sign In</Auth.Title>
            <Auth.Input type="email" placeholder="Email" required />
            <Auth.Input type="password" placeholder="Password" required />
            <Auth.Anchor href="#">Forgot your password?</Auth.Anchor>
            <Auth.Button type="submit">Sign In</Auth.Button>
          </Auth.Form>
        </Auth.SignInContainer>

        <Auth.OverlayContainer signinIn={signIn}>
          <Auth.Overlay signinIn={signIn}>
            <Auth.LeftOverlayPanel signinIn={signIn}>
              <Auth.Title>Welcome Back!</Auth.Title>
              <Auth.Paragraph>
                To keep connected with us, please login with your personal info.
              </Auth.Paragraph>
              <Auth.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Auth.GhostButton>
            </Auth.LeftOverlayPanel>

            <Auth.RightOverlayPanel signinIn={signIn}>
              <Auth.Title>Hello, Friend!</Auth.Title>
              <Auth.Paragraph>
                Enter your personal details and start your journey with us.
              </Auth.Paragraph>
              <Auth.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Auth.GhostButton>
            </Auth.RightOverlayPanel>
          </Auth.Overlay>
        </Auth.OverlayContainer>
      </Auth.Container>
    </>
  );
}

export default AuthForm;
