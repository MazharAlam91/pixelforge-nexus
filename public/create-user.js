document.addEventListener("DOMContentLoaded", () => {

  const createBtn = document.getElementById("createUser");

  createBtn.addEventListener("click", async () => {

    const token = localStorage.getItem("token");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        })
      });

      const data = await res.json();

      alert("User Created ✅");

      console.log(data);

    } catch (err) {

      console.log(err);
      alert("Error creating user");

    }

  });

});
