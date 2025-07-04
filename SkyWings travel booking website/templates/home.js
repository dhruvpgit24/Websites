Vue.component("photo-card", {
    template: `<a class="card"
              :href="link"
              target="_blank"
              ref="card"
              @mousemove="move"
              @mouseleave="leave"
              @mouseover="over">
                <div class="reflection" ref="refl"></div>
                <img :src="img"/>
          </a>`,
    props: ["img", "link"],
    mounted() { },
    data: () => ({
      debounce: null
    }),

    methods: {
      over() {
        const refl = this.$refs.refl;
        refl.style.opacity = 1;
      },
      leave() {
        const card = this.$refs.card;
        const refl = this.$refs.refl;
        card.style.transform = `perspective(500px) scale(1)`;
        refl.style.opacity = 0;
      },

      move() {
        const card = this.$refs.card;
        const refl = this.$refs.refl;

        const relX = (event.offsetX + 1) / card.offsetWidth;
        const relY = (event.offsetY + 1) / card.offsetHeight;
        const rotY = `rotateY(${(relX - 0.5) * 60}deg)`;
        const rotX = `rotateX(${(relY - 0.5) * -60}deg)`;
        card.style.transform = `perspective(500px) scale(2) ${rotY} ${rotX}`;

        const lightX = this.scale(relX, 0, 1, 150, -50);
        const lightY = this.scale(relY, 0, 1, 30, -100);
        const lightConstrain = Math.min(Math.max(relY, 0.3), 0.7);
        const lightOpacity = this.scale(lightConstrain, 0.3, 1, 1, 0) * 255;
        const lightShade = `rgba(${lightOpacity}, ${lightOpacity}, ${lightOpacity}, 1)`;
        const lightShadeBlack = `rgba(0, 0, 0, 1)`;
        refl.style.backgroundImage = `radial-gradient(circle at ${lightX}% ${lightY}%, ${lightShade} 20%, ${lightShadeBlack})`;
      },
      scale: (val, inMin, inMax, outMin, outMax) =>
        outMin + (val - inMin) * (outMax - outMin) / (inMax - inMin)
    }
  });



  const app = new Vue({
    el: "#grid"
  });



  // ----------------------------------review--------------------------
  let currentIndex = 0;
    function moveSlide(index) {
      const slider = document.querySelector(".review-slider");
      const dots = document.querySelectorAll(".dot");
      currentIndex = index;
      slider.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach(dot => dot.classList.remove("active"));
      dots[index].classList.add("active");
    }
    


    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });