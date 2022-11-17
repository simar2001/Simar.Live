const charactersList = document.getElementById('projectsList');
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
    const res = await fetch('/projects');
    hpCharacters = await res.json();
    displayCharacters(hpCharacters.reverse().slice(3));
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
            <a class="transition transform ease-in-out duration-100 hover:scale-105" href="projects/${character.slug}" aria-label="${character.title}">
            <div class="p-4 md:w-1/3 sm:mb-0 mb-6 text-center shadow-lg rounded-xl">
              <div class="rounded-lg h-64 overflow-hidden">
                <img alt="content" class="object-cover object-center h-full w-full transition transform ease-in-out duration-100 hover:scale-105" src="${character.imageUrl}">
              </div>
              <h2 class="tracking-widest text-xs title-font font-medium text-gray-600 my-2">${character.category}</h3>
              <h3 class="text-2xl font-mono title-font text-gray-900 mt-5 transition transform ease-in-out duration-100 hover:scale-105">${character.title}</h2>
              <p class="text-base font-mono mt-2">${character.createdAt.substring(0, 10)}</p>
              <a class="text-blue-700 inline-flex items-center mt-3 transition transform ease-in-out duration-100 hover:scale-105" href="projects/${character.slug}" aria-label="${character.title}">Take a look
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