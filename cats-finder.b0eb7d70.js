let e="x-api-key=live_GlLLrkhfyAXMpVN9gz3L1JHuflduC33qUZbHMRGSkqLieZ5opc93sMLBSsfeX4vR",n="https://api.thecatapi.com/v1/",t=document.querySelector(".breed-select"),d=document.querySelector(".loader"),r=document.querySelector(".error"),o=document.querySelector(".cat-info");(d.hidden=!1,t.hidden=!0,fetch(`${n}breeds?${e}`).then(e=>{if(!e.ok)throw r.hidden=!1,Error(e.message);return e.json()})).then(e=>{d.hidden=!0,t.hidden=!1,e.forEach(e=>{let n=document.createElement("option");n.value=e.id,n.textContent=e.name,t.appendChild(n)})}).catch(e=>{d.hidden=!0,r.hidden=!1,console.log(e)}),t.addEventListener("change",function(t){r.hidden=!0,o.innerHTML="";let i=t.target.value;console.log(`Selected breed ID: ${i}`),d.hidden=!1,fetch(`${n}images/search?breed_ids=${i}&${e}`).then(e=>{if(!e.ok)throw r.hidden=!1,Error(e.message);return e.json()}).then(e=>{console.log(e),d.hidden=!0,o.innerHTML=(e.length?e.map(({url:e,breeds:[n]=[]})=>{if(!n)return r.hidden=!1;let{name:t,description:d,temperament:o}=n;return`
        <img class="cat-image" src="${e}" alt="${t}" width="400" />
        <h2>${t}</h2>
        <p>${d}</p>
        <p><b>Temperament:</b> ${o}</p>
      `}).join(""):r.hidden=!1)||"No information available for this breed."}).catch(e=>{console.error("Помилка:",e),d.hidden=!0,r.hidden=!1})});
//# sourceMappingURL=cats-finder.b0eb7d70.js.map
