import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str = str + "0123456789";
    if (charAllowed) str = str + "!@#$%^&*()_-+-{}][,./";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(char);
      console.log(pass);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  const passwordRef = useRef(null);
  const handleCopy = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    toast.success("Password copied successfully");
  }, [password]);
  return (
    <div>
      <div className="w-full max-w-md mx-auto shadow-md  rounded-lg px-4 py-4 my-16 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3"> Password Generator</h1>
        <div className="flex shadow rounded-md overflow-hidden mb-4">
          <input
            className="outline-none rounded-lg w-full py-1 px-3  "
            type="text"
            value={password}
            placeholder="Password"
            readOnly
          />
          <button
            onClick={handleCopy}
            className=" flex shadow rounded-md ml-1 p-2 hover:bg-sky-900 outline-none bg-blue-700 px-3, py-0.5 shrink-0 text-white"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              className="cursor-pointer"
              type="range"
              min={8}
              max={50}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
