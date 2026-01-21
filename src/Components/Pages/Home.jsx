import React, { useEffect, useState } from 'react'
import { add } from '../Slice/Cartslice'
import { addToWishlist } from '../Slice/WishlistSlice'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
    const [data, setData] = useState([])
    const [sold, setSold] = useState([])
    const [search, setSearch] = useState("")
    const [priceRange, setPricerate] = useState("") 


    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                setSold(data)
                setData(data)
            })
    }, [])

    const names = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    let ADD = (p) => {
        let num = names.find((totalitem) => totalitem.id === p.id)
        if (!num) {
            dispatch(add(p))
        } else {
            alert("product successfully added to cart")
        }
    }

    let ADD_WISHLIST = (p) => {
        dispatch(addToWishlist(p))
        alert("Added to Wishlist ")
    }

    let BUTTON = (a) => {
        let b = data.filter((item) => item.category === a)
        setSold(b)
    }


    const searching = (e) => {
        setSearch(e.target.value)
        let demo = data.filter((d) => (
            d.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            d.category.toLowerCase().includes(e.target.value.toLowerCase()) ||
            d.description.toLowerCase().includes(e.target.value.toLowerCase()))

        )
        setSold(demo)
    }

    const change = (e) => {
        setPricerate(e.target.value)
        let example = data.filter((i) => {
            if (e.target.value === "") {
                return true
            } else if (e.target.value === "0-200") {
                return i.price >= 0 && i.price <= 200
            } else if (e.target.value === "200-400") {
                return i.price >= 200 && i.price <= 400
            } else if (e.target.value === "400-600") {
                return i.price >= 400 && i.price <= 600
            }else if(e.target.value==="600-800"){
                return i.price >=600 && i.price<=800
            }else if(e.target.value==="800-1000"){
                return i.price >=800 && i.price<=1000
            }
            return false
        })
        setSold(example)
    }
    return (
        <>
            <p className='ul'>
                <button onClick={() => setSold(data)}>All</button>
                <button onClick={() => BUTTON("men's clothing")}>Mens'clothing</button>
                <button onClick={() => BUTTON("jewelery")}>Jewellery</button>
                <button onClick={() => BUTTON("electronics")}>Electronics</button>
                <button onClick={() => BUTTON("women's clothing")}>Womans'clothing</button>
                <input type="search" placeholder='Search Product' value={search} onChange={searching}></input>
                <select id='range'value={priceRange} onChange={change}>
                    <option>Select a Range</option>
                    <option>0-200</option>
                    <option>200-400</option>
                    <option>400-600</option>
                    <option>600-800</option>
                    <option>800-1000</option>
                </select>
            </p>

            <h1>Product's Detail's</h1>

            <div className='main'>
                {sold.map((p) => (
                    <div className='card' key={p.id}>
                        <h3>{p.title}</h3>
                        <img src={p.image} />
                        <h3>Price: {p.price}</h3>
                        <h5>Description: {p.description.slice(0, 100)}{p.description.length > 100 ? "..." : ""}</h5>
                        <h3>Category: {p.category}</h3>

                        <button onClick={() => ADD(p)}>Add to Cart</button>
                        <button onClick={() => ADD_WISHLIST(p)}>
                            <i class="fa-solid fa-heart"></i>
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home
