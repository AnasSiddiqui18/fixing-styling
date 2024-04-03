"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Page1() {
  const [censorPswd, setCensorPswd] = useState(true);
  const [formdata, setFormdata] = useState({
    User: "",
    Password: "",
  });

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

  function check(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    const pswd = formData.get("Password");
    const user = formData.get("User");

    if (true) {
      alert("Invalid Login", "pswdcontainer");
    } else {
      //logic
    }
  }

  useEffect(() => {
    const handleClick = () => {
      window.location.href = "/auth/reset";
    };

    const element = document.getElementById("forgot");

    if (element) {
      element.addEventListener("click", handleClick);
    }

    return () => {
      if (element) {
        element.removeEventListener("click", handleClick);
      }
    };
  }, []);

  useEffect(() => {
    const handleClick = () => {
      setCensorPswd(!censorPswd);
    };

    const element = document.getElementById("toggle");

    if (element) {
      element.addEventListener("click", handleClick);
    }

    return () => {
      if (element) {
        element.removeEventListener("click", handleClick);
      }
    };
  }, [censorPswd]);

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-[100svh] bg-slate-950">
        <form
          id="1"
          className="flex flex-col items-center justify-center "
          onSubmit={(e) => check(e)}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="text"
                  name="User"
                  placeholder="Email or Username"
                  value={formdata.User}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative grid gap-2">
                <Label htmlFor="email">Password</Label>

                <div className="relative">
                  <Input
                    type={`${censorPswd ? "password" : "text"}`}
                    name="Password"
                    placeholder="Password"
                    value={formdata.Password}
                    onChange={handleChange}
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
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 items-start">
              <Button className="w-full">Sign in</Button>
              <Button variant="outline" className="w-full">Forgot Password?</Button>
              <div className="text-[0.8rem] md:text-[1.0rem] mb-[15px] sm:mb-[20px] lg:mb-[25px] text-start ">
                {"Don't have an account? "}
                <a href="/auth/signup" className="text-secondary-4-light underline">
                  Sign In
                </a>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </main>
  );
}

export default Page1;
