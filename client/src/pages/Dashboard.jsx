import axios from "axios";
import { Fragment, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const deleteProduct = (id) => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            return navigate('/login');
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        let deleteItem = window.confirm("Hapus product ini ?");
        if (deleteItem) {
            axios
              .delete(import.meta.env.VITE_BASE_URL + `/products/${id}`, config)
              .then(() => {
                alert("Produk berhasil dihapus");
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
                if(error.response.data.status === "Unauthorized"){
                    sessionStorage.removeItem("token");
                    alert("Tambah produk gagal! Sesi anda telah habis");
                    return navigate('/login');
                }
            });
          }
    }
    const logout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("token");
        window.location.reload();
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
        axios.get(
            import.meta.env.VITE_BASE_URL + "/products",
            config)
            .then((res) => setProducts(res.data.data))
            .catch((error) => {
                if(error.response.data.status === "Unauthorized"){
                    sessionStorage.removeItem("token");
                }
                return navigate('/login');
            })
    }, [navigate])

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
                    <Link to='/addproduct'>
                        <button type="button" className="btn btn-primary btn-sm my-4" style={{ width: 'auto' }}>Add Product</button>
                    </Link>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((product, index) => {
                                        return (
                                            <tr key={product.productId}>
                                                <td>{index + 1}</td>
                                                <td>{product.productName}</td>
                                                <td>{product.stock}</td>
                                                <td>
                                                    <Link to={`/editproduct/${product.productId}`}>
                                                        <button className="btn btn-sm btn-warning">Edit</button>
                                                    </Link>
                                                    <button className="btn btn-sm btn-danger ms-2" onClick={() => deleteProduct(product.productId)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })) : (
                                    <tr>
                                        <td>No Products Found!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard