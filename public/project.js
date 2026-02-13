// ==============================
// TOKEN + ROLE
// ==============================

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if(!token){
    window.location.href = "login.html";
}

// GET PROJECT ID
const projectId = new URLSearchParams(window.location.search).get("id");


// ==============================
// PAGE LOAD
// ==============================

window.addEventListener("DOMContentLoaded", () => {

    const leadControls = document.getElementById("leadControls");

    // ✅ ADMIN + PROJECT LEAD CAN SEE CONTROLS
    if (leadControls) {

        if (role === "Admin" || role === "ProjectLead") {
            leadControls.style.display = "block";
            loadDevelopers();
        } 
        else {
            leadControls.style.display = "none";
        }
    }

    loadProject();
});



// ==============================
// LOAD PROJECT + DOCUMENTS
// ==============================

async function loadProject() {

    try{

        const res = await fetch(
            `http://localhost:5000/api/projects/${projectId}`,
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        // ⭐ AUTO LOGOUT IF TOKEN INVALID
        if(res.status === 401){
            logout();
            return;
        }

        if(!res.ok){
            throw new Error("Failed to load project");
        }

        const p = await res.json();

        let docsHTML = "<h3>📂 Documents</h3>";

        if (p.documents && p.documents.length > 0) {

            docsHTML += p.documents.map(doc => `
                <p>
                    📄 
                    <a href="http://localhost:5000/${doc}" target="_blank">
                        View File
                    </a>
                </p>
            `).join("");

        } else {

            docsHTML += `<p>No documents uploaded</p>`;
        }


        document.getElementById("project").innerHTML = `
            <h2>${p.title}</h2>
            <p>${p.description || "No description"}</p>
            <p><b>Status:</b> ${p.status}</p>

            ${docsHTML}
        `;

    }catch(err){

        console.log(err);
        alert("Error loading project");

    }
}



// ==============================
// LOAD DEVELOPERS
// ==============================

async function loadDevelopers() {

    try{

        const res = await fetch(
            "http://localhost:5000/api/auth/developers",
            {
                headers: {
                    "Authorization":"Bearer " + token
                }
            }
        );

        if(res.status === 401){
            logout();
            return;
        }

        const devs = await res.json();

        const select = document.getElementById("developerId");

        if (!select) return;

        select.innerHTML = "";

        devs.forEach(dev => {

            select.innerHTML += `
                <option value="${dev._id}">
                    ${dev.email}
                </option>
            `;
        });

    }catch(err){

        console.log(err);

    }
}



// ==============================
// ASSIGN DEVELOPER
// ==============================

async function assign() {

    if(role !== "Admin" && role !== "ProjectLead"){
        alert("Not authorized");
        return;
    }

    const developerId =
        document.getElementById("developerId").value;

    try{

        const res = await fetch(
            "http://localhost:5000/api/projects/assign",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + token
                },
                body:JSON.stringify({
                    projectId,
                    developerId
                })
            }
        );

        if(res.status === 401){
            logout();
            return;
        }

        alert("✅ Developer Assigned");

        loadProject();

    }catch(err){

        console.log(err);
        alert("Assignment failed");

    }
}



// ==============================
// COMPLETE PROJECT
// ==============================

async function complete() {

    if(role !== "Admin"){
        alert("Only Admin can complete project");
        return;
    }

    try{

        const res = await fetch(
            `http://localhost:5000/api/projects/${projectId}`,
            {
                method:"PUT",
                headers:{
                    "Authorization":"Bearer " + token
                }
            }
        );

        if(res.status === 401){
            logout();
            return;
        }

        alert("✅ Project Completed");

        loadProject();

    }catch(err){

        console.log(err);
        alert("Completion failed");

    }
}



// ==============================
// DELETE PROJECT ⭐⭐⭐
// ==============================

async function deleteProject(){

    if(role !== "Admin"){
        alert("Only Admin can delete project");
        return;
    }

    const confirmDelete = confirm("Delete this project?");

    if(!confirmDelete) return;

    try{

        const res = await fetch(
            `http://localhost:5000/api/projects/${projectId}`,
            {
                method:"DELETE",
                headers:{
                    "Authorization":"Bearer " + token
                }
            }
        );

        if(res.status === 401){
            logout();
            return;
        }

        alert("Project Deleted");

        window.location.href = "dashboard.html";

    }catch(err){

        console.log(err);
        alert("Delete failed");

    }
}



// ==============================
// UPLOAD FILE
// ==============================

async function upload(){

    const fileInput = document.getElementById("file");

    if(!fileInput.files[0]){
        alert("Please select a file");
        return;
    }

    const formData = new FormData();
    formData.append("document", fileInput.files[0]);

    try{

        const res = await fetch(
            `http://localhost:5000/api/projects/upload/${projectId}`,
            {
                method:"POST",
                headers:{
                    "Authorization":"Bearer " + token
                },
                body:formData
            }
        );

        if(res.status === 401){
            logout();
            return;
        }

        alert("✅ File Uploaded!");

        fileInput.value = "";

        loadProject();

    }catch(err){

        console.log(err);
        alert("Upload failed");

    }
}



// ==============================
// LOGOUT ⭐⭐⭐ VERY IMPORTANT
// ==============================

function logout(){

    localStorage.clear();

    window.location.href = "login.html";
}
