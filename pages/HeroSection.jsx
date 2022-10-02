import Image from "next/image";
import React, { useRef } from "react";
import { ReactComponent as shortnerLogo } from "../public/LinkshortnerIcon.svg";

function handleShortenClick(longUrl) {
  var code = 452554;

  var base36string = [];
  var shortenedURL = "";
  var digit = 0;
  while (code > 0) {
    digit = code % 62;
    base36string.push(digit);
    code = parseInt(code / 62);
  }

  base36string = base36string.reverse();

  //console.log(base36string);
  for (let i = 0; i < base36string.length; i++) {
    if (base36string[i] >= 0 && base36string[i] < 26) {
      shortenedURL += String.fromCharCode(base36string[i] + 65);
    } else if (base36string[i] > 25 && base36string[i] < 52) {
      shortenedURL += String.fromCharCode((base36string[i] % 26) + 97);
    } else {
      shortenedURL += String.fromCharCode(base36string[i] - 52 + 48);
    }
  }
  console.log(shortenedURL);
}

function HeroSection() {
  const inputref = useRef(null);
  return (
    <div className="hero-section">
      <div className="hero-left">
        <h1>Shorten any Url</h1>
        <p className="hero-subtitle">
          Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem Ipsum
          dolor sit amet
        </p>
        <p>Paste your url here</p>

        <div className="hero-input">
          <div className="input-wrapper">
            <img src="/link.png" alt="" className="input-url-icon" />
            <input
              type="text"
              name="LongUrl"
              id=""
              ref={inputref}
              className="input-field"
              placeholder="eg:https://www.google.com/"
            />
            
              
            
          </div>
          <button
                className="hero-submit"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(inputref.current.value);
                }}
              >
                Shorten
              </button>
        </div>
      </div>
      <div className="hero-right">
        <img src="/LinkshortnerIcon.svg" alt="" className="hero-logo" />
      </div>
    </div>
  );
}

export default HeroSection;
