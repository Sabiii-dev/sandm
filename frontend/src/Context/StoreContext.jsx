import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setcartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");

    // Add placeOrder function to context
    const placeOrder = async (orderData) => {
        try {
            let orderItems = [];
            food_list.forEach((item) => {
                if (cartItems[item._id] > 0) {
                    orderItems.push({
                        ...item,
                        quantity: cartItems[item._id]
                    });
                }
            });

            const orderPayload = {
                items: orderItems,
                amount: getTotalCartAmount(),
                customerName: `${orderData.firstName} ${orderData.lastName}`,
                customerEmail: orderData.email,
                customerPhone: orderData.phone,
                address: {
                    street: orderData.street,
                    city: orderData.city,
                    state: orderData.state,
                    zipcode: orderData.zipcode,
                    country: orderData.country
                },
                userId: token ? localStorage.getItem("userId") : null
            };

            // If user is logged in, include token in headers
            const config = token ? { headers: { token } } : {};
            
            const response = await axios.post(`${url}/api/order/place`, orderPayload, config);
            
            if (response.data.success) {
                setcartItems({}); // Clear cart after successful order
                return { success: true, orderId: response.data.orderId };
            }
            return { success: false, message: "Failed to place order" };
        } catch (error) {
            console.error("Error placing order:", error);
            return { success: false, message: error.message };
        }
    };

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setcartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
        toast.success("Added to cart");
    };

    const removeFromCart = async (itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            toast.success("Removed from cart");
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const [food_list, setFoodList] = useState([]);

    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        setFoodList(response.data.data);
    };

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setcartItems(response.data.cartData);
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const ContextValue = {
        food_list,
        cartItems,
        setcartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        placeOrder, // Add placeOrder to context
    };

    return (
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
