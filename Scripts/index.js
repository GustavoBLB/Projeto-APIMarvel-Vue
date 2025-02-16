new Vue({
    el: "#app",
    data: {
        heroes: [] ,
        currentPage: 1,
        maxPage: 0,
    },
    async mounted() {
        let currentPage = await this.getParameter('page') || 1;
        this.currentPage = currentPage;
        await this.fetchHeroes(currentPage);
    },
    methods: {
        async fetchHeroes(currentPage) {
            
            const limit = 20;
            const offset = (currentPage - 1) * limit;
            
            const ts = "1"; 
            const publicKey = "15cea5f8a59b71e7d636187219977051";
            const hash = "62eb37bec60ace73acd483210bc3fc51"; 

            const url = `http://gateway.marvel.com/v1/public/characters?&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

            try {
                    const response = await fetch(url);
                    const data = await response.json();

                    if(data.code === 200) {
                        this.heroes = data.data.results

                        const totalHeroes = data.data.total;
                        this.maxPage = Math.ceil(totalHeroes/limit);
                        
                    } else{
                        console.error("API ERROR:", data.status);
                    }

            } catch (error) {
                console.error("REQUEST ERROR:", error);
            }

            console.log(this.maxPage)
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

            window.location.href = `index.html?page=${newPage}`;
        },

        async heroPage(id) {
            window.location.href = `heroPage.html?heroId=${id}`;
        }
    }
    });