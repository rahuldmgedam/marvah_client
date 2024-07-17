import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

const Modal = ({ side, onClose, onSave }) => {
  const [editedSide, setEditedSide] = useState({ ...side });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSide((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNozzleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedNozzles = editedSide.nozzles.map((nozzle, i) =>
      i === index ? { ...nozzle, [name]: value } : nozzle
    );
    setEditedSide((prevState) => ({
      ...prevState,
      nozzles: updatedNozzles,
    }));
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-lg p-6 relative z-20 w-full max-w-md mx-auto">
          <Dialog.Title className="text-lg font-bold mb-4">Edit Side {side.sideNo}</Dialog.Title>
          <form>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Side No</label>
              <input
                type="number"
                name="sideNo"
                value={editedSide.sideNo}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
            {editedSide.nozzles.map((nozzle, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold mb-2">Nozzle {nozzle.nozzleNo}</h4>
                <label className="block mb-1 font-semibold">Nozzle Product</label>
                <input
                  type="text"
                  name="nozzleProduct"
                  value={nozzle.nozzleProduct}
                  onChange={(e) => handleNozzleChange(index, e)}
                  className="w-full border px-2 py-1 rounded"
                />
                <label className="block mb-1 font-semibold mt-2">Tank</label>
                <input
                  type="number"
                  name="tank"
                  value={nozzle.tank}
                  onChange={(e) => handleNozzleChange(index, e)}
                  className="w-full border px-2 py-1 rounded"
                />
                <label className="block mb-1 font-semibold mt-2">Meter Reading</label>
                <input
                  type="number"
                  name="opMeterReading"
                  value={nozzle.opMeterReading ?? ''}
                  onChange={(e) => handleNozzleChange(index, e)}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onSave(editedSide)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
