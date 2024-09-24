import { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "../firebase/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import AuthContext from "./AuthContext";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  const addProduct = async (title, Category, price, images) => {
    try {
      let imageUrls = [];

      for (let image of images) {
        const storageRef = ref(storage, `/images/${image.name}`);
        await uploadBytes(storageRef, image);
        let url = await getDownloadURL(storageRef);
        imageUrls.push(url);
      }

      await addDoc(collection(db, "products"), {
        user: user.uid,
        userName: user.displayName,
        title,
        Category,
        price,
        imageUrls,
        createdAt: new Date().toDateString(),
      });

      await getProduct();

      return { success: true };
    } catch (error) {
      throw new Error(error.message)
    }
  };

  
  const getProduct = async () => {
    try {
      let snapshot = await getDocs(collection(db, "products"));
      let allProducts = snapshot?.docs?.map((product) => {
        return {
          ...product.data(),
          id: product.id,
          createdAt: new Date(product.data().createdAt),
        };
      });

      allProducts.sort((a,b) => b.createdAt - a.createdAt)

      setProducts(allProducts);
      
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    if (user) {
      getProduct();
    }
  }, [user]);

  return (
    <ProductContext.Provider value={{ user, addProduct, products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
