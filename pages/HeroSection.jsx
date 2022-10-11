import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { ReactComponent as shortnerLogo } from "../public/LinkshortnerIcon.svg";
import { Spinner } from "reactstrap";

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
}

function HeroSection() {
  const context = useRouter();
  const [shortUrl, setshortUrl] = useState();
  const [isLoading, setisLoading] = useState(false);
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
          {isLoading ? (
            <button
              className="hero-submit"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Spinner color="white" />
            </button>
          ) : (
            <button
              className="hero-submit"
              onClick={async (e) => {
                e.preventDefault();
                setisLoading(true);
                //console.log(inputref.current.value);
                const shortnerResponse = await handleShortenClick(
                  inputref.current.value
                );
                setshortUrl(
                  shortnerResponse.host + "/" + shortnerResponse.shorturl
                );
                setisLoading(false);
              }}
            >
              Shorten
            </button>
          )}
        </div>
        {shortUrl && (
          <div className="hero-output">
            <p>Your short URL :</p>
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
              onClick={async (e) => {
                e.preventDefault();
                //console.log(inputref.current.value);
                navigator.clipboard.writeText(shortUrl);
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
