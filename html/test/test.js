$(function() {
    $("button:first").on("click",outsideTheContinent);
    $("button:eq(1)").on("click",moreNeighbors);
    $("button:eq(2)").on("click",neighborless);
    $("button:eq(3)").on("click",moreLanguages);
    $("button:eq(4)").on("click",withCommonLanguage);
    $("button:eq(5)").on("click",withoutCommonCurrency);
    $("button:eq(6)").on("click",sortingDecreasingDensity);
    $("button:last").on("click",moreTopLevelDomains);

    function outsideTheContinent() {
        //Q1
        console.log("Q1");
        outside = []
        Country.fill_countries(countries)
        // console.log(Country.all_countries)
        for (var country in Country.all_countries) {
            console.log(ctr)
            // country.neighbors.forEach(e => {
            //     if (country.continent != e.continent) {
            //         outside.push(country)
            //     }
            // })
        })
        console.log(outside)
    }

    function moreNeighbors() {
        //Q2
        console.log("Q2");
    }

    function neighborless() {
        //Q3
        console.log("Q3");
    }

    function moreLanguages() {
        //Q4
        console.log("Q4");
    }

    function withCommonLanguage() {
        //Q5
        console.log("Q5");
    }

    function withoutCommonCurrency() {
        //Q6
        console.log("Q6");
    }

    function sortingDecreasingDensity() {
        //Q7
        console.log("Q7");
    }

    function moreTopLevelDomains() {
        //Q8
        console.log("Q8");
    }
});