import axios from 'axios';
import { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        fullname: "",
        gender: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((a) => {
            return { ...a, [name]: value };
        });
    };
    const handleChangeGender = (e) => {
        const { value } = e.target;
        setData((a) => {
            return { ...a, gender: value };
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, fullname, gender } = data;
        if (!email || !password || !fullname || !gender) {
            alert("All fields are required!");
        } else {
            axios
                .post(import.meta.env.VITE_BASE_URL + "/users/register", {
                    email,
                    password,
                    fullname,
                    gender
                })
                .then((res) => {
                    console.log(res);
                    alert("Akun berhasil ditambahkan!");
                    navigate('/login')
                })
                .catch((error) => console.log(error));
        }
    };
    useEffect(() => {
        const token =  sessionStorage.getItem("token");
        if(token){
          navigate('/dashboard');
        }    
      }, [navigate]);
    console.log(data);
    return (
        <Fragment>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-10 col-md-8 col-lg-6">
                        <form onSubmit={handleSubmit}>
                            <h2 className='text-center mb-4'>Register</h2>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Alamat Email</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name='password' onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fullname" className="form-label">Nama Lengkap</label>
                                <input type="text" className="form-control" id="fullname" aria-describedby="fullnameHelp" name='fullname' onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select className="form-select" aria-label="genderSelect" onChange={handleChangeGender}>
                                    <option value="">- Pilih gender</option>
                                    <option value="laki-laki">Laki-laki</option>
                                    <option value="perempuan">Perempuan</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 my-4">Sign Up</button>
                            <p className='text-center'>Sudah punya akun? <Link to='/login'>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Register