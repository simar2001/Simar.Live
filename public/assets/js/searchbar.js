const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.title.toLowerCase().includes(searchString) ||
            character.category.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try {
        const res = await fetch('/articles');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters.reverse().slice(2));
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <a class="transition transform ease-in-out duration-100 hover:scale-105" href="../articles/${character.slug}">
            <div class="p-4 md:w-1/3 sm:mb-0 mb-6 text-center shadow-lg rounded-xl">
              <div class="rounded-lg h-64 overflow-hidden">
                <img alt="content" class="object-cover object-center h-full w-full transition transform ease-in-out duration-100 hover:scale-105" src="${character.imageUrl}">
              </div>
              <h4 class="text-lg font-mono text-gray-900 mt-3">${character.category}</h4>
              <h2 class="text-2xl font-mono title-font text-gray-900 mt-5 transition transform ease-in-out duration-100 hover:scale-105">${character.title}</h2>
              <p class="text-base font-mono mt-2">${character.createdAt.substring(0,10)}</p>
              <a class="text-blue-500 inline-flex items-center mt-3 transition transform ease-in-out duration-100 hover:scale-105" href="../articles/${character.slug}">Read
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </a>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();