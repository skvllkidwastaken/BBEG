const searchBar = document.getElementById('searchbar');
const searchButton = document.getElementById('search-confirm');
const sheet = document.getElementById('sheet');
const nameElement = document.getElementById('name');

const statElements = {
    str: document.querySelector('[data-stat="str"]'),
    dex: document.querySelector('[data-stat="dex"]'),
    con: document.querySelector('[data-stat="con"]'),
    int: document.querySelector('[data-stat="int"]'),
    wis: document.querySelector('[data-stat="wis"]'),
    chr: document.querySelector('[data-stat="chr"]'),
};

const hitPointElements = {
    hitp: document.querySelector('[data-hp="hp"]'),
    hitd: document.querySelector('[data-hp="hpd"]'),
    hitr: document.querySelector('[data-hp="hpr"]')
};

async function searchMonster() {
    const monsterName = searchBar.value.trim();

    if (!monsterName) {
        return;
    }

    const monsterIndex = monsterName.toLowerCase().replaceAll(' ', '-')

    try {
        searchButton.disabled = true;
        nameElement.textContent = 'Loading...';

        const response = await fetch(`https://www.dnd5eapi.co/api/2014/monsters/${monsterIndex}`);

        if (!response.ok) {
            throw new Error('Monster not found');
        }

        const monster = await response.json();

        nameElement.textContent = monster.name;

        statElements.str.textContent = monster.strength;
        statElements.dex.textContent = monster.dexterity;
        statElements.con.textContent = monster.constitution;
        statElements.int.textContent = monster.intelligence;
        statElements.wis.textContent = monster.wisdom;
        statElements.chr.textContent = monster.charisma;

        hitPointElements.hitp.textContent = monster.hit_points;
        hitPointElements.hitd.textContent = monster.hit_dice;
        hitPointElements.hitr.textContent = monster.hit_points_roll;

        sheet.hidden = false;
    } catch (error) {
        nameElement.textContent = 'Monster not found';

        Object.values(statElements).forEach((element) => {
            element.textContent = '--';
        });

        Object.values(hitPointElements).forEach((element) => {
            element.textContent = '--';
        });

        console.error(error);
    } finally {
        searchButton.disabled = false;
    }
}

searchButton.addEventListener('click', searchMonster);

searchBar.addEventListener('keydown', (event) => {
   if (event.key === 'Enter') {
    searchMonster();
   }
});