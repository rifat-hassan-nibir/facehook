import { useForm } from "react-hook-form";
import Field from "../common/Field";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`, formData);

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError("root.random", { type: "random", message: `Something went wrong ${error.message}` });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]">
      {/* name */}
      <div className="form-control">
        {/* first name */}
        <Field label={"First Name"} htmlFor={"firstName"} error={errors.firstName}>
          <input
            {...register("firstName", { required: "First name is required" })}
            className={`auth-input ${errors.firstName ? "!border-red-500" : "border-gray-200"}`}
            name="firstName"
            type="text"
            id="firstName"
          />
        </Field>

        {/* last name */}
        <Field label={"Last Name"} htmlFor={"lastName"} error={errors.lastName}>
          <input
            {...register("lastName", { required: "Last name is required" })}
            className={`auth-input ${errors.lastName ? "!border-red-500" : "border-gray-200"}`}
            name="lastName"
            type="text"
            id="lastName"
          />
        </Field>
      </div>
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
      {/* confirm password */}
      <div className="form-control">
        <label className="auth-label" htmlFor="confirmPassword">
          Retype Password
        </label>
        <input className="auth-input" name="confirmPassword" type="password" id="confirmPassword" />
      </div>
      {/* Submit */}
      <Field>
        {errors.root?.random && <p className="text-red-500">{errors.root.random.message}</p>}
        <button
          className="auth-input !bg-lwsGreen hover:cursor-pointer font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Register
        </button>
      </Field>
    </form>
  );
}

export default RegistrationForm;
