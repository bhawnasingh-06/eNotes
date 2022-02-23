import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email,password:credentials.password})
        });
        const json = await response.json();  
        console.log(json); 

        if(json.success)
        {
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged in successfully :)", "success");
            navigate('/');
            

        } 
        else
        {
            props.showAlert("Invalid details", "danger");
        }
    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    
      }

    return (
        <section className="vh-80">
  <div className="container py-3 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image"/>
      </div>
      <div className="col-md-6 col-lg-5 col-xl-5 offset-xl-1">
          <div className="mb-4"><h3>Please log in to continue using e-Notes</h3></div>
        <form onSubmit={handleSubmit}>
         
          <div className="form-outline mb-4">
            <input type="email" id="email" name="email" value={credentials.email} onChange={onchange}  className="form-control form-control-lg" />
            <label className="form-label" htmlFor="email">Email address</label>
          </div>

        
          <div className="form-outline mb-4">
            <input type="password"  id="password" name="password" value={credentials.password}onChange={onchange} className="form-control form-control-lg" />
            <label className="form-label" htmlFor="password">Password</label>
          </div>

          <div className="d-flex justify-content-around align-items-center mb-4">
          </div>

       
          <button type="submit" className="btn btn-dark btn-lg btn-block">Log in</button>
        </form>
      </div>
    </div>
  </div>
</section>


    )
}
export default Login