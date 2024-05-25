"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, UserCircleIcon, PlusIcon} from '@heroicons/react/24/outline';

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string | null;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: 'Produto 1',
      description: 'Descrição do Produto 1',
      price: 'R$ 1.000,00',
      image: null,
    },
    {
      id: 2,
      title: 'Produto 2',
      description: 'Descrição do Produto 2',
      price: 'R$ 2.000,00',
      image: null,
    },
    {
      id: 3,
      title: 'Produto 3',
      description: 'Descrição do Produto 3',
      price: 'R$ 3.000,00',
      image: null,
    },
  ]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleSave = (editedProduct: Product) => {
    setProducts(products.map(product => (product.id === editedProduct.id ? editedProduct : product)));
    setEditingProduct(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingProduct) return;
    const { id, value } = e.target;
    setEditingProduct({ ...editingProduct, [id]: value });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
        className={`bg-gray-800 text-white ${isMenuOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 flex items-center justify-center">
          {isMenuOpen ? (
            <h1 className="text-lg font-bold">Admin Menu</h1>
          ) : (
            <div className="flex flex-col items-center">
              <Bars3Icon className="h-6 w-6" />
              <span className="text-sm">Menu</span>
            </div>
          )}
        </div>
        <nav className="flex flex-col space-y-2">
          <Link href="/pages/admproducts" className="p-4 hover:bg-gray-600 flex items-center">
            <UserCircleIcon className="h-6 w-6" />
            {isMenuOpen && <span className="ml-2">Adm</span>}
          </Link>
          <Link href="/pages/admproducts/registerproducts" className="p-4 hover:bg-gray-600 flex items-center">
            <PlusIcon className="h-6 w-6" />
            {isMenuOpen && <span className="ml-2">Register Products</span>}
          </Link>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Lista de Produtos</h2>
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow-md w-full max-w-md mb-4">
              {editingProduct?.id === product.id ? (
                <>
                  <input
                    type="text"
                    id="title"
                    value={editingProduct.title}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <textarea
                    id="description"
                    value={editingProduct.description}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <input
                    type="text"
                    id="price"
                    value={editingProduct.price}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <button
                    onClick={() => handleSave(editingProduct)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="mb-2">{product.description}</p>
                  <p className="mb-2">{product.price}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
