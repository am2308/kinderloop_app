import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SellItem() {
  const [item, setItem] = useState({
    type: "",
    price: "",
    count: "",
    description: "",
    category: "",
    weight: "",
    dimensions: "",
    itemUrl: "",
    wantsPackaging: false,
    address: "",
    images: [] as File[], // Array to store uploaded images
  });

  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [finalPrice, setFinalPrice] = useState<number | null>(null); // State to store final price after deductions
  const [isUploading, setIsUploading] = useState(false); // State to track image upload progress

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setItem((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Recalculate final price when price changes
    if (name === "price" && value) {
      const price = parseFloat(value);
      const platformFee = price * 0.3; // 30% platform fee
      const shippingFee = 100; // Fixed shipping fee (example)
      const convenienceFee = 50; // Fixed convenience fee (example)
      const finalPrice = price - platformFee - shippingFee - convenienceFee;
      setFinalPrice(finalPrice);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 4); // Allow only 4 images
      setItem((prev) => ({
        ...prev,
        images: files,
      }));
    }
  };

  const uploadImagesToS3 = async (files: File[]) => {
    const uploadedUrls: string[] = [];
    setIsUploading(true);
  
    try {
      for (const file of files) {
        // Get a pre-signed URL from the backend for each file
        const response = await axios.post("http://localhost:5005/api/upload/get-presigned-url", {
          fileName: file.name,
          fileType: file.type,
        });
  
        const { presignedUrl, fileUrl } = response.data;
        console.log("Generated Pre-signed URL:", presignedUrl);
        console.log("Expected File URL:", fileUrl);
        console.log("Uploading file:", file.name, "Type:", file.type);

  
        // Upload the file to S3 using the pre-signed URL
        await axios.put(presignedUrl, file, {
          //headers: {
          //  "Content-Type": file.type,
            //"x-amz-acl": "public-read", // Allow public access to the uploaded file
          //},
        });
  
        uploadedUrls.push(fileUrl);
      }
    } catch (err) {
      console.error("Error uploading images:", err);
      throw new Error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!item.type || !item.price || !item.count || !item.description || !item.category) {
      setError("All fields are required!");
      return;
    }
  
    if (item.wantsPackaging && !item.address) {
      setError("Address is required if you want packaging!");
      return;
    }
  
    if (item.images.length === 0) {
      setError("Please upload at least one image of the product!");
      return;
    }
  
    setError("");
  
    try {
      // Upload images to S3 and get their URLs
      const imageUrls = await uploadImagesToS3(item.images);

      const token = localStorage.getItem('token');
      
      if (!token && !user) {
        throw new Error('Please log in to place an order');
      }
  
      // Submit the item data along with the image URLs
      const itemData = {
        ...item,
        images: imageUrls, // Replace files with S3 URLs
      };
  
      const response = await axios.post("http://localhost:5005/api/sell", itemData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Item submitted:", response.data);
      alert("Item listed successfully!");
      navigate("/"); // Redirect to home page");
    } catch (err) {
      console.error("Error during submission:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen p-6"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Form Container */}
      <div className="relative max-w-lg w-full bg-white shadow-lg rounded-lg p-6 backdrop-blur-md bg-opacity-80">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Sell an Item</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="type"
            placeholder="Item Type"
            value={item.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Estimated Price (INR)"
            value={item.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {finalPrice !== null && (
            <p className="text-sm text-gray-600">
              Final Price After Deductions: <span className="font-bold">₹{finalPrice.toFixed(2)}</span>
            </p>
          )}

          <input
            type="number"
            name="count"
            placeholder="Item Count"
            value={item.count}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={item.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>

          <select name="category" value={item.category} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Category</option>
            <option value="clothes">Clothes</option>
            <option value="toys">Toys</option>
          </select>

          {item.category === "clothes" && (
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={item.weight}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          )}

          {item.category === "toys" && (
            <input
              type="text"
              name="dimensions"
              placeholder="Dimensions (LxWxH cm)"
              value={item.dimensions}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          )}

          <input
            type="url"
            name="itemUrl"
            placeholder="Item URL (if bought online)"
            value={item.itemUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              name="wantsPackaging"
              checked={item.wantsPackaging}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700">Do you want a bag/box for delivery?</label>
          </div>

          {item.wantsPackaging && (
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              value={item.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Product Images (Max 4)</label>
            <input
              type="file"
              name="images"
              onChange={handleImageUpload}
              multiple
              accept="image/*"
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            disabled={isUploading}
          >
            {isUploading ? "Uploading Images..." : "List Item"}
          </button>
        </form>
      </div>
    </div>
  );
}