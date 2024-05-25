"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, PlusIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function AdmProducts() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <Link href="/pages/admproducts/registerproducts" className="p-4 hover:bg-gray-600 flex items-center">
            <PlusIcon className="h-6 w-6" />
            {isMenuOpen && <span className="ml-2">Register Products</span>}
          </Link>
          <Link href="/pages/admproducts/editproducts" className="p-4 hover:bg-gray-600 flex items-center">
            <PencilIcon className="h-6 w-6" />
            {isMenuOpen && <span className="ml-2">Edit Products</span>}
          </Link>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Dashboard de Vendas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">Total de Vendas</h3>
            <p className="mt-2 text-2xl">R$ 50.000,00</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">Produtos Vendidos</h3>
            <p className="mt-2 text-2xl">150</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">Clientes Ativos</h3>
            <p className="mt-2 text-2xl">75</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">Feedbacks</h3>
            <p className="mt-2 text-2xl">25</p>
          </div>
        </div>
      </div>
    </div>
  );
}