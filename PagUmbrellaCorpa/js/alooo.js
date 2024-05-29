
// $(document).ready(function(){

//     $.get('http://fakestoreapi.com/products', function(data){
//         $.each(data, function(i, item){
//             html = `
//             <div class="card" style="width: 18rem;">
//                 <img src="${item.image}" width=300 height=300 class="card-img-top" alt="...">
//                 <div class="card-body">
//                     <h5 class="card-title">
//                         ${item.title}
//                     </h5>
//                     <h6 class="card-title">
//                         ${item.category}
//                     </h6>
//                     <p class="card-text">
//                     ${item.description}
//                     </p>
//                     <a href="#" class="btn btn-primary">Buscar en Amazon</a>
//                 </div>
//             </div>
//             `;
//             $("#recuadro").append(html);
//         });
//     });
// });
$(document).ready(function(){

    $.get('http://fakestoreapi.com/products', function(data){
        $.each(data.slice(0, 8), function(i, item){
            html = `
            <div class="card" style="width: 18rem;">
                <img src="${item.image}" width=300 height=300 class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">
                        ${item.title}
                    </h5>
                    <h6 class="card-title">
                        ${item.category}
                    </h6>
                    <p class="card-text">
                    ${item.description}
                    </p>
                    <a href="#" class="btn btn-primary">Buscar en Amazon</a>
                </div>
            </div>
            `;
            $("#recuadro").append(html);
        });
    });
});