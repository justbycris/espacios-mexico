import React from 'react'

export default function CreateListing() {
  return (
    <main>
        <h1 className="text-3xl font-semibold text-center my-7">Create Listing</h1>
        <form className='flex flex-col mx-auto max-w-5xl sm:flex-row gap-4'>
            <div className="flex flex-col gap-4 flex-1">
                <input type="text" placeholder="Name" id="name" className="border p-3 rounded-lg" maxLength='62' minLength='10' required/>
                <textarea type="text" placeholder="Description" id="description" className="border p-3 rounded-lg" required/>
                <input type="text" placeholder="Address" id="address" className="border p-3 rounded-lg" required/>
                <div className="flex gap-6 flex-wrap">
                    <div className="flex gap-6 flex-wrap">
                        <input type="checkbox" id="sale" className="w-5"/>
                        <span>Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="rent" className="w-5"/>
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="parking" className="w-5"/>
                        <span>Parking Spot</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="furnished" className="w-5"/>
                        <span>Furnished</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="offer" className="w-5"/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                        <input type="number" className="p-3 border border-gray-300 rounded-lg" id="bedrooms" required/>
                        <span>Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" className="p-3 border border-gray-300 rounded-lg" id="bathrooms" required/>
                        <span>Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" className="p-3 border border-gray-300 rounded-lg" id="regularPrice" required/>
                        <span>Regular Price</span>
                        
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" className="p-3 border border-gray-300 rounded-lg" id="discountedPrice" required/>
                        <span>Discounted Price</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
                <p className="font-semibold">Images:
                <span className="font-normal text-gray-700 ml-2">The first image will be the cover (max 6)</span>
                </p>
                <div className="flex gap-4">
                    <input type="file" id="images" accept="image/" multiple className="p-3 border-gray-300 rounded"/>
                    <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
                </div>
            <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Create Listing</button>

            </div>
        </form>
    </main>
  )
}
