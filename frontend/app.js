const apiStatus = document.getElementById("apiStatus");
const responseOutput = document.getElementById("responseOutput");
const createUserForm = document.getElementById("createUserForm");
const getUserForm = document.getElementById("getUserForm");
const clearResponse = document.getElementById("clearResponse");

function setStatus(text, state) {
    apiStatus.textContent = text;
    apiStatus.classList.remove("is-ok", "is-error");

    if (state) {
        apiStatus.classList.add(state);
    }
}

function printResponse(payload) {
    responseOutput.textContent = JSON.stringify(payload, null, 2);
}

async function requestJson(url, options = {}) {
    setStatus("Loading", null);

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            }
        });

        const contentType = response.headers.get("content-type") || "";
        const payload = contentType.includes("application/json")
            ? await response.json()
            : { success: false, message: await response.text() };

        setStatus(response.ok ? "API ok" : "API error", response.ok ? "is-ok" : "is-error");
        printResponse(payload);
    } catch (error) {
        setStatus("API error", "is-error");
        printResponse({
            success: false,
            message: error.message
        });
    }
}

createUserForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(createUserForm);
    await requestJson("/api/users", {
        method: "POST",
        body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email")
        })
    });
});

getUserForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = document.getElementById("userId").value;
    await requestJson(`/api/users/${userId}`);
});

clearResponse.addEventListener("click", () => {
    setStatus("API idle", null);
    printResponse({ message: "Chưa có request" });
});
