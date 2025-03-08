import { useNavigate } from "react-router-dom";

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Blurred Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/assets/loginbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          zIndex: -1,
        }}
      ></div>

      {/* Login Selection Form */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "24rem",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem", fontSize: "1.25rem", fontWeight: "600" }}>Login as</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              width: "100%",
              padding: "0.5rem",
              color: "#ffffff",
              backgroundColor: "#3b82f6",
              borderRadius: "0.375rem",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Login as Tourist
          </button>
          <button
            onClick={() => navigate("/tourguide-login")}
            style={{
              width: "100%",
              padding: "0.5rem",
              color: "#ffffff",
              backgroundColor: "#10b981",
              borderRadius: "0.375rem",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Login as Tour Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;