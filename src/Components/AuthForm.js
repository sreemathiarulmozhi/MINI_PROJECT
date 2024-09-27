import React, { useState, useEffect, useRef } from "react";
import * as Auth from "./Auth"; // Adjust the import to your actual Auth component file

// Replace these with your actual video URLs
const videoSources = [
  "https://media.istockphoto.com/id/1202881496/video/transportation.mp4?s=mp4-640x640-is&k=20&c=kvzO1tlFuBkbept3U3r8SwyYyxbodzOrtyKLx9AT1Bw=",
  //"https://media.istockphoto.com/id/1275089443/video/children-playing-with-funny-animals.mp4?s=mp4-640x640-is&k=20&c=o6nmMjlx_-y1Ssb8KUKGjrS3J5OjQe5pZLi_mFY7PrU=",
  "https://media.istockphoto.com/id/1275071441/video/art-concept-design-with-funny-character.mp4?s=mp4-640x640-is&k=20&c=sjCjYjccz0a_P7OunO_bFQdMwMjcEkwr_z4nkKjUG_s="
];

function AuthForm() {
  const [signIn, toggle] = useState(true); // State to toggle between forms
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null); // Reference to the video element

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
    }, 10000); // Change video every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    // Load the new video when currentVideoIndex changes
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideoIndex]);

  return (
    <>
      {/* Background Video */}
      <video
        ref={videoRef} // Attach the ref to the video element
        autoPlay
        loop
        muted
        style={{
          position: "fixed", // Fixed position to cover entire viewport
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // Ensure the video covers the viewport without distortion
          zIndex: -1, // Send the video behind other content
        }}
      >
        <source src={videoSources[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Auth.Container>
        {/* Sign Up Container */}
        <Auth.SignUpContainer signinIn={signIn}>
          <Auth.Form>
            <Auth.Title>Create Account</Auth.Title>
            <Auth.Input type="text" placeholder="Name" />
            <Auth.Input type="email" placeholder="Email" />
            <Auth.Input type="password" placeholder="Password" />
            <Auth.Button>Sign Up</Auth.Button>
          </Auth.Form>
        </Auth.SignUpContainer>

        {/* Sign In Container */}
        <Auth.SignInContainer signinIn={signIn}>
          <Auth.Form>
            <Auth.Title>Sign In</Auth.Title>
            <Auth.Input type="email" placeholder="Email" />
            <Auth.Input type="password" placeholder="Password" />
            <Auth.Anchor href="#">Forgot your password?</Auth.Anchor>
            <Auth.Button>Sign In</Auth.Button>
          </Auth.Form>
        </Auth.SignInContainer>

        {/* Overlay Container */}
        <Auth.OverlayContainer signinIn={signIn}>
          <Auth.Overlay signinIn={signIn}>
            {/* Left Overlay Panel for Sign In */}
            <Auth.LeftOverlayPanel signinIn={signIn}>
              <Auth.Title>Welcome Back!</Auth.Title>
              <Auth.Paragraph>
                To keep connected with us, please login with your personal info.
              </Auth.Paragraph>
              <Auth.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Auth.GhostButton>
            </Auth.LeftOverlayPanel>

            {/* Right Overlay Panel for Sign Up */}
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
