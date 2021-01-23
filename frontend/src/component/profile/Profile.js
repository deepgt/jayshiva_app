import React, { useEffect, useState } from "react";
import Navbar from "./../Navbar/Navbar";
import "./Profile.css";
import googleimage from "../../resources/google.svg";
import { useAuth } from "./../../contexts/AuthContext";
import {Storage, Firestore} from "../../firebase"

function Profile() {
  const [pan, setPan] = useState("");
  const [panImage, setPanImage] = useState("");
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const [imgURL, setImgURL] = useState('')
  const [info, setInfo] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [profileImageURL, setProfileImageURL] = useState("")

  const types = ["image/png", "image/jpeg"];


  useEffect(()=>{
    messageGet();
  })

  const submitHandle = async(e) => {
    e.preventDefault();
    
    await handleUpload(panImage,currentUser.email);
    
    await messageUpload(fullname,
    currentUser.email,
    phonenumber,
    displayname,
    address,
    pan,
    imgURL
    )
    setAddress("");
    setDisplayname("");
    setFullname("");
    setPan("");
    setPanImage("");
    setPhonenumber("");
      
  };

  const handleUpload=()=>{
    const uploadTask = Storage.ref(`userinfo/${panImage.name}`).put(panImage);
    uploadTask.on(
      "state_changed",
      snapshot=>{},
      error =>{
        console.log(error)
      },
      ()=>{
        Storage.ref("userinfo")
        .child(panImage.name)
        .getDownloadURL()
        .then(url =>{
          setImgURL(url)
        })
      }
    )
  }

  const messageGet = async() =>{
    const docRef = Firestore.collection('users').doc(`${currentUser.email}`);
    const info = await docRef.get();
    setInfo(info.data());
  }

  const messageUpload= async ()=>{
    const docRef = Firestore.collection('users').doc(`${currentUser.email}`);

    await docRef.set({
      fullname:fullname,
      phonenumber:phonenumber,
      displayname:displayname,
      address:address,
      pan:pan ,
      imgURL:imgURL
    });
  }


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

  // const updateProfile=(e)=>{
  //   var image = document.getElementById("profileImage");
  //   image.src = URL.createObjectURL(e.target.files[0]);

  //   let selected = e.target.files[0];
  //   if (selected) {
  //     setProfileImage(selected);
  //   }
  //   profileUpload();

  // }

  const profileUpload=(e)=>{
    setProfileImage(e.target.files[0])
    const uploadTask = Storage.ref(`userinfo/${currentUser.email}/${profileImage.name}`).put(profileImage);
    uploadTask.on(
      "state_changed",
      snapshot=>{},
      error =>{
        console.log(error)
      },
      ()=>{
        Storage.ref(`userinfo/${currentUser.email}`)
        .child(profileImage.name)
        .getDownloadURL()
        .then(url =>{
          setProfileImageURL(url)
        })
      }
    )
  }

  return (
    <>
      <Navbar />
      <div className="main__container">
        <div className="bg-layer">
          <h1>your profile</h1>

          {/* 728x90 */}
          <div className="profile__header__main">
            <div className="header__leftbottom">

            
            <form >
              <div className="profile__imagecontainer">
                <div className="profile__image"> 
                  <img src={profileImageURL} alt="" />
                </div>
                <label class="profile__button">
                  <img src={googleimage}></img>
                  <input type="file" onChange={profileUpload}/>
                </label>
              </div>
            </form>


              <form onSubmit={submitHandle}>
                <div className="profile__Email">
                  <div className="profile_text">
                  <span>Email:</span>
                  <span>{currentUser.email}</span>
                  </div>
                  <div className="profile_text">
                  <span>name:</span>
                  <span>{info.fullname}</span>
                  </div>
                  <div className="profile_text">
                  <span>phone number:</span>
                  <span>{info.phonenumber}</span>
                  </div>
                  <div className="profile_text">
                  <span>address:</span>
                  <span>{info.address}</span>
                  </div>
                  <div className="profile_text"> 
                  <span>pan number: </span>
                  <span>{info.pan}</span>
                  </div>
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
