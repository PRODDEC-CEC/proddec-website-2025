import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust path as needed
import { eventsData } from "../data/events";

const seedEvents = async () => {
    try {
        const eventsCollection = collection(db, "events");

        // Optional: Clear existing events to avoid duplicates
        // const snapshot = await getDocs(eventsCollection);
        // const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
        // await Promise.all(deletePromises);
        // console.log("Cleared existing events.");

        // Add events
        const addPromises = eventsData.map(async (event) => {
            // Remove ID if you want Firestore to generate IT, 
            // OR keep it if you want to use it as a field. 
            // Here we'll let Firestore generate the doc ID but keep the custom ID field for compatibility.
            await addDoc(eventsCollection, event);
        });

        await Promise.all(addPromises);
        console.log("Events successfully seeded to Firestore!");
    } catch (error) {
        console.error("Error seeding events:", error);
    }
};

export default seedEvents;
