import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { ReactComponent as shortnerLogo } from "../public/LinkshortnerIcon.svg";

async function handleShortenClick(longUrl) {
  const response = await fetch("/api/Shorten", {
    method: "POST",
    body: JSON.stringify({ longUrl }),
    headers: {
      "content-type": "application/json",
    },
  });
  const shortnerReponse = await response.json();
  return shortnerReponse;
  console.log("inside herosection>handleshortenclick :" + name);
  console.log(name);
  

  // console.log(name);

  // var code = 1;

  // var base36string = [];
  // var shortenedURL = "";
  // var digit = 0;
  // while (code > 0) {
  //   digit = code % 62;
  //   base36string.push(digit);
  //   code = parseInt(code / 62);
  // }

  // base36string = base36string.reverse();

  //console.log(base36string);
  // for (let i = 0; i < base36string.length; i++) {
  //   if (base36string[i] >= 0 && base36string[i] < 26) {
  //     shortenedURL += String.fromCharCode(base36string[i] + 65);
  //   } else if (base36string[i] > 25 && base36string[i] < 52) {
  //     shortenedURL += String.fromCharCode((base36string[i] % 26) + 97);
  //   } else {
  //     shortenedURL += String.fromCharCode(base36string[i] - 52 + 48);
  //   }
  // }
  // console.log(shortenedURL);
}

function HeroSection() {
  const context = useRouter();
  const [shortUrl, setshortUrl] = useState();
  // console.log("context: " + context);
  // console.log(context);

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

        <div className="hero-input">
          <div className="input-wrapper">
            <img src="/link.png" alt="" className="input-url-icon" />
            <input
              type="text"
              name="LongUrl"
              id=""
              ref={inputref}
              className="input-field"
              placeholder="Paste your url here"
            />
          </div>
          <button
            className="hero-submit"
            onClick={async(e) => {
              e.preventDefault();
              //console.log(inputref.current.value);
              const shortnerResponse=await handleShortenClick(inputref.current.value);
              setshortUrl(shortnerResponse.host+"/"+shortnerResponse.shorturl)

            }}
          >
            Shorten
          </button>
        </div>
        {shortUrl && (
          <div className="hero-output">
            <p>
              Your short URL : 
            </p>
            <div className="input-wrapper">
              <img src="/link.png" alt="" className="input-url-icon" />
              <input
                type="text"
                name="ShortUrl"
                id=""
                
                value={shortUrl}
                className="input-field"
              />
            </div>
            <button
              className="hero-submit"
              onClick={async(e) => {
                e.preventDefault();
                //console.log(inputref.current.value);
                navigator.clipboard.writeText(shortUrl)
              }}
            >
              Copy
            </button>
          </div>
        )}
      </div>
      <div className="hero-right">
        <img src="/LinkshortnerIcon.svg" alt="" className="hero-logo" />
      </div>
    </div>
  );
}

export default HeroSection;
