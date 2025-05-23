import React from "react";
import EventListForm from "../components/EventListForm";

const EventList = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Events</h1>
      <EventListForm />
    </div>
  );
};

export default EventList;