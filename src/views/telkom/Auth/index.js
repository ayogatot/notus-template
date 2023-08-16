import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { firestore } from "config";
import { collection, onSnapshot } from "firebase/firestore";

import Telkom1 from "../../../assets/img/telkom1.png";
import Swal from "sweetalert2";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const toHome = () => history.push("/telkom/home");
  const onSubmit = () => {
    setIsLoading(true);
    if (!(email.length > 0) || !(password.length > 0)) {
      setIsLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email atau Password tidak boleh kosong",
      });
    }

    onSnapshot(
      collection(firestore, "tahap1", "telkom", "users"),
      (docSnap) => {
        const data = [];
        docSnap.forEach(async (d) => {
          data.push({ ...d.data() });
        });

        const user = data.find((i) => i.email === email);
        if (!user) {
          setIsLoading(false);
          return Swal.fire({
            icon: "error",
            title: "Error",
            text: "User tidak terdaftar",
          });
        }

        if (user.password !== password) {
          setIsLoading(false);
          return Swal.fire({
            icon: "error",
            title: "Error",
            text: "Password tidak sama",
          });
        }

        localStorage.setItem("user", JSON.stringify(user));
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Berhasil Login",
        });
        setTimeout(() => {
          toHome();
        });
      }
    );
  };

  return (
    <div>
      <div style={{ height: "15vh" }} className="bg-white flex justify-end">
        <img
          alt="logo"
          src={Telkom1}
          style={{ height: "80%", marginRight: 40 }}
        />
      </div>
      <div
        style={{ height: "85vh" }}
        className="bg-red-600 flex justify-center items-center"
      >
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-12">
              <form>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="border-2 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                    onChange={(val) => setEmail(val.target.value)}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="border-2 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                    onChange={(val) => setPassword(val.target.value)}
                  />
                </div>

                <div className="text-center mt-6">
                  <p
                    onClick={() => onSubmit()}
                    className="cursor-pointer bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  >
                    {isLoading ? "Loading ..." : "SIGN IN"}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
