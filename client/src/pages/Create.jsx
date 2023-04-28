import axios from 'axios';
import { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((a) => {
            return { ...a, [name]: value };
        });
    }
    const handleSubmit = (e) => {
        if (!token) {
            return navigate('/login');
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        e.preventDefault();
        const { productName, stock } = product;
        if (!productName) {
            alert("Product name must be filled!");
        } else {
            axios
                .post(import.meta.env.VITE_BASE_URL + "/products", {
                    productName,
                    stock
                }, config)
                .then((res) => {
                    console.log(res);
                    navigate('/dashboard')
                })
                .catch((error) => {
                    if(error.response.data.status === "Unauthorized"){
                        sessionStorage.removeItem("token");
                        alert("Tambah produk gagal! Sesi anda telah habis");
                        return navigate('/login');
                    }
                    console.log(error);
                    alert("Tambah produk gagal! Cek nama produk dan stock anda!");
                });
        }
    }
    const logout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("token");
        window.location.reload();
    }
    useEffect(() => {
      if(!token){
        navigate('/login')
      }
    }, [navigate, token])
    
    return (
        <Fragment>
            <nav className="navbar bg-light">
                <div className="container">
                    <span className="navbar-brand">
                        CRUD Product App
                    </span>
                    <span onClick={logout}>
                        Logout
                    </span>
                </div>
            </nav>
            <div className="container">
                <div className="row">
                    <Link to='/dashboard'>
                        <p>Kembali ke Dashboard</p>
                    </Link>
                </div>
                <div className="row justify-content-center">
                    <div className="col-10 col-md-8 col-lg-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="productName" className="form-label">Nama Product</label>
                                <input type="text" className="form-control" id="productName" aria-describedby="productNameHelp" name='productName' onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stock" className="form-label">Stock</label>
                                <input type="text" className="form-control" id="stock" aria-describedby="stockHelp" name='stock' onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 my-4">Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Create