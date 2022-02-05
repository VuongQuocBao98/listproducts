import { useEffect, useState } from "react";
import productAPi from "../../../api/productApi";

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await productAPi.get(productId);
        setProduct(result);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [productId]);
  return {
    product,
    loading,
  };
}
