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

async function getAllMonsters() {
  try {
    const allMonsters = [];
    let index = 0;
    const limit = 50;
    
    while (true) {
      const response = await fetch(`${API}/monsters?index=${index}&limit=${limit}`);
      const data = await response.json();
      
      if (data.results.length === 0) break;
      
      allMonsters.push(...data.results);
      index += limit;
    }
    
    console.log(`Total monsters: ${allMonsters.length}`);
    return allMonsters;
  } catch (error) {
    console.error("Failed to fetch API:", error);
  }
}

getData();
getAllMonsters();

