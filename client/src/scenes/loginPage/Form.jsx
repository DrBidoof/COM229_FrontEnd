import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [selectedFile, setSelectedFile] = useState(null);

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    if (selectedFile) {
      formData.append("picturePath", selectedFile);
    }

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      
      if (!loggedInResponse.ok) {
        throw new Error("Login failed");
      }
  
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
  
      if (loggedIn) {
        dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      // Optionally set an error state to show a message to the user
    }
  };

  const handleFormSubmit = async (event, values, onSubmitProps) => {
    event.preventDefault();
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  

  const formStyle = {
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  };

  const inputGroupStyle = {
    marginBottom: "15px",
  };

  const labelStyle = {
    fontWeight: "600",
    display: "block",
    marginBottom: "5px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "15px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "18px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const toggleLinkStyle = {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "14px",
  };

  const toggleTextStyle = {
    color: "#007bff",
    cursor: "pointer",
  };

  const fileInputBoxStyle = {
    border: "2px dashed #ccc",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    cursor: "pointer",
  };

  const dropzoneTextStyle = {
    fontSize: "16px",
    color: "#007bff",
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div style={formStyle}>
        {isRegister && (
          <>
            <div style={inputGroupStyle}>
              <label htmlFor="firstName" style={labelStyle}>
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                style={inputStyle}
                required
              />
            </div>
            <div style={inputGroupStyle}>
              <label htmlFor="lastName" style={labelStyle}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                style={inputStyle}
                required
              />
            </div>
            <div style={inputGroupStyle}>
              <label htmlFor="location" style={labelStyle}>
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Location"
                style={inputStyle}
                required
              />
            </div>
            <div style={inputGroupStyle}>
              <label htmlFor="occupation" style={labelStyle}>
                Occupation
              </label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                placeholder="Occupation"
                style={inputStyle}
                required
              />
            </div>

            {/* File Input Box */}
            <div style={inputGroupStyle}>
              <label htmlFor="picture" style={labelStyle}>
                Picture
              </label>
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setSelectedFile(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    style={fileInputBoxStyle}
                    className="dropzone"
                  >
                    <input {...getInputProps()} />
                    <p style={dropzoneTextStyle}>
                      Drag & Drop an image or click to select a file
                    </p>
                  </div>
                )}
              </Dropzone>
              {selectedFile && (
                <div>
                  <p>Selected File: {selectedFile.name}</p>
                </div>
              )}
            </div>
          </>
        )}

        <div style={inputGroupStyle}>
          <label htmlFor="email" style={labelStyle}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            style={inputStyle}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor="password" style={labelStyle}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            style={inputStyle}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" style={buttonStyle}>
          {isLogin ? "Login" : "Register"}
        </button>

        {/* Toggle Link */}
        <div style={toggleLinkStyle}>
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span
                style={toggleTextStyle}
                onClick={() => setPageType("register")}
              >
                Sign up here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                style={toggleTextStyle}
                onClick={() => setPageType("login")}
              >
                Login here
              </span>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
