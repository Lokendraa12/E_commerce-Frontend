import React, { useEffect, useState } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Products(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    let mounted = true;
    API.get('/products')
      .then(res => { if (mounted) setProducts(res.data); })
      .catch(()=>{})
      .finally(()=> { if (mounted) setLoading(false); });
    return ()=> mounted = false;
  }, []);

  return (
    <div style={{padding:20}}>
      <h1>Products</h1>
      {loading ? <div>Loading...</div> : (
        <div className="grid-3">
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}
