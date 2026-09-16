let e="https://api.thecatapi.com/v1/",n=document.querySelector(".breed-select"),t=document.querySelector(".loader"),d=document.querySelector(".error"),r=document.querySelector(".cat-info"),o={method:"GET",headers:{"x-api-key":"live_GlLLrkhfyAXMpVN9gz3L1JHuflduC33qUZbHMRGSkqLieZ5opc93sMLBSsfeX4vR"}};(t.hidden=!1,n.hidden=!0,fetch(`${e}breeds`,o).then(e=>{if(!e.ok)throw d.hidden=!1,Error(e.message);return e.json()})).then(e=>{t.hidden=!0,n.hidden=!1,e.forEach(e=>{let t=document.createElement("option");t.value=e.id,t.textContent=e.name,n.appendChild(t)})}).catch(e=>{t.hidden=!0,d.hidden=!1,console.log(e)}),n.addEventListener("change",function(n){d.hidden=!0,r.innerHTML="";let i=n.target.value;console.log(`Selected breed ID: ${i}`),t.hidden=!1,fetch(`${e}images/search?breed_ids=${i}`,o).then(e=>{if(!e.ok)throw d.hidden=!1,Error(e.message);return e.json()}).then(e=>{console.log(e),t.hidden=!0,r.innerHTML=(e.length?e.map(({url:e,breeds:[n]=[]})=>{if(!n)return d.hidden=!1;let{name:t,description:r,temperament:o}=n;return`
        <img class="cat-image" src="${e}" alt="${t}" width="400" />
        <h2>${t}</h2>
        <p>${r}</p>
        <p><b>Temperament:</b> ${o}</p>
      `}).join(""):d.hidden=!1)||"No information available for this breed."}).catch(e=>{console.error("Помилка:",e),t.hidden=!0,d.hidden=!1})});
//# sourceMappingURL=cats-finder.edad76fc.js.map
