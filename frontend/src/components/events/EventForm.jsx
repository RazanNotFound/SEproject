import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEvent, updateEvent, getEventById } from "../../services/api";

export default function EventForm() {
  const [form, setForm] = useState({ 
    title: "", 
    date: "", 
    location: "", 
    price: 0, 
    ticketCount: 0 
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      getEventById(id).then(setForm);
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ 
      ...form, 
      [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateEvent(id, form);
    } else {
      await createEvent(form);
    }
    navigate("/my-events");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-300 hover:text-white mr-4"
          >
            <span className="material-icons">arrow_back</span>
          </button>
          <h1 className="text-xl font-semibold">
            {isEdit ? "Edit Event" : "Create New Event"}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Details Card */}
          <div className="bg-gray-800 rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Event Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Event Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ticket Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 pl-8 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      min="0"
                      required
                    />
                    <span className="absolute left-3 top-3 text-gray-400">$</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Available Tickets <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="ticketCount"
                    value={form.ticketCount}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              {isEdit ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}