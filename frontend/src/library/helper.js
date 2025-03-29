import axios from "axios";

const axiosApiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
});

function titleToSlug(title) {
    return title.toLowerCase().trim().replace(/'/g, '').replace(/\s+/g, ' ').replace(/ /g, '-');
}

function timeAgo(dateString) {
    const now = new Date();
    const inputDate = new Date(dateString);
    const diff = now - inputDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return years + ' years ago';
    if (months > 0) return months + ' months ago';
    if (days > 0) return days + ' days ago';
    if (hours > 0) return hours + ' hours ago';
    if (minutes > 0) return minutes + ' minutes ago';
    return seconds + ' seconds ago';
}

const getCookie = (name) => {
    if (typeof window === "undefined") return null; // ✅ Fix: Prevents execution on server

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    
    return null;
};

// ✅ Fix: Use proper ES6 export instead of module.exports
export { titleToSlug, getCookie, timeAgo, axiosApiInstance };
