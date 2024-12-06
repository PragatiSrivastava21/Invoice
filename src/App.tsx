import React, { useState } from "react";

export function App (){


  
  const [invoiceData, setInvoiceData] = useState({
    companyName: "",
    clientName: "",
    items: [{ description: "", quantity: 1, price: 0 }],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedItems = invoiceData.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setInvoiceData((prev) => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const calculateTotal = () => {
    const total = invoiceData.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(total);
  };

  return (
    <>
    <div className="p-8 bg-gray-100  mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Invoice </h1>
      <div className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={invoiceData.companyName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Client Name</label>
          <input
            type="text"
            name="clientName"
            value={invoiceData.clientName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <h2 className="text-lg font-semibold mb-2">Items</h2>
        
       
        <table className="w-full table-auto border-collapse mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b">Description</th>
              <th className="px-4 py-2 text-left border-b">Quantity</th>
              <th className="px-4 py-2 text-left border-b">Price (₹)</th>
              <th className="px-4 py-2 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", parseInt(e.target.value))
                    }
                    className="w-24 p-2 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(index, "price", parseFloat(e.target.value))
                    }
                    className="w-24 p-2 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => removeItem(index)}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={addItem} className="p-2 bg-blue-500 text-white rounded">
          Add Item
        </button>

        

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Total: {calculateTotal()}</h2>
        </div>
      </div>
    </div>
    </>
  );
};


