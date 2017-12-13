const dbConnection = require("../config/mongoConnection");
const data = require("../data/");

const listsData = data.lists;
const cardsData = data.cards;

dbConnection().then((db) => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
    })
});

const about = data.about;
const story = data.story;
const education = data.education;

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        let tvList = ["Game Of Throne", "Silicon Valley", "Broke Girls"];
        let hbs = ["Play with my cat", "Stare at walls", "Discover fun food"];
        return about.createAboutProfile("GL", "I'm a master student of Computer Science here at Stevens Institute of Technology. Right now I'm in my second year. I did my undergrad education in UC San Diego with Biochemistry/Cell Biology major.", tvList, hbs);
    }).then(() => {
        return story.createStory("Visiting to an ancient weird house", "Last Year, there's an old story about an ancient house in the suburb area of New Jersey. Me and my friend went there for a visit. When we first entering the house, it DOES FEEL WEIRD. There's a pair of weird creepy statues  in front of the door. Following with a super long corridor. Since it's a super old house, it doesn't have  any electric stuff, it only has candles. We lightend up the candles with our torch and continue our discovery  tour. We followed the stairs down to the basement, there's a huge metal door with a wheel lock on it. We heard some weird noise which scares the ____ out of us. Since it's tooooo scary, we left the house quietly.");
    }).then(() => {
        return education.createEducation("Amazing High School", "High School", "Experiments Classes", "The crazy running test...");
    }).then(() => {
        return education.createEducation("University of California, San Diego", "Bachelor of Science", "Biochemical Techniques", "Go down to the beach by bike at midnight just to see the bioluminous biomes.");
    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});