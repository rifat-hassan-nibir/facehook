import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

function LoginForm() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    // Make an API call
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`, formData);

      if (response.status === 200) {
        const { user, token } = response.data;

        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;

          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("root.random", { type: "random", message: `User with email ${formData.email} not found` });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]">
      {/* email */}
      <div className="form-control">
        <Field label={"Email"} htmlFor={"email"} error={errors.email}>
          <input
            {...register("email", { required: "Email id is required" })}
            className={`auth-input ${errors.email ? "!border-red-500" : "border-gray-200"}`}
            name="email"
            type="email"
            id="email"
          />
        </Field>
      </div>
      {/* password */}
      <div className="form-control">
        <Field label={"Password"} htmlFor={"password"} error={errors.password}>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            className={`auth-input ${errors.password ? "!border-red-500" : "border-gray-200"}`}
            name="password"
            type="password"
            id="password"
          />
        </Field>
      </div>
      {/* Submit */}
      <Field>
        {errors.root?.random && <p className="text-red-500">{errors.root.random.message}</p>}
        <button
          className="auth-input !bg-lwsGreen hover:cursor-pointer font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Login
        </button>
      </Field>
    </form>
  );
}

export default LoginForm;
