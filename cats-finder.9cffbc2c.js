let e="https://api.thecatapi.com/v1/",n=document.querySelector(".breed-select"),t=document.querySelector(".loader"),d=document.querySelector(".error"),r=document.querySelector(".cat-info"),i={method:"GET",headers:{"x-api-key":"live_GlLLrkhfyAXMpVN9gz3L1JHuflduC33qUZbHMRGSkqLieZ5opc93sMLBSsfeX4vR"}};(t.hidden=!1,n.hidden=!0,fetch(`${e}breeds`,i).then(e=>{if(!e.ok)throw d.hidden=!1,Error(e.message);return e.json()})).then(e=>{t.hidden=!0,n.hidden=!1,e.forEach(e=>{let t=document.createElement("option");t.value=e.id,t.textContent=e.name,n.appendChild(t)})}).catch(e=>{t.hidden=!0,d.hidden=!1,console.log(e)}),n.addEventListener("change",function(n){d.hidden=!0,r.innerHTML="";let h=n.target.value;t.hidden=!1,fetch(`${e}images/search?breed_ids=${h}`,i).then(e=>{if(!e.ok)throw d.hidden=!1,Error(e.message);return e.json()}).then(e=>{var n;t.hidden=!0,r.innerHTML=((n=e).length?n.map(({url:e,breeds:[n]=[]})=>{if(!n)return d.hidden=!1;let{name:t,description:r,temperament:i}=n;return`
        <img class="cat-image" src="${e}" alt="${t}" width="400" />
        <h2>${t}</h2>
        <p>${r}</p>
        <p><b>Temperament:</b> ${i}</p>
      `}).join(""):d.hidden=!1)||""}).catch(e=>{console.error("Помилка:",e),t.hidden=!0,d.hidden=!1})});
//# sourceMappingURL=cats-finder.9cffbc2c.js.map
