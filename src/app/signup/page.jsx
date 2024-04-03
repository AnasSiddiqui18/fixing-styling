"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Signup() {
  const [step, setStep] = useState(1);
  const [censorPswd, setCensorPswd] = useState(true);
  const [censorPswdCheck, setCensorPswdCheck] = useState(true);
  const [emailOTP, setEmailOTP] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [formdata, setFormdata] = useState({
    Email: "",
    Username: "",
    Password: "",
    Phone: "",
    emailotp: "",
    phoneotp: "",
    RePassword: "",
  });

  useEffect(() => {
    if (step != 2) return;

    const handleClick = () => {
      setCensorPswd(!censorPswd);
    };

    const element = document.getElementById("censor");

    if (element) {
      element.addEventListener("click", handleClick);
    }

    return () => {
      if (element) {
        element.removeEventListener("click", handleClick);
      }
    };
  }, [censorPswd, step]);

  useEffect(() => {
    if (step != 2) return;

    const handleClick = () => {
      setCensorPswdCheck(!censorPswdCheck);
    };

    const element = document.getElementById("censorcheck");

    if (element) {
      element.addEventListener("click", handleClick);
    }

    return () => {
      if (element) {
        element.removeEventListener("click", handleClick);
      }
    };
  }, [censorPswdCheck, step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  function alert(alert, field) {
    const formElement = document.getElementById(field);

    alertClear();

    const alertDiv = document.createElement("div");
    alertDiv.innerHTML = `<div class="text-light-1 mt-[1svh] text-[0.65rem] md:text-[1.0rem]" id="alert">${alert}</div>`;
    formElement.appendChild(alertDiv);
  }

  function alertClear() {
    const existingAlert = document.getElementById("alert");

    if (existingAlert) {
      existingAlert.remove();
    }
  }

  function check(e, stage, action) {
    e.preventDefault();
    let formData = null;
    if (!action && stage != "Email") {
      setStep(step - 1);
    } else {
      formData = new FormData(e.target);
    }

    if (action && stage == "Email") {
      let Email = formData.get("Email");
      let Username = formData.get("Username");
      const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!EmailRegex.test(Email)) {
        alert("Invalid Email", "emailcontainer");
      } else if (Username.length < 6 || Username.length > 20) {
        alert("The Username Should Be 6-20 Characters", "usernamecontainer");
      } else if (!/^[a-zA-Z0-9]+$/.test(Username)) {
        alert("The Username Should Be Alphanumeric", "usernamecontainer");
      } else {
        alertClear();
        setStep(step + 1);
        document.getElementById(step).reset();
      }
    }

    if (action && stage == "Password") {
      let Password = formData.get("Password");
      let Check = formData.get("RePassword");

      if (Password.length < 8 || Password.length > 20) {
        alert("The Password Should Be 8-20 Characters", "passwordcontainer");
      } else if (!Password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)) {
        alert(
          "Password should contain at least one special character",
          "passwordcontainer"
        );
      } else if (!Password.match(/[A-Z]+/)) {
        alert(
          "Password should contain at least one uppercase letter",
          "passwordcontainer"
        );
      } else if (!Password.match(/[a-z]+/)) {
        alert(
          "Password should contain at least one lowercase letter",
          "passwordcontainer"
        );
      } else if (!Password.match(/[0-9]+/)) {
        alert(
          "Password should contain at least one number",
          "passwordcontainer"
        );
      } else if (Password != Check) {
        alert("Passwords don't match", "repasswordcontainer");
      } else {
        alertClear();
        setEmailOTP("010101");
        setStep(step + 1);
        document.getElementById(step).reset();
      }
    }

    if (action && stage == "Verify Email") {
      let OTP = formData.get("emailotp");

      if (OTP != emailOTP) {
        alert("Incorrect OTP", "emailotpcontainer");
      } else {
        alertClear();
        setStep(step + 1);
        document.getElementById(step).reset();
      }
    }

    if (action && stage == "Phone") {
      const PhoneRegex = /^\+\d{5,19}$/;
      let Phone = formData.get("Phone");

      if (!PhoneRegex.test(Phone)) {
        alert("Invalid Phone; Example: +10001111222", "phonecontainer");
      } else {
        alertClear();
        setPhoneOTP("020202");
        setStep(step + 1);
        document.getElementById(step).reset();
      }
    }

    if (action && stage == "Verify Phone") {
      let OTP = formData.get("phoneotp");

      if (OTP != phoneOTP) {
        alert("Incorrect OTP", "phoneotpcontainer");
      } else {
        alertClear();
        window.alert(
          formdata["Email"] +
            "\n" +
            formdata["Username"] +
            "\n" +
            formdata["Password"] +
            "\n" +
            formdata["Phone"]
        );
      }
    }
  }

  if (step == 1) {
    return (
      <main>
        <div className="flex flex-col items-center justify-center h-[100svh]">
          <form
            id="1"
            className="flex flex-col items-center justify-center"
            onSubmit={(e) => check(e, "Email", true)}
          >
            <Card className="w-[400px]">
              <CardHeader>
                <CardTitle>Create a Free Account</CardTitle>
                <CardDescription>Step One</CardDescription>
              </CardHeader>

              <CardContent className="grid gap-4">
                <Input
                  type="text"
                  name="Email"
                  placeholder="Email"
                  value={formdata.Email}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="Username"
                  placeholder="Username"
                  value={formdata.Username}
                  onChange={handleChange}
                  required
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-4 items-start">
                <Button className="w-full" type="submit">
                  Continue
                </Button>

                <div className="text-[0.8rem] md:text-[1.0rem] mb-[15px] sm:mb-[20px] lg:mb-[25px] text-start ">
                  {"Already have an account? "}
                  <a
                    href="/auth/signin"
                    className="text-secondary-4-light underline"
                  >
                    Sign In
                  </a>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    );
  } else if (step == 2) {
    return (
      <main>
        <div className="flex flex-col items-center justify-center h-[100svh]">
          <form
            id="2"
            className="flex flex-col items-center justify-center"
            onSubmit={(e) => check(e, "Password", true)}
          >
            <Card>
              <CardHeader>
                <CardTitle>Create a Free Account</CardTitle>
                <CardDescription>Step Two</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="relative">
                  <Input
                    type={`${censorPswd ? "password" : "text"}`}
                    name="Password"
                    placeholder="Password"
                    value={formdata.Password}
                    onChange={handleChange}
                    className="bg-white rounded-lg w-[20em] h-[2.5em] md:w-[27em] md:h-[3em] xl:w-[35em] xl:h-[4em] px-3 text-[0.8rem] md:text-[1.0rem]"
                    required
                  />
                  <div
                    className="absolute right-0 -translate-y-2/4 top-2/4 cursor-pointer mr-2 text-[#7a7a7a]"
                    id="toggle"
                  >
                    <Image
                      alt="Hide Password"
                      src="/show.svg"
                      width={20}
                      height={20}
                      className={`${
                        censorPswd
                          ? "hidden"
                          : "h-[1.3em] md:h-[1.65em] xl:h-[2.2em] mr-1"
                      }`}
                    />
                    <Image
                      alt="Show Password"
                      src="/hide.svg"
                      width={20}
                      height={20}
                      className={`${
                        censorPswd
                          ? "h-[1.3em] md:h-[1.65em] xl:h-[2.2em] mr-1 "
                          : "hidden"
                      }`}
                    />
                  </div>
                </div>
                <div className="w-[20em] md:w-[27em] xl:w-[35em] mb-[15px] sm:mb-[20px] lg:mb-[25px] mx-auto flex justify-between">
                  <Button
                    type="button"
                    className="bg-gray-2 text-white rounded-[8px] px-[16px] py-[5px] md:px-[18px] md:py-[6px] xl:px-6 xl:py-2 border border-white hover:bg-gray-3"
                    onClick={(e) => check(e, "Password", false)}
                  >
                    Back
                  </Button>
                  <button
                    type="submit"
                    className="bg-gray-2 text-white rounded-[8px] px-[16px] py-[5px] md:px-[18px] md:py-[6px] xl:px-6 xl:py-2 border border-white hover:bg-gray-3 ml-auto"
                  >
                    Continue
                  </button>
                </div>
              </CardContent>
              <CardFooter>
                <div className="font-[600] text-white text-[0.8rem] md:text-[1.0rem] mb-[15px] sm:mb-[20px] lg:mb-[25px]">
                  Already have an account?{" "}
                  <a href="/auth/signin" className="text-secondary-4-light">
                    Sign In
                  </a>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    );
  } else if (step == 3) {
    return (
      <main>
        <div className="flex flex-col items-center justify-center h-[100svh]">
          <form
            id="3"
            className="flex flex-col items-center justify-center"
            onSubmit={(e) => check(e, "Verify Email", true)}
          >
            <Card>
              <CardHeader>
                <CardTitle>Create a free Account</CardTitle>
                <CardDescription>
                  We just sent your email an OTP
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Input
                  type="text"
                  name="emailotp"
                  placeholder="OTP: Email"
                  value={formdata.emailotp}
                  onChange={handleChange}
                  className="bg-white rounded-lg w-[20em] h-[2.5em] md:w-[27em] md:h-[3em] xl:w-[35em] xl:h-[4em] px-3 text-[0.8rem] md:text-[1.0rem]"
                  required
                />
                <div className="w-[20em] md:w-[27em] xl:w-[35em] mb-[15px] sm:mb-[20px] lg:mb-[25px] mx-auto flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-2 text-white rounded-[8px] px-[16px] py-[5px] md:px-[18px] md:py-[6px] xl:px-6 xl:py-2 border border-white hover:bg-gray-3"
                    onClick={(e) => check(e, "Verify Email", false)}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-gray-2 text-white rounded-[8px] px-[16px] py-[5px] md:px-[18px] md:py-[6px] xl:px-6 xl:py-2 border border-white hover:bg-gray-3 ml-auto"
                  >
                    Continue
                  </button>
                </div>
              </CardContent>

              <CardFooter>
                <div className="font-[600] text-white text-[0.8rem] md:text-[1.0rem] mb-[15px] sm:mb-[20px] lg:mb-[25px]">
                  Already have an account?{" "}
                  <a href="/auth/signin" className="text-secondary-4-light">
                    Sign In
                  </a>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    );
  } else if (step == 4) {
    return (
      <main>
        <div className="flex flex-col items-center justify-center h-[100svh]">
          <div className="font-poppins font-[700] text-[1.75rem] md:text-[2.0rem] xl:text-[2.2rem] text-white">
            Create a Free Account
          </div>
          <div className="font-poppins font-[500] text-[1.3rem] md:text-[1.5rem] xl:text-[1.8rem] text-white mb-[30px] sm:mb-[40px] lg:mb-[50px]">
            Phone Number
          </div>
          <form
            id="4"
            className="flex flex-col items-center justify-center"
            onSubmit={(e) => check(e, "Phone", true)}
          >
            <Card>
              <CardHeader>
                <CardTitle>Create a Free Account</CardTitle>
                <CardDescription>Phone Number</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  name="Phone"
                  value={formdata.Phone}
                  onChange={handleChange}
                  placeholder="Phone Number (+10001111222)"
                  className="bg-white rounded-lg w-[20em] h-[2.5em] md:w-[27em] md:h-[3em] xl:w-[35em] xl:h-[4em] px-3 text-[0.8rem] md:text-[1.0rem]"
                  required
                />

                <button
                  type="button"
                  className="bg-gray-2 text-white rounded-[8px] px-[16px] py-[5px] md:px-[18px] md:py-[6px] xl:px-6 xl:py-2 border border-white hover:bg-gray-3"
                  onClick={(e) => check(e, "Phone", false)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-gray-2 text-white rounded-[8px] px-[16px] py-[5px] md:px-[18px] md:py-[6px] xl:px-6 xl:py-2 border border-white hover:bg-gray-3 ml-auto"
                >
                  Continue
                </button>
              </CardContent>

              <CardFooter>
                <div className="font-[600] text-white text-[0.8rem] md:text-[1.0rem] mb-[15px] sm:mb-[20px] lg:mb-[25px]">
                  Already have an account?{" "}
                  <a href="/auth/signin" className="text-secondary-4-light">
                    Sign In
                  </a>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    );
  } else if (step == 5) {
    return (
      <main>
        <div className="flex flex-col items-center justify-center h-[100svh]">
          <div className="font-poppins font-[700] text-[1.75rem] md:text-[2.0rem] xl:text-[2.2rem] text-white">
            Create a Free Account
          </div>
          <div className="font-poppins font-[500] text-[1.3rem] md:text-[1.5rem] xl:text-[1.8rem] text-white mb-[30px] sm:mb-[40px] lg:mb-[50px]">
            We just sent your phone an OTP
          </div>
          <form
            id="5"
            className="flex flex-col items-center justify-center"
            onSubmit={(e) => check(e, "Verify Phone", true)}
          >
            <Card>
              <CardHeader>
                <CardTitle>Create a Free Account</CardTitle>
                <CardDescription>
                  We just sent your phone an OTP
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Input
                  type="text"
                  name="phoneotp"
                  placeholder="OTP: Phone"
                  value={formdata.phoneotp}
                  onChange={handleChange}
                  className="bg-white rounded-lg w-[20em] h-[2.5em] md:w-[27em] md:h-[3em] xl:w-[35em] xl:h-[4em] px-3 text-[0.8rem] md:text-[1.0rem]"
                  required
                />
                <div className="w-[20em] md:w-[27em] xl:w-[35em] mb-[15px] sm:mb-[20px] lg:mb-[25px] mx-auto flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-2 text-white rounded-[8px] px-[16px] py-[5px] md:px-[18px] md:py-[6px] xl:px-6 xl:py-2 border border-white hover:bg-gray-3"
                    onClick={(e) => check(e, "Verify Phone", false)}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-gray-2 text-white rounded-[8px] px-[16px] py-[5px] md:px-[18px] md:py-[6px] xl:px-6 xl:py-2 border border-white hover:bg-gray-3 ml-auto"
                  >
                    Continue
                  </button>
                </div>
              </CardContent>

              <CardFooter>
                <div className="font-[600] text-white text-[0.8rem] md:text-[1.0rem] mb-[15px] sm:mb-[20px] lg:mb-[25px]">
                  Already have an account?{" "}
                  <a href="/auth/signin" className="text-secondary-4-light">
                    Sign In
                  </a>
                </div>{" "}
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    );
  }
}

export default Signup;
