import React, { useState } from "react";
import NavbarStart from "../Components/NavbarStart";
import Loader from "../Components/Loader";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { FiAlertTriangle } from "react-icons/fi";

const Register = () => {
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    const newErrors = {};

    if (!displayName) {
      newErrors.displayName = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoader(true);
        setErrors({}); // Clear any previous errors

        const res = await createUserWithEmailAndPassword(auth, email, password);
        navigate("/login");

        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });

              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
            } catch (err) {
              console.log(err);
            }
          });
        });
      } catch (error) {
        console.log("Error in Register", error);
        setErrors({ email: 'Email already registered' });
      }
    }
    setLoader(false);
  };

  return (
    <div>
      <div className="bg-slate-800">
        <NavbarStart />
      </div>
      <div></div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 bg-gray-800 rounded p-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="displayName" className="text-white block mb-2">
                Name
              </label>
              <input
                type="text"
                id="displayName"
                placeholder="Full Name"
                className={`w-full p-2 border border-gray-600 rounded bg-gray-700 text-white ${
                  errors.displayName ? "border-red-500" : ""
                }`}
              />
              {errors.displayName && (
                <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-white block mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="E-mail"
                id="email"
                className={`w-full p-2 border border-gray-600 rounded bg-gray-700 text-white ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="text-white block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className={`w-full p-2 border border-gray-600 rounded bg-gray-700 text-white ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="mb-4 hover:pointer">
              <input
                required
                style={{ display: "none", cursor: "pointer" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
              />
              <label
                className="flex items-center gap-x-2"
                htmlFor="file"
                id="avatar"
              >
                <DriveFolderUploadOutlined className="icon" />
                <span className="font-semibold text-white">Add Avatar</span>
              </label>
            </div>
            {/* <div>
              {errors && (
                <p className="bg-cyan-100 p-2 mb-2 flex items-center gap-x-2 font-semibold text-red-500">
                  {" "}
                  <span>
                    <FiAlertTriangle />
                  </span>{" "}
                  <span>{errors}</span>{" "}
                </p>
              )}
            </div> */}
            {loader ? (
              <button
                type="submit"
                className="w-full flex justify-center p-2 bg-blue-600 text-white rounded hover:bg-blue-600"
              >
                <Loader />
              </button>
            ) : (
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Register
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
