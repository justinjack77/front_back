// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

const Register = () => {
  <div>
    Register Page
  </div>
//   const [values,setValues] = useState({
//     email:'',
//     password:''
// })
// const PORT = 8000;
//   const navigate = useNavigate('/')
//   axios.defaults.withCredentials=true;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post(`http://localhost:${PORT}/register`,values)
//     .then(res => {
//         if(res.data.Status === "Success"){
//             navigate('/')
//         }else{
//             alert(res.data.Message)
//         }
//     })
//     .catch(err=>console.log(err));
   
//   };

//   return (
//     <div className="container">
//       <div className="row d-flex justify-content-center align-items-center h-100">
//         <div className="col-md-9 col-lg-6 col-xl-6 my-lg-5 py-lg-5">
//           <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
//         </div>
//         <div className="col-md-8 col-lg-6 col-xl-5 offset-xl-1 my-lg-5 py-lg-5">
//           <form onSubmit={handleSubmit}>
//             <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
//               <p className="lead fw-normal mb-0 me-3">Register with</p>
//               <button type="button" className="btn btn-primary btn-floating mx-1">
//                 <i className="fab fa-facebook-f"></i>
//               </button>

//               <button type="button" className="btn btn-primary btn-floating mx-1">
//                 <i className="fab fa-twitter"></i>
//               </button>

//               <button type="button" className="btn btn-primary btn-floating mx-1">
//                 <i className="fab fa-linkedin-in"></i>
//               </button>
//             </div>

//             <div className="divider d-flex align-items-center my-4">
//               <p className="text-center fw-bold mx-3 mb-0">Or</p>
//             </div>

//             <div className="form-outline mb-4">
//               <input
//                 type="email"
//                 id="form3Example3"
//                 className="form-control form-control-lg"
//                 placeholder="Enter a valid email address"
//                 onChange={e => setValues({...values, email: e.target.value})}
//                 required
//               />
//               {/* <label className="form-label" htmlFor="form3Example3" style={{ marginLeft: '0px' }}>Email address</label> */}
//             </div>

//             <div className="form-outline mb-3">
//               <input
//                 type="password"
//                 id="form3Example4"
//                 className="form-control form-control-lg"
//                 placeholder="Enter password"
//                 onChange={e => setValues({...values, password: e.target.value})}
//                 required
//               />
//               {/* <label className="form-label" htmlFor="form3Example4" style={{ marginLeft: '0px' }}>Password</label> */}
//             </div>

//             <div className="d-flex justify-content-between align-items-center">
//               <div className="form-check mb-0">
//                 <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
//                 <label className="form-check-label" htmlFor="form2Example3">
//                   Remember me
//                 </label>
//               </div>
              
//             </div>

//             <div className="text-center text-lg-start mt-4 pt-2">
//             <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Register</button>
//               <p className="small fw-bold mt-2 pt-1 mb-0"> Do have an account? <a href="/login" className="link-danger">Login</a></p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
};

export default Register;