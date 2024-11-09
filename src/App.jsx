import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length, setLength] = useState(8)
  const [numAllow,setNumAllow] = useState(false);
  const [charAllow,setCharAllow ] = useState(false);
  const [password,setPassword] = useState("")
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllow) str+="1234567890"
    if(charAllow) str+="!@#$%^&*"
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  },[length,numAllow,charAllow,setPassword]);
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator()
  },[length,numAllow,charAllow,passwordGenerator]);
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center m-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} className='outline-none rounded-lg w-full py-1 px-3 m-2' placeholder='password' readOnly ref={passwordRef}/>
        <button className='outline-none bg-black text-white rounded-lg shrink-0 py-1 px-3 m-2 active:bg-white active:text-black' onClick={copyPasswordToClipboard()}>Copy</button></div>
        <div className="flex text-sm gap-x-2">
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
            <label>Length:{length} </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numAllow} id="numberInput" onChange={()=>{setNumAllow((prev)=>!prev)}} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllow} id="numberInput" onChange={()=>{setCharAllow((prev)=>!prev)}} />
            <label htmlFor="characterInput">Characters</label>
          </div>
          </div>
      </div>
    </>
  )
}

export default App
