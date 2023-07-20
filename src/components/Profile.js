import React from 'react'
import { useEffect , useState} from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const BASE_URL=process.env.REACT_APP_BASE_URL
  const fetchUserDetails=async()=>{
    const response=await fetch(`${BASE_URL}/api/auth/getuser`,{
            method:'POST',
            headers:{
              'content-Type':'application/json',
              'auth-token':localStorage.getItem('token')
            },
          });
          const user=await response.json();
          setUser(user);
  }
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>User Details</h2>
        </div>
        <div className="card-body">
          {user ? (
            <>
              <p className="card-text"><strong>Name:</strong> {user.name}</p>
              <p className="card-text"><strong>Email:</strong> {user.email}</p>
              {/* Add other properties you want to display here */}
            </>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
