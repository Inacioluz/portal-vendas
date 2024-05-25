"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bars3Icon, UserCircleIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function Product() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rawPrice, setRawPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Price:', price);
    console.log('Image:', image);

    router.push('/');
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const formatCurrency = (value: string) => {
    const numberValue = parseFloat(value.replace(/[^0-9,-]+/g, '').replace(',', '.'));
    if (isNaN(numberValue)) return '';
    return numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
          <Link href="/pages/admproducts/editproducts" className="p-4 hover:bg-gray-600 flex items-center">
            <PencilIcon className="h-6 w-6" />
            {isMenuOpen && <span className="ml-2">Edit Products</span>}
          </Link>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Cadastrar Produto</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Título
                </label>
                <input
                  placeholder="Título do produto"
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Descrição
                </label>
                <textarea
                  placeholder="Descrição do produto"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Valor
                </label>
                <input
                  placeholder="ex: R$ 10,00"
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^0-9,-]+/g, '');
                    setRawPrice(rawValue);
                    setPrice(e.target.value);
                  }}
                  onBlur={(e) => setPrice(formatCurrency(rawPrice))}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Imagem
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}