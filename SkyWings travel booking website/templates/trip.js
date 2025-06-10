const api = [
    {
        id:1,
        city:"Sydney",
        country:"Australia",
        overview:"Trip of Sydney",
        duration:"5",
        img:"https://wallpapercave.com/wp/GLuomT1.jpg",
        price: 1760
    },

    {
        id:2,
        city:"Melbourne",
        country:"Australia",
        overview:"Flight to melbourne",
        duration:"3",
        img:"https://th.bing.com/th/id/OIP.4NImmBPtfa7_OGH8DythEQHaFA?rs=1&pid=ImgDetMain",
        price: 814
    },

    {
        id:3,
        city:"Tasmania",
        country:"Australia",
        overview:"Enjoy the beaches of Tasmania",
        duration:"4",
        img:"https://th.bing.com/th/id/OIP.LWD6_qx3R7xNvJDCTxVi8gHaEp?rs=1&pid=ImgDetMain",
        price: 1080
    },

    {
        id:4,
        city:"Adelaide",
        country:"Australia",
        overview:"Take a round to adelaide",
        duration:"3",
        img:"https://th.bing.com/th/id/OIP.FnorjAPzXszQ4ZaqHmdUcgHaEK?rs=1&pid=ImgDetMain",
        price: 1760
    },

    {
        id:5,
        city:"Brisbane",
        country:"Australia",
        overview:"Tour of Brisbane",
        duration:"3",
        img:"https://th.bing.com/th/id/OIP.JxODTIeVVuG_4GvkRAXGcAHaEK?rs=1&pid=ImgDetMain",
        price: 814
    },

    {
        id:6,
        city:"Perth",
        country:"Australia",
        overview:"Enjoy Perth",
        duration:"4",
        img:"https://th.bing.com/th/id/OIP.4F4Uxm2neOSVRxLlaUEr4wHaFj?rs=1&pid=ImgDetMain",
        price: 1080
    },
    
    {
        id:7,
        city:"New-York",
        country:"U.S.A",
        overview:"Trip to NewYork",
        duration:"5",
        img:"https://th.bing.com/th/id/OIP.Qrbv0soGG32T3mnjqdlS0gHaEo?rs=1&pid=ImgDetMain",
        price: 1760
    },
    
    {
        id:8,
        city:"Washinghton-DC",
        country:"U.S.A",
        overview:"Take a look at the white house",
        duration:"7",
        img:"https://wallpaperaccess.com/full/2385834.jpg",
        price: 1900
    },

    {
        id:9,
        city:"Los-Angeles",
        country:"U.S.A",
        overview:"Explore The Hollywood",
        duration:"5",
        img:"https://th.bing.com/th/id/OIP.rCr5EflLi4YYyv8RxWS0VAHaE8?rs=1&pid=ImgDetMain",
        price: 3080
    },

    {
        id:10,
        city:"Hawai",
        country:"U.S.A",
        overview:"Enjoy Hawai",
        duration:"3",
        img:"https://th.bing.com/th/id/OIP.-SHNMGf-3Rxg1v2Hf1iGIwHaE7?rs=1&pid=ImgDetMain",
        price: 2600
    },
    
    {
        id:11,
        city:"Las-vegas",
        country:"U.S.A",
        overview:"Play the games in las vegas",
        duration:"3",
        img:"https://th.bing.com/th/id/OIP.Z2MCNA7BWODdZWjAttHatQHaFH?rs=1&pid=ImgDetMain",
        price: 3000
    },

    {
        id:12,
        city:"Florida",
        country:"U.S.A",
        overview:"Trip to the Flordia",
        duration:"4",
        img:"https://th.bing.com/th/id/OIP.zKllqOW7JfAO2U-7gchgIgHaEo?rs=1&pid=ImgDetMain",
        price: 1080
    },

    {
        id:13,
        city:"Tokyo",
        country:"Japan",
        overview:"Climb the stairs of Tokyo-tower",
        duration:"3",
        img:"https://th.bing.com/th/id/OIP.Q77AiRJJQeEldeQhp6gHlAHaEK?rs=1&pid=ImgDetMain",
        price: 1700
    },
    
    {
        id:14,
        city:"Osaka",
        country:"Japan",
        overview:"Explore Osaka",
        duration:"5",
        img:"https://th.bing.com/th/id/OIP.rAxWOjKc4HKwyu0sGgD1_QHaEK?rs=1&pid=ImgDetMain",
        price: 1600
    },
    {
        id:15,
        city:"Hokkaido",
        country:"Japan",
        overview:"Fly to Hokkaido",
        duration:"4",
        img:"https://th.bing.com/th/id/OIP.-nLtyo85wdaujMIen6hp9AHaEK?rs=1&pid=ImgDetMain",
        price: 1600
    },

    {
        id:16,
        city:"Wellinghton",
        country:"New-Zealand",
        overview:"Trip to Wellinghton",
        duration:"4",
        img:"https://a.travel-assets.com/findyours-php/viewfinder/images/res70/179000/179180-Wellington.jpg",
        price: 1360
    },

    {
        id:17,
        city:"christchurch",
        country:"New-Zealand",
        overview:"Explore christchurch",
        duration:"5",
        img:"https://th.bing.com/th/id/OIP.30ylRYo3Cg0SJFncH7EyfgHaE3?rs=1&pid=ImgDetMain",
        price: 1200
    },
    {
        id:18,
        city:"Auckland",
        country:"New-Zealand",
        overview:"Enjoy the fields of Auckland",
        duration:"4",
        img:"https://th.bing.com/th/id/OIP.e8kTP0iLtx4C3YeWKkVg_gHaE7?rs=1&pid=ImgDetMain",
        price: 1600
    },
    {
        id:19,
        city:"Italy",
        country:"Europe",
        overview:"Take a trip to Italy",
        duration:"7",
        img:"https://th.bing.com/th/id/OIP.7tPKNZcHXs0SUZqe-xfTmAHaFj?w=1800&h=1350&rs=1&pid=ImgDetMain",
        price: 3300
    },
    {
        id:20,
        city:"Poland",
        country:"Europe",
        overview:"Enjoy the trip of Poland",
        duration:"7",
        img:"https://lp-cms-production.imgix.net/image_browser/Krakow%20main%20square.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850&q=23&dpr=4",
        price: 3200
    },
    {
        id:21,
        city:"France",
        country:"Europe",
        overview:"Fly to the France",
        duration:"6",
        img:"https://lp-cms-production.imgix.net/image_browser/Krakow%20main%20square.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850&q=23&dpr=4",
        price: 2800
    },
    {
        id:22,
        city:"U.K",
        country:"Europe",
        overview:"Fly to the United Kingdom",
        duration:"8",
        img:"https://th.bing.com/th/id/OIP.LyZnCwgGviUVptrKDo3apQHaE7?rs=1&pid=ImgDetMain",
        price: 4000
    },
    {
        id:23,
        city:"Germany",
        country:"Europe",
        overview:"Enjoy Your time in Germany",
        duration:"6",
        img:"https://images.hdqwalls.com/wallpapers/germany-cologne-bridge-building-city-10.jpg",
        price: 3200
    },
    {
        id:24,
        city:"Spain",
        country:"Europe",
        overview:"Trip to the Spain",
        duration:"6",
        img:"https://www.tripsavvy.com/thmb/X91xrwOtkw-uYpNOeInA5Nn6VlU=/5760x3840/filters:fill(auto,1)/GettyImages-492706953-58f517d35f9b581d599b8e8e.jpg",
        price: 3200
    },
    {
        id:25,
        city:"Bejing",
        country:"China",
        overview:"Fly to the capital of Bejing",
        duration:"4",
        img:"https://i.pinimg.com/originals/37/61/78/3761784f1893a6d0f2007fe8de09fcdd.jpg",
        price: 1000
    },
    {
        id:26,
        city:"Shenzhen",
        country:"China",
        overview:"Enjoy your time near in the capital",
        duration:"5",
        img:"https://media.istockphoto.com/photos/shenzhen-at-night-picture-id588587918?k=6&m=588587918&s=612x612&w=0&h=L8oUH38xJA9zARLosTisv5RdsBMoLsU2299ckmgPqRo=",
        price: 900
    },
    {
        id:27,
        city:"Hong-Kong",
        country:"China",
        overview:"Explore Hong Kong",
        duration:"4",
        img:"https://wallpaperaccess.com/full/215724.jpg",
        price: 1600
    },
    {
        id:28,
        city:"Delhi",
        country:"India",
        overview:"Trip to Delhi",
        duration:"4",
        img:"https://th.bing.com/th/id/OIP.iWmgsAzqrneFmCM1HgoQMwHaEK?rs=1&pid=ImgDetMain",
        price: 1150
    },
    {
        id:29,
        city:"Mumbai",
        country:"India",
        overview:"Enjoy the beaches of Mumbai",
        duration:"4",
        img:"https://th.bing.com/th/id/OIP.HNWQyMgSwvHQ5ikmQuBwaAHaEK?rs=1&pid=ImgDetMain",
        price: 1400
    },
    {
        id:30,
        city:"Chennai",
        country:"India",
        overview:"Fly to Chennai",
        duration:"5",
        img:"https://th.bing.com/th/id/OIP.H3LMZi3GdaVLLXWe-D-wLgHaE8?rs=1&pid=ImgDetMain",
        price: 1290
    },
    {
        id:31,
        city:"Kolkata",
        country:"India",
        overview:"See the monuments of Kolkata",
        duration:"5",
        img:"https://th.bing.com/th/id/OIP.eoy8J05GbW2RtYoTypyO9QHaEW?rs=1&pid=ImgDetMain",
        price: 1100
    },
    {
        id:32,
        city:"Ahemadabad",
        country:"India",
        overview:"Fly to Ahemdabad",
        duration:"5",
        img:"https://th.bing.com/th/id/OIP.zlGWiaaBL7j_GDAfYe7BSwHaE8?rs=1&pid=ImgDetMain",
        price: 1100
    },
    {
        id:33,
        city:"Banglore",
        country:"India",
        overview:"Take a trip to Bengaluru",
        duration:"4",
        img:"https://th.bing.com/th/id/OIP.KSZc_gmCl3_VMFbR4hjd1QHaEK?rs=1&pid=ImgDetMain",
        price: 2000
    }


]
let id = localStorage.getItem('data-id')
console.log(typeof id);
let clicks = 0;
let submit = document.getElementById('submit');
let place1 = document.getElementById('place1');
let place2 = document.getElementById('place2');
let place3 = document.getElementById('place3');
let budget = document.getElementById('budget');
let main2 = document.getElementById('main2');
submit.addEventListener('click', () => {
  if(place1.value === "" || place2.value === "" || place3.value === "" ||  budget.value === ""){
    alert("PLS fill the form")
  }
  else{
    map();
  }
})
let main = document.getElementById('main');
console.log(main);
function map(){
let show = api.map((elem, i) => {

if(elem.price == budget.value){
    if(elem.city == place2.value || elem.city == place3.value){
    console.log("Done");
    return `
          <div class="tour-card discount">
               
                 <img src=${elem.img} alt="National Parks Tour">
                 <div class="tour-info">
                     <h3>${elem.overview}</h3>
                     <p><i class="location-icon"></i>${elem.city},${elem.country}</p>
                     <div class="rating"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                             class="fa-solid fa-star"></i> <span><b>18 Review</b></span></div>
                     <p class="duration">⏳${elem.duration}</p>
                     <p class="price">
                         <span class="old-price">$1200,00</span>
                         <strong>${elem.price}</strong>
                     </p>
                     <Button id="btn">Book Now</Button>
                    </div>
             </div>
    `
    }
 }
 else{
    console.log("Not Done")
 }
}).join('');
main.innerHTML = show;
console.log(main.childNodes.length)
if(main.childNodes.length === 0 || main.childNodes.length === 3){
    let h1 = document.createElement('h1');
    main2.appendChild(h1);
    h1.innerHTML = "Couldnt found more pls try again";

    h1.style.color = 'red';
}
let button = document.querySelectorAll('#btn');
button.forEach((btn, i) => {
    btn.addEventListener('click', (event) => {
        btn.style.display = 'none';
        clicks++;
    if(clicks === 2){
    let h1 = document.createElement('h1');
    main2.appendChild(h1);
    h1.innerHTML = `Your bookings from ${place1.value} to ${place2.value} to ${place3.value} has been done`;
    h1.style.color = 'green';
    h1.style.marginLeft = '50%';
    }
    })
})
}


/* let col = document.getElementById('main');
col.innerHTML = show */
