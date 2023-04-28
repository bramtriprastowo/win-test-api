import axios from "axios";
import { Fragment, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((a) => {
            return { ...a, [name]: value };
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = data;
        if (!email || !password) {
            alert("All fields are required!");
        } else {
            axios
                .post(import.meta.env.VITE_BASE_URL + "/users/login", {
                    email,
                    password
                })
                .then((res) => {
                    console.log(res.data.data.accessToken);
                    sessionStorage.setItem("token", res.data.data.accessToken);
                    navigate('/dashboard');
                    setTimeout(() => { sessionStorage.removeItem("token"); }, (15 * 60 * 1000));
                })
                .catch((error) => {
                    console.log(error);
                    alert("Login gagal! Cek email dan password anda!");
                });
        }
    };
    useEffect(() => {
      const token =  sessionStorage.getItem("token");
      if(token){
        navigate('/dashboard');
      }    
    }, [navigate])
    
    return (
        <Fragment>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-10 col-md-8 col-lg-6">
                        <form onSubmit={handleSubmit}>
                            <h2 className='text-center mb-4'>Login</h2>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Alamat Email</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 my-4">Login</button>
                        </form>
                        <p className="text-center">Belum punya akun? <Link to='/register'>Register</Link></p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login