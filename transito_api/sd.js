const b = require("bcrypt"); 
( async () =>  {
    const bd = await b.hash("kaculo938", 3)
    console.log(bd);
})()