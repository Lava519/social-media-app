import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

export default function Register() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [code, setCode] = useState(null);
  const [state, setState] = useState(0);
  const [primaryAnimate, setPrimaryAnimate] = useState(false);
  const [secondaryAnimate, setSecondaryAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const checkState = (index) => {
    if (index === state) {
      if (loading) {
        setTimeout(() => {
          checkState(index);
        }, [100]);
        return "hidden";
      }
      return "animate-[zoom-in_0.2s_forwards]";
    }
    return "hidden";
  };

  async function sendRegister() {
    setLoading(true);
    const { data } = await axios.post("http://localhost:3000/user/register", {
      email,
      password,
      firstName: fName,
      lastName: lName,
      birthday,
    });
    setLoading(false);
  }

  async function sendConfirmEmail() {
    setLoading(true);
    const data = await axios.post("http://localhost:3000/user/confirm", {
      email,
      code,
    });
    console.log(data);
    if (data.status === 200)
      nav("/login");
    setLoading(false);
  }

  const register = (e) => {
    e.preventDefault();
    sendRegister();
    next(e);
  };
  const confirmEmail = (e) => {
    e.preventDefault();
    sendConfirmEmail();

  }

  const next = (e) => {
    e.preventDefault();
    setState(state + 1);
  };

  const handleFNameChange = (e) => {
    setFName(e.target.value);
    animate(primaryAnimate, setPrimaryAnimate);
  }

  const handleLNameChange = (e) => {
    setLName(e.target.value);
    animate(secondaryAnimate, setSecondaryAnimate);
  }

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    animate(primaryAnimate, setPrimaryAnimate);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    animate(primaryAnimate, setPrimaryAnimate);
  }

  const handlePasswordChange = (e) => {
    animate(primaryAnimate, setPrimaryAnimate);
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e) => {
    animate(secondaryAnimate, setSecondaryAnimate);
  };

  const animate = (component, setComponent) => {
    if (component === false) {
      setComponent(true);
      setTimeout(() => {
        setComponent(false);
      }, 100);
    }
  };

  return (
    <div className="flex justify-center h-screen align-stretch relative">
      <Nav></Nav>
      <div className="flex flex-col justify-center items-center overflow-hidden max-h-auto">
        {loading && (
          <div className="w-20 h-10 flex justify-center items-center">
            <img
              className="animate-[rotate_0.5s_infinite] h-full"
              src="/loading.svg"
            />
          </div>
        )}
        <form
          className={`check-email flex flex-col justify-center items-center bg-dark-g p-8 rounded-2xl gap-2 ${checkState(0)}`}
        >
          <h2 className="text-2xl font-bold">Enter email</h2>
          <label className="mt-4 w-full" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            onChange={handleEmailChange}
            className={`w-full ${primaryAnimate && "animate-[pop_0.1s_forwards]"}`}
            id="email"
          ></input>
          <button className="mt-4" onClick={next} type="submit">
            next
          </button>
        </form>
        <form
          className={`check-email flex flex-col justify-center items-center bg-dark-g p-8 rounded-2xl gap-2 ${checkState(1)}`}
        >
          <h2 className="text-2xl font-bold">Enter your name and your date of birth</h2>
          <label className="mt-4 w-full" htmlFor="first-name">
            First Name
          </label>
          <input
            type="text"
            onChange={handleFNameChange}
            className={`w-full ${primaryAnimate && "animate-[pop_0.1s_forwards]"}`}
            id="first-name"
          ></input>
          <label className="mt-4 w-full" htmlFor="last-name">
            Last Name
          </label>
          <input
            type="text"
            onChange={handleLNameChange}
            className={`w-full ${secondaryAnimate && "animate-[pop_0.1s_forwards]"}`}
            id="last-name"
          ></input>
          <label className="mt-4 w-full" htmlFor="birthday">
            Birth Date
          </label>
          <input
            type="date"
            onChange={handleBirthdayChange}
            className="w-full"
            id="birthday"
          ></input>
          <button className="mt-4" onClick={next} type="submit">
            next
          </button>
        </form>
        <form
          onSubmit={register}
          className={`check-password flex flex-col items-center bg-dark-g p-8 rounded-2xl gap-2
                                ${checkState(2)}`}
        >
          <h2 className="text-2xl font-bold">Enter password</h2>
          <label className="mt-4 w-full" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            onChange={handlePasswordChange}
            className={`w-full ${primaryAnimate && "animate-[pop_0.1s_forwards]"}`}
            id="password"
          ></input>
          <label className="mt-4 w-full" htmlFor="password-confirm">
            Confirm password
          </label>
          <input
            type="password"
            onChange={handlePasswordConfirmChange}
            className={`w-full ${secondaryAnimate && "animate-[pop_0.1s_forwards]"}`}
            id="password-confirm"
          ></input>
          <button className="mt-4" type="submit">
            next
          </button>
        </form>
        <form
          onSubmit={confirmEmail}
          className={`check-confirmation flex flex-col items-center bg-dark-g p-8 rounded-2xl gap-2 ${checkState(3)}`}
        >
          <h2 className="text-2xl font-bold">Confirmation code</h2>
          <label className="mt-4 w-full" htmlFor="code">
            Confirmation Code
          </label>
          <input
            type="text"
            onChange={handleCodeChange}
            className={`w-full ${primaryAnimate && "animate-[pop_0.1s_forwards]"}`}
            id="code"
          ></input>
          <button className="mt-4" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
