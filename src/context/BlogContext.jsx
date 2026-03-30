import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy
} from 'firebase/firestore';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const blogData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBlogs(blogData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching blogs: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const addBlog = async (blog) => {
        try {
            const newBlog = {
                ...blog,
                createdAt: new Date().toISOString(),
            };
            await addDoc(collection(db, 'blogs'), newBlog);
        } catch (error) {
            console.error("Error adding blog: ", error);
            alert("Failed to add blog. Please try again.");
        }
    };

    const deleteBlog = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog permanently?')) {
            try {
                await deleteDoc(doc(db, 'blogs', id));
            } catch (error) {
                console.error("Error deleting blog: ", error);
                alert("Failed to delete blog.");
            }
        }
    };

    const updateBlog = async (id, updatedBlog) => {
        try {
            const blogRef = doc(db, 'blogs', id);
            await updateDoc(blogRef, {
                ...updatedBlog,
                updatedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error updating blog: ", error);
            alert("Failed to update blog.");
        }
    };

    const updateBlogStatus = async (id, status) => {
        try {
            const blogRef = doc(db, 'blogs', id);
            await updateDoc(blogRef, { status });
        } catch (error) {
            console.error("Error updating status: ", error);
        }
    };

    return (
        <BlogContext.Provider value={{ blogs, addBlog, deleteBlog, updateBlog, updateBlogStatus, loading }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlogs = () => useContext(BlogContext);

