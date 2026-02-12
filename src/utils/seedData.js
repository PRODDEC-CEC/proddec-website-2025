import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { projectsData } from "../data/projects";
import { execomData } from "../data/execom";

const seedData = async () => {
    try {
        const projectsCollection = collection(db, "projects");
        const execomCollection = collection(db, "execom");

        const projectPromises = projectsData.map(data => addDoc(projectsCollection, data));
        const execomPromises = execomData.map(data => addDoc(execomCollection, data));

        await Promise.all([...projectPromises, ...execomPromises]);
        console.log("Projects and Execom data successfully seeded!");
    } catch (error) {
        console.error("Error seeding data:", error);
    }
};

export default seedData;
