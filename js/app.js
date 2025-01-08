const loadAllData = async () => {
  handleLoader(true);
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  console.log(data.data.tools);
  displayData(data.data.tools);
};

const displayData = (tools) => {
  const cardContainer = document.getElementById("card-container");
  tools.forEach((tool) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "bg-base-100", "w-96", "shadow-xl");
    cardDiv.innerHTML = `
        <figure>
            <img src="${tool.image}"
            alt="Shoes" />
        </figure>
        <div class="px-5 py-2">
    <h2 class="card-title">Features</h2>
  </div>
    `;
    tool?.features.forEach((feature, index) => {
      const div = document.createElement("div");
      div.classList.add("px-5", "py-2");
      const p = document.createElement("p");
      p.innerText = `${index + 1}. ${feature}`;
      div.appendChild(p);
      cardDiv.appendChild(div);
    });
    // card bottom
    const cardBottomDiv = document.createElement("div");
    cardBottomDiv.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "px-5",
      "py-5"
    );
    cardBottomDiv.innerHTML = `
        <div> 
        <h4 class="text-xl font-bold"> ${tool.name}</h4>
        <p> ${tool.published_in} </p>
        </div>
        <div class="text-red-500"> <a class="cursor-pointer"> &#8594; </a> </div>
    `;
    // append card bottom div into card div
    cardDiv.appendChild(cardBottomDiv);

    // append card into card container
    cardContainer.appendChild(cardDiv);
    handleLoader(false);
  });
};

const handleLoader = (isLoading) => {
  if (isLoading) {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

loadAllData();
