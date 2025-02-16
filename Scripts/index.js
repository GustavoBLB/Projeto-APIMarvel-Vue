new Vue({
    el: "#app",
    data: {
        heroes: [] 
    },
    async mounted() {
        await this.fetchHeroes();
    },
    methods: {
        async fetchHeroes() {
            const ts = "1"; 
            const publicKey = "15cea5f8a59b71e7d636187219977051";
            const hash = "62eb37bec60ace73acd483210bc3fc51"; 

            const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

            try {
                    const response = await fetch(url);
                    const data = await response.json();

                    data.code === 200 ? this.heroes = data.data.results : console.error("API ERROR:", data.status);

            } catch (error) {
                console.error("REQUEST ERROR:", error);
            }
        },
        async heroPage(id) {
            window.location.href = `heroPage.html?heroId=${id}`;
        }
    }
    });