'use client'
import React from 'react'

const Main = () => {
  const stores = [
    { name: 'Hardware & Co', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
    { name: 'Store of hardware', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
    { name: 'New store', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
    { name: 'Mega hardware store', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
    { name: 'Ferramenta Store', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
    { name: 'Roman Hardware', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
    { name: 'Roman Hardware', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
    { name: 'Roman Hardware', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
];
  return (

    <div className="min-h-[100vh] sm:w-[90%] md:w-[90%] lg:w-[80%] p-4 md:p-8">
    <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-0">Store Locator</h1>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <input className="border p-2 rounded w-full md:flex-1" placeholder="Rome, RM, Italy" />
                <button className="border p-2 rounded bg-blue-500 text-white w-full md:flex-1">SEARCH</button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="order-2 md:order-1">
                <div className="relative mb-4 md:mb-0">
                    <img src="https://placehold.co/600x550" alt="Map placeholder" className="rounded-lg w-full" />
                    <div className="absolute bottom-0 left-0 bg-white p-4 rounded-lg m-4">
                        <h2 className="font-semibold">Hardware Store</h2>
                        <p className="text-sm">VIA TAL DEI TALI 69, 00100 - ROME</p>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                                <i className="fas fa-map-marker-alt text-blue-500"></i>
                                <span className="ml-2 text-sm">3.5KM</span>
                            </div>
                            <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded">INDICATIONS</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-1 md:order-2">
                <div className="h-[40vh] lg:h-[70vh] space-y-4 overflow-y-auto">
                    {stores.map((store, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">{store.name}</h3>
                                <p className="text-sm">{store.address}</p>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-map-marker-alt text-gray-500"></i>
                                <span className="ml-2 text-sm">{store.distance}</span>
                                <button className="ml-4 bg-gray-200 text-sm px-4 py-2 rounded">INDICATIONS</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
</div>

  )
}

export default Main
