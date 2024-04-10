import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const {setAuthUser} = useAuthContext()

  const login = async (username, password) => {
    setLoading(true);

  const success =  handleInputErrors(username,password);
    if (!success) return;
    
    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        })

        if (username !== 'demo@example.com' || password !== '123456') {
          throw new Error('Invalid username or password');
        }

        

        const data = await res.json()
        if(data.error){
            throw new Error(data.error)
        }

        //Set user data in local storage
        localStorage.setItem("chat-user", JSON.stringify(data))
        //Set user data in context
        setAuthUser(data)
    
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
  }

  const demoUser = () => {
     login('demo', '123456');
    // login.setValue('demo@example.com');
    // login.setValue('123456');
    };

return {loading, login, demoUser}
}

export default useLogin;

function handleInputErrors(username, password) {
    if(  !username || !password ) {
      toast.error('Please fill in all fields') 
      return false;
    }

    return true;

}

