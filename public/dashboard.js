// ==============================
// TOKEN + ROLE
// ==============================

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");


// ==============================
// AUTH CHECK
// ==============================

if (!token) {
    window.location.href = "login.html";
}


// ==============================
// PAGE LOAD
// ==============================

window.addEventListener("DOMContentLoaded", () => {

    const adminPanel = document.getElementById("adminPanel");
    const leadPanel = document.getElementById("leadPanel");

    // ✅ SAFE SHOW PANELS
    if (role === "Admin" && adminPanel) {
        adminPanel.style.display = "block";
    }

    if (role === "ProjectLead" && leadPanel) {
        leadPanel.style.display = "block";
    }

    loadProjects();
});


// ==============================
// LOAD PROJECTS
// ==============================

async function loadProjects() {

    let url = "http://localhost:5000/api/projects";

    if (role === "Developer") {
        url += "/developer";
    }
    else if (role === "ProjectLead") {
        url += "/lead";
    }
    else if (role === "Admin") {
        url += "/all";
    }

    try {

        const res = await fetch(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch projects");
        }

        const projects = await res.json();

        const container = document.getElementById("projects");
        container.innerHTML = "";

        if (!projects || projects.length === 0) {
            container.innerHTML = "<p>No projects found</p>";
            return;
        }

        projects.forEach(p => {

            container.innerHTML += `
                <div style="border:1px solid #ccc; padding:12px; margin:10px; border-radius:6px;">
                    <h3>${p.title}</h3>
                    <p>${p.description || "No description"}</p>
                    <p>Status: <b>${p.status}</b></p>

                    <button onclick="openProject('${p._id}')">
                        Open Project
                    </button>
                </div>
            `;
        });

    } catch (err) {

        console.error(err);
        alert("Error loading projects");

    }
}


// ==============================
// OPEN PROJECT
// ==============================

function openProject(id) {
    window.location.href = `project.html?id=${id}`;
}


// ==============================
// LOGOUT
// ==============================

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href = "login.html";
}
