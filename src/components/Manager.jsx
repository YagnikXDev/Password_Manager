import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {

  const ref = useRef()
  const passwordref = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])
  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])
  const copyText = (text) => {
    toast('Copied to clipboards', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    passwordref.current.type = "text"
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png"
      passwordref.current.type = "password"
    } 
    else {
      ref.current.src = "icons/eyecross.png"
      passwordref.current.type = "text"
    }
  }

  const savePassword = () => {
    if(form.site.length>3 &&form.username.length>3&&form.passsword.length>3){
    setpasswordArray([...passwordArray, {...form,id:uuidv4()}])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form,id: uuidv4()}]))
    console.log([...passwordArray, form])
    toast('Password saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
  }else{
    toast('Error: Password not saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
  }
    

  }
  const deletePassword = (id) => {
    console.log("delete passsword with id",id)
    let c=confirm("Do you really want to delete this password")
    if(c){
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    toast('Password Deleted ', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
  }
  }
  const editPassword = (id) => {
    console.log("edit passsword with id",id)
    setform(passwordArray.filter(i=>i.id===id)[0])
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className=" absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      </div>
        <div className='p-1 md:mycontainer min-h-[85.8vh]'>
          <h1 className=' text-4xl font-bold text-center'>
            <span className='text-green-500'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-500'>OP/&gt;</span></h1>
          <p className='text-green-900 text-center text-lg'>Your Own Password Manager</p>
          <div className='flex flex-col p-4 text-black gap-8 items-center'>
            <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="1" />
            <div className="flex flex-col md:flex-row w-full justify-between gap-8">
              <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="2" />
              <div className="relative">
                <input ref={passwordref} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id="3" />
                <span className='absolute right-2 top-2 cursor-pointer' onClick={showPassword}>
                  <img ref={ref} className="" width={20} src="icons/eye.png" alt="eye" />
                </span>
              </div>
            </div>
            <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-4 py-2 w-fit border border-green-900'>
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover">
              </lord-icon>
              Save Password</button>
          </div>
          <div className="passwords">
            <h2 className='font-bold text-xl py-4'>Your Passwords</h2>
            {passwordArray.length === 0 && <div>No passwords to show </div>}
            {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className='bg-violet-400 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Action</th>

                </tr>
              </thead>
              <tbody className='bg-violet-100'>
                {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    <td className=' flex items-center justify-center py-2 border border-white text-center '><a href={item.site} target='_blank'>{item.site}</a>
                      <div className='lordiconcopy'>
                        <div className='size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "2px", "paddingLeft": "1px" }}
                            src="https://cdn.lordicon.com/rbbnmpcf.json"
                            trigger="hover">
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=' py-2 border border-white text-center '>
                      <div className='lordiconcopy flex items-center justify-center' onClick={() => { copyText(item.username) }}>
                        <span>{item.username}</span>
                        <div className='size-7 cursor-pointer'>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "2px", "paddingLeft": "1px" }}
                            src="https://cdn.lordicon.com/rbbnmpcf.json"
                            trigger="hover">
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=' py-2 border border-white text-center '>
                      <div className='lordiconcopy flex items-center justify-center' onClick={() => { copyText(item.password) }}>
                        <span>{item.password}</span>
                        <div className='size-7 cursor-pointer'>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "2px", "paddingLeft": "1px" }}
                            src="https://cdn.lordicon.com/rbbnmpcf.json"
                            trigger="hover">
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=' py-2 border border-white text-center '>
                      <span className='cursor-pointer mx-1'onClick={()=>{editPassword(item.id)}}>
                        <lord-icon
                          src="https://cdn.lordicon.com/rsbokaso.json"
                          trigger="hover"
                          style={{"width":"25px","height":"25px"}}>
                        </lord-icon>
                      </span>
                      <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/wpyrrmcq.json"
                          trigger="hover"
                          style={{"width":"25px","height":"25px"}}>
                        </lord-icon>
                      </span>
                    </td>
                  </tr>
                })}

              </tbody>
            </table>}
          </div>
        </div>
    </>
  )
}

export default Manager


