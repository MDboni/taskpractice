import React, { useState } from 'react';
import Swal from 'sweetalert2';

const App = () => {
  const [fields, setFields] = useState([{ input: '', select: '', errors: {} }]);
  const [options, setOptions] = useState(['Option A', 'Option B', 'Option C']); // initial options
  const [newOption, setNewOption] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (index, value) => {
    const updated = [...fields];
    updated[index].input = value;
    setFields(updated);
  };

  const handleSelectChange = (index, value) => {
    const updated = [...fields];
    updated[index].select = value;
    setFields(updated);
  };

  const addField = () => {
    setFields([...fields, { input: '', select: '', errors: {} }]);
  };

  const deleteField = (index) => {
    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);

    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'Field deleted successfully.',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const addOption = () => {
    if (!newOption.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Option',
        text: 'Please type something to add!',
      });
      return;
    }
    setOptions([...options, newOption]);
    setNewOption('');
    Swal.fire({
      icon: 'success',
      title: 'Option Added!',
      text: `${newOption} added successfully.`,
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fields.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Fields',
        text: 'Please add at least one field before submitting!',
      });
      return;
    }

    let isValid = true;

    const updated = fields.map((item) => {
      let errors = {};
      if (!item.input.trim()) {
        errors.input = 'Input is required';
        isValid = false;
      }
      if (!item.select.trim()) {
        errors.select = 'Select option is required';
        isValid = false;
      }
      return { ...item, errors };
    });

    setFields(updated);
    setSubmitted(true);

    if (!isValid) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill all input and select fields before submitting!',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Form Submitted!',
      text: 'All fields are filled correctly.',
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">6sense HQ Limited Form</h2>

     

      <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-lg shadow-lg">
        {fields.map((item, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex flex-col flex-1">
              <input
                type="text"
                placeholder="Enter text"
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={item.input}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              {item.errors.input && <p className="text-red-500 text-sm mt-1">{item.errors.input}</p>}
            </div>

            <div className="flex flex-col flex-1">
              <select
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={item.select}
                onChange={(e) => handleSelectChange(index, e.target.value)}
              >
                <option value="">Select option</option>
                {options.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {item.errors.select && <p className="text-red-500 text-sm mt-1">{item.errors.select}</p>}
            </div>

            <button
              type="button"
              onClick={() => deleteField(index)}
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={addField}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            + Add Field
          </button>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </div>
      </form>

      {submitted && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-3">Form State Table</h3>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Input</th>
                <th className="border p-2">Select</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="border p-2">{item.input}</td>
                  <td className="border p-2">{item.select}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="font-bold mt-6">
        Powerd By:{' '}
        <span>
          <span className="text-red-500">Boni</span>{' '}
          <span className="text-blue-500">Amin</span>{' '}
          <span className="text-green-500">Jayed</span>{' '}
        </span>
      </h2>
    </div>
  );
};

export default App;
