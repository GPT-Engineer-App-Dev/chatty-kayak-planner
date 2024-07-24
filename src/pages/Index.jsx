import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Index = () => {
  const [trips, setTrips] = useState([]);
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrip = { tripName, startDate, endDate, description, difficulty };
    setTrips([...trips, newTrip]);
    // Reset form fields
    setTripName("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setDifficulty("");
  };

  const handleDelete = (index) => {
    const updatedTrips = trips.filter((_, i) => i !== index);
    setTrips(updatedTrips);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Kayaking Trip Planner</h1>
        <p className="text-xl text-gray-600">Plan your perfect kayaking adventure</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Map</h2>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
            zoomControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ZoomControl position="topright" />
          </MapContainer>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Trip Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="tripName">Trip Name</Label>
              <Input
                id="tripName"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Save Trip</Button>
          </form>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Saved Trips</h2>
        {trips.length === 0 ? (
          <p>No trips saved yet.</p>
        ) : (
          <ul className="space-y-4">
            {trips.map((trip, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-semibold">{trip.tripName}</h3>
                <p>
                  {trip.startDate} to {trip.endDate}
                </p>
                <p>Difficulty: {trip.difficulty}</p>
                <p>{trip.description}</p>
                <div className="mt-2">
                  <Button variant="outline" className="mr-2">
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Index;