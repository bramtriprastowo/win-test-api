import axios from 'axios';
import { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const [product, setProduct] = useState({
        productName: "",
        stock: 0
    });
    const { id } = useParams();
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
                .put(import.meta.env.VITE_BASE_URL + `/products/${id}`, {
                    productName,
                    stock
                }, config)
                .then((res) => {
                    console.log(res);
                    navigate('/dashboard')
                })
                .catch((error) => {
                    if(error.response.data.status === "Unauthorized"){
                        alert("Tambah produk gagal! Sesi anda telah habis");
                        sessionStorage.removeItem("token");
                        return navigate('/login')
                    }
                    console.log(error);
                    alert("Tambah produk gagal! Cek nama produk dan stock anda!");
                });
        }
    }
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            return navigate('/login');
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios
            .get(import.meta.env.VITE_BASE_URL + `/products/${id}`, config)
            .then((res) => setProduct(res.data.data))
    }, [navigate, token, id])

    return (
        <Fragment>
            <nav className="navbar bg-light">
                <div className="container">
                    <span className="navbar-brand">
                        CRUD Product App
                    </span>
                    <span>
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
                                <input type="text" className="form-control" id="productName" aria-describedby="productNameHelp" name='productName' onChange={handleChange} value={product.productName}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stock" className="form-label">Stock</label>
                                <input type="text" className="form-control" id="stock" aria-describedby="stockHelp" name='stock' onChange={handleChange} value={product.stock}/>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 my-4">Edit Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Edit