// import React, { useEffect, useState } from 'react';
// import Service from './Service';

// const Profile = () => {
//   const [profileData, setProfileData] = useState({ id: '', name: '', email: '', password: '' });

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await Service.getProfile();
//         setProfileData(response);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   return (
//       <div style={{width:"100%",display:"flex",justifyContent:"center",padding:"20px"}}>
//         <div  style={{width:"500px",gap:"10px",padding:"20px 10px",border:"1px solid #0005",borderRadius:"5px",display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
//           <h3 style={{background:"#5397f3",textAlign:"center",color:"white",width:"100%",margin:0,padding:"10px 2px",borderRadius:"5px"}}>profile</h3>
//           <div style={{display:"flex",flexDirection:"row",marginTop:"20px",columnGap:"10px",height:"max-content",alignItems:"center"}}>
//             <i style={{fontSize:"20px",margin:0,padding:0}} class="fa fa-user" aria-hidden="true"></i>
//             <p style={{fontSize:"18px",padding:"0px",margin:0}}>Id</p>
//           </div>
//           <hr style={{border:"1px solid #0008",width:"80%",margin:0,padding:0}}/>
//             <p style={{fontSize:"18px",padding:"0px",margin:0,fontWeight:300}}>{profileData.id}</p>
//           <hr style={{border:"1px solid #0008",width:"80%",margin:0,padding:0}}/>

//           <div style={{marginTop:"20px",display:"flex",flexDirection:"row",columnGap:"10px",height:"max-content",alignItems:"center"}}>
//             <i style={{fontSize:"20px",margin:0,padding:0}} class="fa fa-id-badge" aria-hidden="true"></i>
//             <p style={{fontSize:"18px",padding:"0px",margin:0}}>Name</p>
//           </div>
//           <hr style={{border:"1px solid #0008",width:"80%",margin:0,padding:0}}/>
//             <p style={{fontSize:"18px",padding:"0px",margin:0,fontWeight:300}}>{profileData.name}</p>
//           <hr style={{border:"1px solid #0008",width:"80%",margin:0,padding:0}}/>

//           <div style={{marginTop:"20px",display:"flex",flexDirection:"row",columnGap:"10px",height:"max-content",alignItems:"center"}}>
//             <i style={{fontSize:"20px",margin:0,padding:0}} class="fa fa-envelope" aria-hidden="true"></i>
//             <p style={{fontSize:"18px",padding:"0px",margin:0}}>Email</p>
//           </div>
//           <hr style={{border:"1px solid #0008",width:"80%",margin:0,padding:0}}/>
//             <p style={{fontSize:"18px",padding:"0px",margin:0,fontWeight:300}}>{profileData.email}</p>
//           <hr style={{border:"1px solid #0008",width:"80%",margin:0,padding:0}}/>          
//         </div>
//       </div>
//   );
// };

// export default Profile;

// Profile.js
import React, { useEffect, useState } from 'react';
import './profile.css';
import Service from './Service';

const Profile = () => {
  const [profileData, setProfileData] = useState({ id: '', name: '', email: '', password: '' });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await Service.getProfile();
        setProfileData(response);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card profile-card">
        <div className="card-body">
          <h5 className="card-title mb-4">User Profile</h5>
          <div className="row mb-3">
            <div className="col-md-3">
              <strong>ID:</strong>
            </div>
            <div className="col-md-9">{profileData.id}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Name:</strong>
            </div>
            <div className="col-md-9">{profileData.name}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Email:</strong>
            </div>
            <div className="col-md-9">{profileData.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
