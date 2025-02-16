new Vue({
    el: "#app",
    data: {
        heroes: [] ,
        currentPage: 1,
        maxPage: 1,
        searchHero: "",
    },
    async mounted() {
        await this.fetchHeroes(this.currentPage , this.searchHero);
    },

    watch: {
        searchHero(newValue) {
            console.log(this.currentPage , this.searchHero)
            clearTimeout(this.timeout)
            this.timeout = setTimeout(async () => {
                if(newValue){
                    this.currentPage = 1
                    this.searchHero = newValue;
                    this.searchHero != "" ? await this.fetchHeroes(this.currentPage , this.searchHero) : null;
                    console.log(this.currentPage , this.searchHero)
                }else {
                    this.currentPage = 1
                    await this.fetchHeroes(this.currentPage , this.searchHero);
                }
            }, 1500); 
            console.log(this.currentPage , this.searchHero)
        }
    },

    methods: {
        async fetchHeroes(currentPage , searchHero) {
            
            const limit = 20;
            const offset = (currentPage - 1) * limit;
            
            const ts = "1"; 
            const publicKey = "15cea5f8a59b71e7d636187219977051";
            const hash = "62eb37bec60ace73acd483210bc3fc51"; 

            const url = `http://gateway.marvel.com/v1/public/characters?&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
            const urlWithHero = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchHero}&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

            try {

                const response = this.searchHero === "" ? await fetch(url) : await fetch(urlWithHero)
                const data = await response.json();

                if(data.code === 200) {
                    this.heroes = data.data.results
                    const totalHeroes = data.data.total;
                    const totalPages = Math.ceil(totalHeroes/limit) 
                    this.maxPage = totalPages > 0 ? totalPages : 1
                        
                } else{
                        console.error("API ERROR:", data.status);
                }

            console.log(this.maxPage)

            } catch (error) {
                console.error("REQUEST ERROR:", error);
            }

        },

        async getParameter(param){
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        },

        async changePage(param){

            let newPage;
            let currentPageNumber = Number(this.currentPage)

            if(param == 'next'){
                newPage = currentPageNumber + 1 
                this.currentPage = newPage
            }else{
                newPage = currentPageNumber - 1
                this.currentPage = newPage
            }

            await this.fetchHeroes(this.currentPage , this.searchHero);
            
        },

        async heroPage(id) {
            window.location.href = `heroPage.html?heroId=${id}`;
        }
    }
    });