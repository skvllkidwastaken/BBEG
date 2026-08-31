const API = "https://www.dnd5eapi.co/api";

async function getData() {
  try {
    const response = await fetch(`${API}/monsters`);
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Failed to fetch API:", error);
  }
}

getData();

