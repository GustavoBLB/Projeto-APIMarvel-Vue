new Vue({
    el: "#app",
    data: {
        hero: {}
    },
    async mounted() {
        await this.fetchHeroesDetails();
    },
    methods: {

        async fetchHeroesDetails(){
            const heroId = await this.getParameter('heroId');
            const ts = "1"; 
            const publicKey = "15cea5f8a59b71e7d636187219977051";
            const hash = "62eb37bec60ace73acd483210bc3fc51";

            const url = `https://gateway.marvel.com/v1/public/characters/${heroId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

            try{
                const response = await fetch(url);
                const data = await response.json();

                data.code === 200 ? this.hero = data.data.results[0] : console.error("API ERROR:", data.status);

                console.log(this.hero)

            } catch(error){
                console.error("REQUEST ERROR:", error);
            }
        },

        async getParameter(param){
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        },

        async homePage() {
            window.location.href = `index.html`;
        }
    }
})