import React, { useState } from "react";
import Navbar from "./../Navbar/Navbar";
import "./Profile.css";
import googleimage from "../../resources/google.svg";
import { useAuth } from "./../../contexts/AuthContext";
import Progress from "../../hooks/Progress";

function Profile() {
  const [pan, setPan] = useState("");
  const [panImage, setPanImage] = useState("");
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  const types = ["image/png", "image/jpeg"];

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(
      "working",
      fullname,
      currentUser,
      phonenumber,
      displayname,
      address,
      pan,
      panImage
    );
  };

  const pan_preview = (e) => {
    var image = document.getElementById("panImage");
    image.src = URL.createObjectURL(e.target.files[0]);

    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setPanImage(selected);
      setError("");
    } else {
      setPanImage("");
      setError("Please select an image file (png or jpg)");
    }
  };

  return (
    <>
      <Navbar />
      <div className="main__container">
        <div className="bg-layer">
          <h1>your profile</h1>

          {/* 728x90 */}
          <div className="profile__header__main">
            <div className="header__leftbottom">
              <form onSubmit={submitHandle}>
                <div className="profile__image">
                  <img src={googleimage} alt="" />
                </div>
                <div className="profile__Email">
                  <span>Email</span>
                  <span>{currentUser.email}</span>
                </div>

                <div className="profile__entry">
                  <span>PAN / VAT no.</span>
                  <input
                    className="profile__desc"
                    type="text"
                    placeholder="number"
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                  />
                  <div className="image">
                    <input
                      className="profile__descimg"
                      type="file"
                      onChange={pan_preview}
                    />
                    <img id="panImage" alt="" />
                    {error && <div>{error}</div>}
                    <Progress panImage={panImage} setPanImage={setPanImage} />
                  </div>
                </div>

                <div className="profile__entry">
                  <span>first and last name</span>
                  <input
                    className="product__desc"
                    type="text"
                    placeholder="full name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>

                <div className="profile__entry">
                  <span>Phone no.</span>
                  <input
                    className="product__desc"
                    type="text"
                    placeholder="number"
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                  />
                </div>

                <div className="product__entry">
                  <span>Display name/ subname</span>
                  <input
                    className="product__desc"
                    type="text"
                    placeholder="name to display"
                    value={displayname}
                    onChange={(e) => setDisplayname(e.target.value)}
                  />
                </div>

                <div className="product__entry">
                  <span>Address</span>
                  <input
                    className="product__desc"
                    type="text"
                    placeholder="your Address "
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="bottom">
                  <button className="btn">Upload</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
