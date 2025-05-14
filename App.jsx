import { useState , useCallback , useEffect , useRef } from 'react'

function App() {
  const [length , setLength] = useState(8)
  const [number , setNumber] = useState(false)
  const [char , setChar] = useState(false)
  const [password , setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str += "0123456789"
    if(char) str += "`~!@#$%^&*()_+-={}[]:';?|\>.,<"

    for (let i = 1; i <= length; i++) {
      let Character = (Math.random()*str.length + 1 )

      pass += str.charAt(Character) 
      
    }

    setPassword(pass)

  } , [length, number, char ,setPassword])
  
  
  useEffect(() => {
    passwordGenerator()
  } , [length , number , char , passwordGenerator])

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,8)
    window.navigator.clipboard.writeText(password)
  } , [password])


  
  return (
    <>
     <div className="w-full h-50 max-w-md pb-2 mx-auto shadow-md rounded-lg px-4 my-8 text-blue-950 text-5 font-serif bg-gradient-to-r from-[#6fce8b] to-[#3f88c5]">
      <h1 className="text-center pt-2 text-blue-950 text-3xl font-serif">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden m-4">
        <input type="text" 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}  
        />
        <button onClick={copyPass} className="outline-none bg-emerald-500 text-white px-3 py-0.5 shrink-0 transition hover:bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E]">Copy</button>
      </div>

      <div className="flex justify-center text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
           type="range" 
           min={8}
           max={100}
           value={length}
           className="cursor-pointer"
           onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length : {length}</label>
        </div>

        <div className="flex items-center gap=-x-1">
          <input 
          type="checkbox" 
          defaultChecked={number}
          id="numberInput"
          onChange={() => {setNumber((prev) => !prev)}}
          />
          <label>:Numbers</label>
        </div>

        <div className="flex items-center gap=-x-1">
          <input 
          type="checkbox" 
          defaultChecked={char}
          id="charInput"
          onChange={() => {setChar((prev) => !prev)}}
          />
          <label>:Characters</label>
        </div>

      </div>
      </div>
    </>
  )
}

export default App
