(function () {
    function createBox(id, name, des) {
        var a = document.createElement('a');
        a.href = "lists/" + id;
        
        var div = document.createElement('div');
        div.className = "w3-third w3-container w3-margin-bottom";
        
        var img = document.createElement('img');
        img.src = "/images/web.jpeg";
        img.alt = "Norway";
        img.style = "width:100%";
        img.className = "w3-hover-opacity";
        
        var div2 = document.createElement('div');
        div2.className = "w3-container w3-white";
        
        var p = document.createElement('p');
        var b = document.createElement('b');
        var t = document.createTextNode(name);
        b.appendChild(t)
        p.appendChild(b);
        
        var p2 = document.createElement('p');
        var t2 = document.createTextNode(des);
        p2.appendChild(t2);

        div2.appendChild(p)
        div2.appendChild(p2);

        div.appendChild(img);
        div.appendChild(div2);

        a.appendChild(div);

        return a;
    }

    console.log(jsonLists);
    
    const firstGrid = document.getElementById("first_grid");

    for (i in jsonLists)
    {
        var box = createBox(jsonLists[i]._id, jsonLists[i].name, jsonLists[i].description);
        console.log(box);
        // firstGrid.appendChild(box);
        firstGrid.insertBefore(box, firstGrid.firstChild);
    }

//   <a href="lists/5a2debc22d0fb747dd98cf1b">
//     <div class="w3-third w3-container w3-margin-bottom">
//       <img src="/images/web.jpeg" alt="Norway" style="width:100%" class="w3-hover-opacity">
//       <div class="w3-container w3-white">
//         <p>
//           <b>Web Technology</b>
//         </p>
//         <p>Study List of Web Technology, you can study things like basic HTML tags and more. Have fun!</p>
//       </div>
//     </div>
//   </a>
//   <div class="w3-third w3-container w3-margin-bottom">
//     <img src="/images/undercos.png" alt="Norway" style="width:100%" class="w3-hover-opacity">
//     <div class="w3-container w3-white">
//       <p>
//         <b>Under Construction</b>
//       </p>
//       <p>This tag is under construction, please come back latter</p>
//     </div>
//   </div>

// <!-- Second Photo Grid-->
// <div class="w3-row-padding">
//   <div class="w3-third w3-container w3-margin-bottom">
//     <img src="/images/undercos.png" alt="Norway" style="width:100%" class="w3-hover-opacity">
//     <div class="w3-container w3-white">
//       <p>
//         <b>Under Construction</b>
//       </p>
//       <p>This tag is under construction, please come back latter</p>
//     </div>
//   </div>
//   <div class="w3-third w3-container w3-margin-bottom">
//     <img src="/images/undercos.png" alt="Norway" style="width:100%" class="w3-hover-opacity">
//     <div class="w3-container w3-white">
//       <p>
//         <b>Under Construction</b>
//       </p>
//       <p>This tag is under construction, please come back latter</p>
//     </div>
//   </div>
//   <div class="w3-third w3-container">
//     <img src="/images/undercos.png" alt="Norway" style="width:100%" class="w3-hover-opacity">
//     <div class="w3-container w3-white">
//       <p>
//         <b>Under Construction</b>
//       </p>
//       <p>This tag is under construction, please come back latter</p>
//     </div>
//   </div>
// </div>
})();