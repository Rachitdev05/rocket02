import React, { useState } from "react";

const EditProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/150?random=1",
      },
      {
        url: "https://picsum.photos/150?random=2",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevdata) => ({ ...prevdata, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(productData);
  };
  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(productData);
  }
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/**Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/**Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          />
        </div>
        {/**Price  */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/**Count inS Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">Count in Stock </label>
          <input
            type="number"
            name="CountInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/***Sku */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/**Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/**Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            name="ccolors"
            value={productData.colors.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/**IMage Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={image}>
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
{
  /** NA padhaee hue h yr 10 din se Bhnchoddddddddddddddddddd
  kl se mtlb 20 tareek se nhi to 21 se pkka padhna shuru serious bilkul
  aur maths-1 jo back ka ppr h uska bhi padhna hai
  yr fti pdi h bilkul kya kra jaye bhnchod hadh ho gyi yrr
  padhna pdega serious hoke tbhi kch hassil hoga pasia kamana h bhot
  Ek average Human ni bankr rehna 25 tk sb kch badalna h yrr khud pr kaam krna a
  Bhot mehnaat krni h mn se hoga bgnchodd krna pdega life bhot khrab ho jaegi apne aap ko sbse zada time de
  side hustle mtlb amazon seller bhi bananaa krna h yrr selfish bn yrr apne dimaag se gandh nikaal bhai */
}
