const apiSelect = document.querySelector("#apiSelect"); // Select element to hold the keys
const apiDiv = document.querySelector("#api"); // Div to display data

// Event listener for when a user selects an option
apiSelect.addEventListener("change", function () {
  const selectedKey = apiSelect.value; // Get selected key from the select dropdown
  if (!selectedKey) {
    apiDiv.innerHTML = "<div>Please select a valid option</div>";
  } else {
    getData(selectedKey);
  }
});

async function getData(selectedKey) {
  try {
    const response = await fetch("http://localhost:4000/api");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // Handle displaying all data if "All data" is selected
    if (selectedKey === "all") {
      apiDiv.innerHTML = data
        .map((item) => {
          return `
            <div>
              <strong>Name:</strong> ${item.name}<br>
              <strong>Address:</strong> ${item.address}<br>
              <strong>Phone:</strong> ${item.phone}
            </div>
          `;
        })
        .join("");
    } else {
      // Display specific key data
      apiDiv.innerHTML = data
        .map((item) => `<div>${item[selectedKey] || "Data not found"}</div>`)
        .join("");
    }
  } catch (error) {
    apiDiv.innerHTML = "<div>Error fetching data</div>";
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Populate the select options with keys from the object and "All data" option
async function populateSelectOptions() {
  try {
    const response = await fetch("http://localhost:4000/api");
    const data = await response.json();

    if (data.length > 0) {
      const keys = Object.keys(data[0]); // Get keys from the first object

      // Add the "All data" option
      apiSelect.innerHTML += `<option value="all">All data</option>`;

      // Add each key as an option
      keys.forEach((key) => {
        apiSelect.innerHTML += `<option value="${key}">${key}</option>`;
      });
    }
  } catch (error) {
    console.error("Error fetching and populating select options:", error);
  }
}

// Call the function to populate select options on page load
populateSelectOptions();
