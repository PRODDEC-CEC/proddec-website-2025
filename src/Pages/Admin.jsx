import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc, writeBatch, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import uploadImage from '../utils/uploadImage';
import { FaPlus, FaTrash, FaCheck, FaUsers, FaCalendarAlt, FaProjectDiagram, FaEdit, FaTimes, FaLightbulb } from 'react-icons/fa';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('events');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    // --- State for Submitted Ideas ---
    const [submittedIdeas, setSubmittedIdeas] = useState([]);

    // --- State for Teams ---
    const [teams, setTeams] = useState([]);
    const [newTeamYear, setNewTeamYear] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');

    // --- State for Managing Members ---
    const [teamMembers, setTeamMembers] = useState([]);
    const [editingMember, setEditingMember] = useState(null);

    // --- State for Managing Events ---
    const [existingEvents, setExistingEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);

    // --- State for Managing Projects ---
    const [existingProjects, setExistingProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null);

    // --- Bulk Forms State ---
    const [events, setEvents] = useState([{ title: '', date: '', description: '', location: '', registerLink: '', image: null }]);
    const [projects, setProjects] = useState([{ title: '', category: '', description: '', image: null }]);
    const [members, setMembers] = useState([{ name: '', title: '', handle: '', avatarUrl: null }]);

    // Fetch Teams on Load
    useEffect(() => {
        fetchTeams();
    }, []);

    // Fetch Members when Team Selected
    useEffect(() => {
        if (selectedTeam) {
            fetchTeamMembers(selectedTeam);
        } else {
            setTeamMembers([]);
        }
    }, [selectedTeam, teams]);


    useEffect(() => {
        if (activeTab === 'events') {
            fetchEvents();
        } else if (activeTab === 'projects') {
            fetchProjects();
        } else if (activeTab === 'ideas') {
            fetchIdeas();
        }
    }, [activeTab]);

    const fetchTeams = async () => {
        try {
            const q = query(collection(db, 'execom_teams'));
            const snapshot = await getDocs(q);
            const teamData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Sort teams descending
            teamData.sort((a, b) => b.year.localeCompare(a.year));
            setTeams(teamData);

            // Set default selected team to current or first
            const current = teamData.find(t => t.isCurrent);
            if (current && !selectedTeam) setSelectedTeam(current.id);
            else if (teamData.length > 0 && !selectedTeam) setSelectedTeam(teamData[0].id);

        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    };

    const fetchTeamMembers = async (teamId) => {
        const team = teams.find(t => t.id === teamId);
        if (!team) return;

        try {
            const q = query(collection(db, 'execom'), where('year', '==', team.year));
            const snapshot = await getDocs(q);
            const membersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTeamMembers(membersData);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };


    const fetchEvents = async () => {
        try {
            const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            const eventData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setExistingEvents(eventData);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const fetchProjects = async () => {
        try {
            const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            const projectData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setExistingProjects(projectData);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    // --- Idea Management Functions ---
    const fetchIdeas = async () => {
        try {
            const q = query(collection(db, 'ideas'), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            const ideasData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSubmittedIdeas(ideasData);
        } catch (error) {
            console.error("Error fetching ideas:", error);
        }
    };

    const handleDeleteIdea = async (ideaId) => {
        if (!window.confirm("Are you sure you want to delete this idea?")) return;
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'ideas', ideaId));
            setMessage("Idea deleted successfully.");
            fetchIdeas();
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // --- Team Management Functions ---
    const handleCreateTeam = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Check if team exists
            const existing = teams.find(t => t.year === newTeamYear);
            if (existing) throw new Error("Team already exists");

            await addDoc(collection(db, 'execom_teams'), {
                year: newTeamYear,
                isCurrent: false, // Default to false
                createdAt: new Date().toISOString()
            });

            setMessage(`Team ${newTeamYear} created!`);
            setNewTeamYear('');
            fetchTeams();
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSetCurrentTeam = async (teamId) => {
        setLoading(true);
        try {
            const batch = writeBatch(db);

            // Set all to false
            teams.forEach(team => {
                const ref = doc(db, 'execom_teams', team.id);
                batch.update(ref, { isCurrent: false });
            });

            // Set selected to true
            const targetRef = doc(db, 'execom_teams', teamId);
            batch.update(targetRef, { isCurrent: true });

            await batch.commit();
            setMessage("Current team updated!");
            fetchTeams();
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // --- Member Management Functions ---
    const handleDeleteMember = async (memberId) => {
        if (!window.confirm("Are you sure you want to delete this member?")) return;
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'execom', memberId));
            setMessage("Member deleted successfully.");
            fetchTeamMembers(selectedTeam);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (member) => {
        setEditingMember({ ...member, newImage: null });
    };


    const handleUpdateMember = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let imageUrl = editingMember.avatarUrl;
            if (editingMember.newImage) {
                imageUrl = await uploadImage(editingMember.newImage);
            }

            const memberRef = doc(db, 'execom', editingMember.id);
            await updateDoc(memberRef, {
                name: editingMember.name,
                title: editingMember.title,
                handle: editingMember.handle,
                avatarUrl: imageUrl
            });

            setMessage("Member updated successfully.");
            setEditingMember(null);
            fetchTeamMembers(selectedTeam);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // --- Event Management Functions ---
    const handleDeleteEvent = async (eventId) => {
        if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'events', eventId));
            setMessage("Event deleted successfully.");
            fetchEvents();
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEditEventClick = (event) => {
        setEditingEvent({ ...event, newImage: null });
    };

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let imageUrl = editingEvent.image;
            if (editingEvent.newImage) {
                imageUrl = await uploadImage(editingEvent.newImage);
            }

            const eventRef = doc(db, 'events', editingEvent.id);
            await updateDoc(eventRef, {
                title: editingEvent.title,
                date: editingEvent.date,
                description: editingEvent.description,
                location: editingEvent.location,
                registerLink: editingEvent.registerLink,
                image: imageUrl
            });

            setMessage("Event updated successfully.");
            setEditingEvent(null);
            fetchEvents();
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // --- Project Management Functions ---
    const handleDeleteProject = async (projectId) => {
        if (!window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'projects', projectId));
            setMessage("Project deleted successfully.");
            fetchProjects();
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEditProjectClick = (project) => {
        setEditingProject({ ...project, newImage: null });
    };

    const handleUpdateProject = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let imageUrl = editingProject.image;
            if (editingProject.newImage) {
                imageUrl = await uploadImage(editingProject.newImage);
            }

            const projectRef = doc(db, 'projects', editingProject.id);
            await updateDoc(projectRef, {
                title: editingProject.title,
                category: editingProject.category,
                description: editingProject.description,
                image: imageUrl
            });

            setMessage("Project updated successfully.");
            setEditingProject(null);
            fetchProjects();
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };


    // --- Bulk Form Helpers ---
    const handleInputChange = (index, e, list, setList) => {
        const { name, value } = e.target;
        const newList = [...list];
        newList[index][name] = value;
        setList(newList);
    };

    const handleImageChange = (index, e, list, setList) => {
        const file = e.target.files[0];
        if (file) {
            const newList = [...list];
            newList[index].image = file;
            setList(newList);
        }
    };

    const addRow = (list, setList, template) => {
        setList([...list, template]);
    };

    const removeRow = (index, list, setList) => {
        const newList = list.filter((_, i) => i !== index);
        setList(newList);
    };

    // --- Submit Handlers ---
    const handleBulkSubmit = async (e, type) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            let list = [];
            let collectionName = '';

            if (type === 'events') {
                list = events;
                collectionName = 'events';
            } else if (type === 'projects') {
                list = projects;
                collectionName = 'projects';
            } else if (type === 'execom') {
                list = members;
                collectionName = 'execom';

                if (!selectedTeam) throw new Error("Please select a team first");
                // Find selected team year string
                const team = teams.find(t => t.id === selectedTeam);
                if (!team) throw new Error("Invalid team selected");

                // Append year to member data
                list = list.map(m => ({ ...m, year: team.year }));
            }

            // Loop and Upload
            for (const item of list) {
                let imageUrl = '';
                if (item.image) {
                    imageUrl = await uploadImage(item.image);
                } else if (type === 'execom') {
                    imageUrl = 'https://reactbits.dev/assets/demo/person.webp';
                }

                const docData = { ...item, createdAt: new Date().toISOString() };

                // Handle different field names for image
                if (type === 'execom') {
                    delete docData.image;
                    docData.avatarUrl = imageUrl;
                } else {
                    docData.image = imageUrl;
                }

                await addDoc(collection(db, collectionName), docData);
            }

            setMessage(`${type} added successfully!`);

            // Reset Forms
            if (type === 'events') setEvents([{ title: '', date: '', description: '', location: '', registerLink: '', image: null }]);
            if (type === 'projects') setProjects([{ title: '', category: '', description: '', image: null }]);
            if (type === 'execom') {
                setMembers([{ name: '', title: '', handle: '', avatarUrl: null }]);
                fetchTeamMembers(selectedTeam); // Refresh list
            }

        } catch (error) {
            console.error(error);
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-4 md:px-12 pb-12">
            <h1 className="text-4xl font-bold text-[#FFA200] mb-8 text-center">Admin Dashboard</h1>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                    { id: 'teams', label: 'Manage Teams', icon: <FaUsers /> },
                    { id: 'events', label: 'Add Events', icon: <FaCalendarAlt /> },
                    { id: 'projects', label: 'Add Projects', icon: <FaProjectDiagram /> },
                    { id: 'execom', label: 'Manage Members', icon: <FaUsers /> },
                    { id: 'ideas', label: 'View Ideas', icon: <FaLightbulb /> }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full uppercase font-bold tracking-widest transition-all ${activeTab === tab.id
                            ? 'bg-[#FFA200] text-black'
                            : 'border border-white/20 hover:border-[#FFA200] text-white/70'
                            }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Message */}
            {message && (
                <div className={`text-center mb-8 p-4 rounded max-w-2xl mx-auto ${message.includes('Error') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                    {message}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="flex justify-center mb-8">
                    <div className="w-8 h-8 border-4 border-[#FFA200] border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <div className="max-w-4xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10">

                {/* --- Manage Teams --- */}
                {activeTab === 'teams' && (
                    <div className="space-y-8">
                        <form onSubmit={handleCreateTeam} className="flex gap-4 items-end bg-white/5 p-6 rounded-xl border border-white/10">
                            <div className="flex-1">
                                <label className="block mb-2 text-sm text-gray-400">New Team Year (e.g. 2026-2027)</label>
                                <input
                                    value={newTeamYear}
                                    onChange={(e) => setNewTeamYear(e.target.value)}
                                    placeholder="2026-2027"
                                    className="w-full bg-black/50 border border-white/10 p-3 rounded focus:border-[#FFA200] outline-none"
                                    required
                                />
                            </div>
                            <button type="submit" className="bg-[#FFA200] text-black font-bold py-3 px-6 rounded hover:bg-white transition-colors h-12.5">
                                Create Team
                            </button>
                        </form>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white/80">Existing Teams</h3>
                            {teams.map(team => (
                                <div key={team.id} className={`flex justify-between items-center p-4 rounded-xl border ${team.isCurrent ? 'bg-[#FFA200]/10 border-[#FFA200]' : 'bg-white/5 border-white/10'}`}>
                                    <div>
                                        <span className="text-xl font-bold block">{team.year}</span>
                                        {team.isCurrent && <span className="text-xs bg-[#FFA200] text-black px-2 py-0.5 rounded font-bold uppercase">Current Team</span>}
                                    </div>
                                    {!team.isCurrent && (
                                        <button
                                            onClick={() => handleSetCurrentTeam(team.id)}
                                            className="text-sm border border-white/30 px-3 py-1 rounded hover:bg-white hover:text-black transition-colors"
                                        >
                                            Set as Current
                                        </button>
                                    )}
                                </div>
                            ))}
                            {teams.length === 0 && <p className="text-white/40">No teams found.</p>}
                        </div>
                    </div>
                )}

                {/* --- Add Events --- */}
                {activeTab === 'events' && (
                    <>
                    <form onSubmit={(e) => handleBulkSubmit(e, 'events')} className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Add Events</h2>
                            <button type="button" onClick={() => addRow(events, setEvents, { title: '', date: '', description: '', location: '', registerLink: '', image: null })} className="flex items-center gap-2 text-[#FFA200] hover:text-white">
                                <FaPlus /> Add Row
                            </button>
                        </div>

                        {events.map((event, idx) => (
                            <div key={idx} className="bg-black/30 p-6 rounded-xl border border-white/10 relative group">
                                {events.length > 1 && (
                                    <button type="button" onClick={() => removeRow(idx, events, setEvents)} className="absolute top-4 right-4 text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <FaTrash />
                                    </button>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input name="title" placeholder="Event Title" value={event.title} onChange={e => handleInputChange(idx, e, events, setEvents)} className="w-full bg-black/50 border border-white/10 p-3 rounded" required />
                                    <input type="datetime-local" name="date" value={event.date} onChange={e => handleInputChange(idx, e, events, setEvents)} className="w-full bg-black/50 border border-white/10 p-3 rounded" required />
                                    <input name="location" placeholder="Location" value={event.location} onChange={e => handleInputChange(idx, e, events, setEvents)} className="w-full bg-black/50 border border-white/10 p-3 rounded" required />
                                    <input name="registerLink" placeholder="Registration Link" value={event.registerLink} onChange={e => handleInputChange(idx, e, events, setEvents)} className="w-full bg-black/50 border border-white/10 p-3 rounded" />
                                </div>
                                <textarea name="description" placeholder="Description" value={event.description} onChange={e => handleInputChange(idx, e, events, setEvents)} className="w-full bg-black/50 border border-white/10 p-3 rounded h-24 mb-4" required />
                                <input type="file" accept="image/*" onChange={(e) => handleImageChange(idx, e, events, setEvents)} className="w-full bg-black/50 border border-white/10 p-3 rounded" />
                            </div>
                        ))}
                        <button type="submit" className="w-full bg-[#FFA200] text-black font-bold py-3 rounded hover:bg-white transition-colors">Submit All Events</button>
                    </form>

                    {/* Manage Existing Events */}
                    <div className="border-t border-white/10 pt-8 mt-12">
                        <h3 className="text-2xl font-bold mb-6 text-white/90">Existing Events</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {existingEvents.map(event => (
                                <div key={event.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-4">
                                    <div className="flex items-start gap-4">
                                        <img src={event.image || '/placeholder.jpg'} alt={event.title} className="w-20 h-20 rounded-lg object-cover border border-[#FFA200]/30" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white text-lg">{event.title}</h4>
                                            <p className="text-sm text-[#FFA200] mb-1">{new Date(event.date).toLocaleDateString()}</p>
                                            <p className="text-xs text-white/60 line-clamp-2">{event.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 mt-auto pt-2 border-t border-white/5">
                                        <button 
                                            onClick={() => handleEditEventClick(event)} 
                                            className="px-4 py-2 text-sm bg-white/10 hover:bg-[#FFA200] hover:text-black rounded transition-colors flex items-center gap-2"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteEvent(event.id)} 
                                            className="px-4 py-2 text-sm bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors flex items-center gap-2"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {existingEvents.length === 0 && <p className="text-white/40 col-span-2 text-center py-4">No events found.</p>}
                        </div>
                    </div>
                    </>
                )}

                {/* --- Add Projects --- */}
                {activeTab === 'projects' && (
                    <>
                    <form onSubmit={(e) => handleBulkSubmit(e, 'projects')} className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Add Projects</h2>
                            <button type="button" onClick={() => addRow(projects, setProjects, { title: '', category: '', description: '', image: null })} className="flex items-center gap-2 text-[#FFA200] hover:text-white">
                                <FaPlus /> Add Row
                            </button>
                        </div>

                        {projects.map((project, idx) => (
                            <div key={idx} className="bg-black/30 p-6 rounded-xl border border-white/10 relative group">
                                {projects.length > 1 && (
                                    <button type="button" onClick={() => removeRow(idx, projects, setProjects)} className="absolute top-4 right-4 text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <FaTrash />
                                    </button>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input name="title" placeholder="Project Title" value={project.title} onChange={e => handleInputChange(idx, e, projects, setProjects)} className="w-full bg-black/50 border border-white/10 p-3 rounded" required />
                                    <input name="category" placeholder="Category" value={project.category} onChange={e => handleInputChange(idx, e, projects, setProjects)} className="w-full bg-black/50 border border-white/10 p-3 rounded" required />
                                </div>
                                <textarea name="description" placeholder="Description" value={project.description} onChange={e => handleInputChange(idx, e, projects, setProjects)} className="w-full bg-black/50 border border-white/10 p-3 rounded h-24 mb-4" required />
                                <input type="file" accept="image/*" onChange={(e) => handleImageChange(idx, e, projects, setProjects)} className="w-full bg-black/50 border border-white/10 p-3 rounded" required />
                            </div>
                        ))}
                        <button type="submit" className="w-full bg-[#FFA200] text-black font-bold py-3 rounded hover:bg-white transition-colors">Submit All Projects</button>
                    </form>

                    {/* Manage Existing Projects */}
                    <div className="border-t border-white/10 pt-8 mt-12">
                        <h3 className="text-2xl font-bold mb-6 text-white/90">Existing Projects</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {existingProjects.map(project => (
                                <div key={project.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-4">
                                    <div className="flex items-start gap-4">
                                        <img src={project.image || '/placeholder.jpg'} alt={project.title} className="w-20 h-20 rounded-lg object-cover border border-[#FFA200]/30" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white text-lg">{project.title}</h4>
                                            <p className="text-sm text-[#FFA200] mb-1">{project.category}</p>
                                            <p className="text-xs text-white/60 line-clamp-2">{project.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 mt-auto pt-2 border-t border-white/5">
                                        <button 
                                            onClick={() => handleEditProjectClick(project)} 
                                            className="px-4 py-2 text-sm bg-white/10 hover:bg-[#FFA200] hover:text-black rounded transition-colors flex items-center gap-2"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteProject(project.id)} 
                                            className="px-4 py-2 text-sm bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors flex items-center gap-2"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {existingProjects.length === 0 && <p className="text-white/40 col-span-2 text-center py-4">No projects found.</p>}
                        </div>
                    </div>
                    </>
                )}

                {/* --- Add & Manage Execom --- */}
                {activeTab === 'execom' && (
                    <div className="space-y-8">
                        <form onSubmit={(e) => handleBulkSubmit(e, 'execom')} className="space-y-6">
                            <div className="bg-[#FFA200]/10 border border-[#FFA200]/30 p-4 rounded-xl mb-6">
                                <label className="block text-[#FFA200] font-bold mb-2">Select Team:</label>
                                <select
                                    value={selectedTeam}
                                    onChange={(e) => setSelectedTeam(e.target.value)}
                                    className="w-full bg-black border border-[#FFA200]/30 p-3 rounded text-white focus:border-[#FFA200] outline-none"
                                    required
                                >
                                    <option value="">-- Select Team --</option>
                                    {teams.map(t => (
                                        <option key={t.id} value={t.id}>{t.year} {t.isCurrent ? '(Current)' : ''}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Add New Members</h2>
                                <button type="button" onClick={() => addRow(members, setMembers, { name: '', title: '', handle: '', avatarUrl: null })} className="flex items-center gap-2 text-[#FFA200] hover:text-white">
                                    <FaPlus /> Add Row
                                </button>
                            </div>

                            {members.map((member, idx) => (
                                <div key={idx} className="bg-black/30 p-6 rounded-xl border border-white/10 relative group">
                                    {members.length > 1 && (
                                        <button type="button" onClick={() => removeRow(idx, members, setMembers)} className="absolute top-4 right-4 text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <FaTrash />
                                        </button>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input name="name" placeholder="Full Name" value={member.name} onChange={e => handleInputChange(idx, e, members, setMembers)} className="w-full bg-black/50 border border-white/10 p-3 rounded" required />
                                        <input name="title" placeholder="Role/Title" value={member.title} onChange={e => handleInputChange(idx, e, members, setMembers)} className="w-full bg-black/50 border border-white/10 p-3 rounded" required />
                                        <input name="handle" placeholder="Social Handle" value={member.handle} onChange={e => handleInputChange(idx, e, members, setMembers)} className="w-full bg-black/50 border border-white/10 p-3 rounded" />
                                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(idx, e, members, setMembers)} className="w-full bg-black/50 border border-white/10 p-3 rounded" />
                                    </div>
                                </div>
                            ))}
                            <button type="submit" className="w-full bg-[#FFA200] text-black font-bold py-3 rounded hover:bg-white transition-colors" disabled={!selectedTeam}>Submit New Members</button>
                        </form>

                        {/* Manage Existing Members List */}
                        {selectedTeam && (
                            <div className="border-t border-white/10 pt-8">
                                <h3 className="text-2xl font-bold mb-6 text-white/90">Existing Members</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {teamMembers.map(member => (
                                        <div key={member.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <img src={member.avatarUrl} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-[#FFA200]/30" />
                                                <div>
                                                    <h4 className="font-bold text-white">{member.name}</h4>
                                                    <p className="text-sm text-white/60">{member.title}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEditClick(member)} className="p-2 text-[#FFA200] hover:bg-white/10 rounded transition-colors"><FaEdit /></button>
                                                <button onClick={() => handleDeleteMember(member.id)} className="p-2 text-red-500 hover:bg-white/10 rounded transition-colors"><FaTrash /></button>
                                            </div>
                                        </div>
                                    ))}
                                    {teamMembers.length === 0 && <p className="text-white/40 col-span-2 text-center py-4">No members found in this team.</p>}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* --- View Ideas --- */}
                {activeTab === 'ideas' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6 text-white/90">Submitted Ideas</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {submittedIdeas.map(idea => (
                                <div key={idea.id} className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col gap-2 relative group">
                                    <button 
                                        onClick={() => handleDeleteIdea(idea.id)} 
                                        className="absolute top-4 right-4 text-red-500 hover:text-red-400 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Delete Idea"
                                    >
                                        <FaTrash />
                                    </button>
                                    <h3 className="text-xl font-bold text-[#FFA200]">{idea.name}</h3>
                                    <div className="text-sm text-gray-400 flex gap-4 flex-wrap mb-2">
                                        <span><strong className="text-gray-500">Class:</strong> {idea.class}</span>
                                        {idea.membershipId && <span><strong className="text-gray-500">ID:</strong> {idea.membershipId}</span>}
                                        <span><strong className="text-gray-500">Phone:</strong> {idea.phone}</span>
                                    </div>
                                    <div className="p-4 bg-black/30 rounded-lg text-white/80 whitespace-pre-wrap">
                                        {idea.description}
                                    </div>
                                    <div className="mt-2 text-xs text-gray-600 text-right">
                                        Submitted on: {idea.createdAt?.toDate ? idea.createdAt.toDate().toLocaleString() : new Date().toLocaleString()}
                                    </div>
                                </div>
                            ))}
                            {submittedIdeas.length === 0 && <p className="text-white/40 text-center py-8">No ideas submitted yet.</p>}
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Modal for Members */}
            {editingMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-[#111] p-8 rounded-2xl w-full max-w-lg border border-[#FFA200]/30 relative my-8">
                        <button onClick={() => setEditingMember(null)} className="absolute top-4 right-4 text-white/50 hover:text-white"><FaTimes /></button>
                        <h2 className="text-2xl font-bold mb-6 text-[#FFA200]">Edit Member</h2>

                        <form onSubmit={handleUpdateMember} className="space-y-4">
                            <div>
                                <label className="block text-sm text-white/60 mb-1">Name</label>
                                <input value={editingMember.name || ''} onChange={e => setEditingMember({ ...editingMember, name: e.target.value })} className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-[#FFA200] outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-1">Title</label>
                                <input value={editingMember.title || ''} onChange={e => setEditingMember({ ...editingMember, title: e.target.value })} className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-[#FFA200] outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-1">Handle</label>
                                <input value={editingMember.handle || ''} onChange={e => setEditingMember({ ...editingMember, handle: e.target.value })} className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-[#FFA200] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-1">Change Image (Optional)</label>
                                <input type="file" accept="image/*" onChange={(e) => setEditingMember({ ...editingMember, newImage: e.target.files[0] })} className="w-full bg-black border border-white/10 p-3 rounded text-white file:bg-[#FFA200] file:text-black file:border-0 file:rounded file:px-2 file:mr-2 cursor-pointer" />
                            </div>

                            <button type="submit" className="w-full bg-[#FFA200] text-black font-bold py-3 rounded mt-4 hover:bg-white transition-colors">Update Member</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal for Projects */}
            {editingProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-[#111] p-8 rounded-2xl w-full max-w-lg border border-[#FFA200]/30 relative my-8">
                        <button onClick={() => setEditingProject(null)} className="absolute top-4 right-4 text-white/50 hover:text-white"><FaTimes /></button>
                        <h2 className="text-2xl font-bold mb-6 text-[#FFA200]">Edit Project</h2>

                        <form onSubmit={handleUpdateProject} className="space-y-4">
                            <div>
                                <label className="block text-sm text-white/60 mb-1">Title</label>
                                <input value={editingProject.title || ''} onChange={e => setEditingProject({ ...editingProject, title: e.target.value })} className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-[#FFA200] outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-1">Category</label>
                                <input value={editingProject.category || ''} onChange={e => setEditingProject({ ...editingProject, category: e.target.value })} className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-[#FFA200] outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-1">Description</label>
                                <textarea value={editingProject.description || ''} onChange={e => setEditingProject({ ...editingProject, description: e.target.value })} className="w-full bg-black border border-white/10 p-3 rounded text-white h-32 focus:border-[#FFA200] outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-1">Change Image (Optional)</label>
                                <input type="file" accept="image/*" onChange={(e) => setEditingProject({ ...editingProject, newImage: e.target.files[0] })} className="w-full bg-black border border-white/10 p-3 rounded text-white file:bg-[#FFA200] file:text-black file:border-0 file:rounded file:px-2 file:mr-2 cursor-pointer" />
                            </div>

                            <button type="submit" className="w-full bg-[#FFA200] text-black font-bold py-3 rounded mt-4 hover:bg-white transition-colors">Update Project</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal for Events */}
            {editingEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-[#111] p-8 rounded-2xl w-full max-w-lg border border-[#FFA200]/30 relative my-8">
                        <button onClick={() => setEditingEvent(null)} className="absolute top-4 right-4 text-white/50 hover:text-white"><FaTimes /></button>
                        <h2 className="text-2xl font-bold mb-6 text-[#FFA200]">Edit Event</h2>

                        <form onSubmit={handleUpdateEvent} className="space-y-4">
                            <div>
                                <label className="block text-sm text-white/60 mb-1">Title</label>
                                <input value={editingEvent.title || ''} onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })} className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-[#FFA200] outline-none" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-white/60 mb-1">Date</label>
                                    <input type="datetime-local" value={editingEvent.date || ''} onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })} className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-[#FFA200] outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-1">Location</label>
                                    <input value={editingEvent.location || ''} onChange={e => setEditingEvent({ ...editingEvent, location: e.target.value })} className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-[#FFA200] outline-none" required />
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm text-white/60 mb-1">Register Link</label>
                                <input value={editingEvent.registerLink || ''} onChange={e => setEditingEvent({ ...editingEvent, registerLink: e.target.value })} className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-[#FFA200] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-1">Description</label>
                                <textarea value={editingEvent.description || ''} onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })} className="w-full bg-black border border-white/10 p-3 rounded text-white h-32 focus:border-[#FFA200] outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-1">Change Image (Optional)</label>
                                <input type="file" accept="image/*" onChange={(e) => setEditingEvent({ ...editingEvent, newImage: e.target.files[0] })} className="w-full bg-black border border-white/10 p-3 rounded text-white file:bg-[#FFA200] file:text-black file:border-0 file:rounded file:px-2 file:mr-2 cursor-pointer" />
                            </div>

                            <button type="submit" className="w-full bg-[#FFA200] text-black font-bold py-3 rounded mt-4 hover:bg-white transition-colors">Update Event</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
