'use client'
import Image from "next/image";
import Header from "./components/header";
import { useEffect, useState } from 'react'
import { Button, message } from 'antd';
export default function Home() {
  const [productFrom, setProductForm] = useState({});
  const [allItems, setAllItems] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  let fetchItem = async () => {
    const res = await fetch('/api/product');
    const data = await res.json();
    setAllItems(data.allProducts);
    arrayShow();
  }
  useEffect(() => {
    fetchItem();
  }, []);


  const arrayShow = () => {
    console.log("hi i am good");
    console.log(allItems);
  }
  const handleInput = (e) => {
    setProductForm({ ...productFrom, [e.target.name]: e.target.value });
  }
  const addItem = async (e) => {
    e.preventDefault();
    try {
      messageApi.open({
        key,
        type: 'loading',
        content: 'Loading...',
      });
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productFrom),
      });

      if (response.ok) {
        console.log('Product added successfully!');
        messageApi.open({
          key,
          type: 'success',
          content: 'Loaded!',
          duration: 2,
        });
        fetchItem();

        setProductForm({});

      } else {
        messageApi.open({
          key,
          type: 'error',
          content: 'Error Occurred',
          duration: 2,
        });
        console.error('Error adding product:', response.statusText);
      }
    } catch (error) {
      messageApi.open({
        key,
        type: 'error',
        content: 'Error Occurred',
        duration: 2,
      });
      console.error('Error adding product:', error);
    }
  };
  return (
    <>
      {contextHolder}
      <Header />
      <div className="container mx-8">
        <h1 className="mb-6 text-3xl">Add Items</h1>

        <form className="mb-8 bg-red-400">
          <div className="flex mb-4">
            <label className="mr-2">Product Slug:</label>
            <input
              name="slug"
              type="text"
              className="border p-2"
              placeholder="Enter product slug"
              onChange={handleInput}
            />
          </div>

          <div className="flex mb-4">
            <label className="mr-2">Quantity:</label>
            <input
              name="quantity"
              type="number"
              className="border p-2"
              placeholder="Enter quantity"
              onChange={handleInput}
            />
          </div>

          <div className="flex mb-4">
            <label className="mr-2">Price:</label>
            <input
              name="price"
              type="number"
              step="0.01"
              className="border p-2"
              placeholder="Enter price"
              onChange={handleInput}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addItem}
          >
            Add Item
          </button>
        </form>
        <h2 className="mb-4 text-2xl">Items Display Table</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Slug</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Price</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{item.slug}</td>
                <td className="py-2 px-4 border">{item.quantity}</td>
                <td className="py-2 px-4 border">${item.price}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </>
  );
}
