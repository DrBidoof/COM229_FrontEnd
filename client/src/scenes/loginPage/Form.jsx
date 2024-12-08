import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state"; 
import Dropzone from "react-dropzone";

const Form = () => {
  const [pageType, setPageType] = useState("login"); // Toggle between "login" and "register"
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
    email: "",
    password: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // Handle input changes for the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const register = async (values, onSubmitProps) => {
    try {
        const formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }
        if (selectedFile) {
            formData.append("picturePath", selectedFile);
        }

        console.log("Register request data:", formData);

        const savedUserResponse = await fetch("${BACKEND_URL}/auth/register", {
            method: "POST",
            body: formData,
        });

        const savedUser = await savedUserResponse.json();
        console.log("Register response:", savedUser);

        onSubmitProps.resetForm();

        if (savedUser) {
            // Clear form values and switch to login
            setFormValues({
                firstName: "",
                lastName: "",
                location: "",
                occupation: "",
                email: "",
                password: "",
            });
            setSelectedFile(null);
            setPageType("login");
            alert("Registration successful! Please log in.");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        alert("Registration failed. Please try again.");
    }
};


  const login = async (values, onSubmitProps) => {
    try {
        console.log("Login request data:", values);

        const loggedInResponse = await fetch("http://localhost:6001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        console.log("LoggedInResponse status:", loggedInResponse.status);

        if (!loggedInResponse.ok) {
            console.error("Login failed with status:", loggedInResponse.status);
            throw new Error("Login failed");
        }

        const loggedIn = await loggedInResponse.json();
        console.log("Login response JSON:", loggedIn);

        onSubmitProps.resetForm();

        if (loggedIn) {
            dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
            console.log("Redux state after login dispatch:", {
                user: loggedIn.user,
                token: loggedIn.token,
            });
            navigate("/home");
        }
    } catch (error) {
        console.error("Error during login:", error.message);
        alert("Invalid login credentials. Please try again.");
    }
};


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (isLogin) {
      await login(formValues, { resetForm: () => setFormValues({ ...formValues, password: "" }) });
    }

    if (isRegister) {
      await register(formValues, { resetForm: () => setFormValues({}) });
    }
  };

  // Styles
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
                value={formValues.firstName}
                onChange={handleInputChange}
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
                value={formValues.lastName}
                onChange={handleInputChange}
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
                value={formValues.location}
                onChange={handleInputChange}
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
                value={formValues.occupation}
                onChange={handleInputChange}
                required
              />
            </div>

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
            value={formValues.email}
            onChange={handleInputChange}
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
            value={formValues.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" style={buttonStyle}>
          {isLogin ? "Login" : "Register"}
        </button>

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
